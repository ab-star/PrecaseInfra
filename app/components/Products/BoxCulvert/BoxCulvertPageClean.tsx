"use client";
import React, { useState, useEffect, useRef, Suspense, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center } from '@react-three/drei';
import { motion } from 'framer-motion';
import Image from 'next/image';
import * as THREE from 'three';

// 3D Model Component
const GLB_PATH = '/product/BoxCulvertProduct/glb/SqareBlock.glb';
useGLTF.preload(GLB_PATH);
function BoxCulvertModel() {
  const { scene } = useGLTF(GLB_PATH) as { scene: THREE.Object3D };
  return <primitive object={scene} scale={1.8} position={[0, 0, 0]} />;
}

// Scroll-Locked Image Transition Component
const transitionImages = [
  '/product/BoxCulvertProduct/transition/1.png',
  '/product/BoxCulvertProduct/transition/2.png',
  '/product/BoxCulvertProduct/transition/3.png',
  '/product/BoxCulvertProduct/transition/4.png',
  '/product/BoxCulvertProduct/transition/5.png',
  '/product/BoxCulvertProduct/transition/6.png',
];

function ScrollLockedImageTransition() {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  useEffect(() => { indexRef.current = index; }, [index]);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isLocked = useRef(false);
  const wheelAccum = useRef(0);
  const touchStartY = useRef<number | null>(null);
  const prevBodyOverflow = useRef<string>('');
  const relockUntil = useRef<number>(0);

  // Queue-based stepping to avoid skipping images on fast scroll
  const pendingSteps = useRef(0);
  const processingStep = useRef(false);

  const total = transitionImages.length;
  const TRANSITION_TIME = 500; // ms, matches CSS duration below
  const WHEEL_THRESHOLD = 120; // normalized px required for one step
  const LOCK_THRESHOLD = 0.98; // lock when ~fully visible
  const UNLOCK_LEAVE_THRESHOLD = 0.1; // unlock when largely out of view

  const getVisibilityRatio = useCallback(() => {
    // Measure the closest <section> to ensure full-viewport logic
    const sectionEl = (sectionRef.current?.closest('section') as HTMLElement | null) ?? sectionRef.current;
    if (!sectionEl) return 0;
    const r = sectionEl.getBoundingClientRect();
    const height = Math.min(window.innerHeight, r.height);
    const visible = Math.max(0, Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0));
    return height === 0 ? 0 : visible / height;
  }, []);

  const isFullyInViewport = useCallback(() => getVisibilityRatio() >= LOCK_THRESHOLD, [getVisibilityRatio]);

  const lock = () => {
    const now = Date.now();
    if (now < relockUntil.current) return;
    if (isLocked.current) return;
    isLocked.current = true;
    prevBodyOverflow.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.setProperty('overscroll-behavior-y', 'contain');
    // Ensure the section is fully aligned when locking to avoid half-cut state
    const sectionEl = sectionRef.current?.closest('section') as HTMLElement | null;
    if (sectionEl) {
      setTimeout(() => {
        sectionEl.scrollIntoView({ behavior: 'auto', block: 'start' });
      }, 0);
    }
  };

  const unlock = () => {
    if (!isLocked.current) return;
    isLocked.current = false;
    document.body.style.overflow = prevBodyOverflow.current || '';
    document.documentElement.style.removeProperty('overscroll-behavior-y');
    wheelAccum.current = 0;
    pendingSteps.current = 0;
    processingStep.current = false;
  };

  const scrollToSiblingSection = (dir: 1 | -1) => {
    const containerSection = sectionRef.current?.closest('section') as HTMLElement | null;
    const targetSection = (dir > 0 ? containerSection?.nextElementSibling : containerSection?.previousElementSibling) as HTMLElement | null;
    if (targetSection) {
      // Nudge out of the current section first, then smooth-scroll to target.
      const nudge = dir > 0 ? 1 : -1;
      setTimeout(() => {
        window.scrollBy({ top: nudge, behavior: 'auto' });
        setTimeout(() => {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
        // Safety fallback if smooth scroll is interrupted
        setTimeout(() => {
          const rect = targetSection.getBoundingClientRect();
          if (Math.abs(rect.top) > 2) {
            window.scrollTo({ top: window.scrollY + rect.top, behavior: 'auto' });
          }
        }, 900);
      }, 0);
    } else {
      window.scrollBy({ top: dir > 0 ? window.innerHeight : -window.innerHeight, behavior: 'smooth' });
    }
  };

  const performStep = useCallback((dir: 1 | -1) => {
    if (processingStep.current) return;
    if (!isLocked.current) return;
    processingStep.current = true;

    const current = indexRef.current;
    if (dir > 0) {
      if (current < total - 1) {
        const next = Math.min(total - 1, current + 1);
        indexRef.current = next;
        setIndex(next);
      } else {
        // Finished last -> unlock and handoff to next section
        unlock();
        relockUntil.current = Date.now() + TRANSITION_TIME + 1500;
        scrollToSiblingSection(1);
      }
    } else {
      if (current > 0) {
        const next = Math.max(0, current - 1);
        indexRef.current = next;
        setIndex(next);
      } else {
        // At first -> unlock and handoff to previous section
        unlock();
        relockUntil.current = Date.now() + TRANSITION_TIME + 1500;
        scrollToSiblingSection(-1);
      }
    }

    setTimeout(() => {
      processingStep.current = false;
      // Continue queued steps if any
      if (pendingSteps.current !== 0 && isLocked.current) {
        const nextDir = pendingSteps.current > 0 ? 1 : -1;
        pendingSteps.current += nextDir > 0 ? -1 : 1; // consume one
        performStep(nextDir as 1 | -1);
      }
    }, TRANSITION_TIME);
  }, [total]);

  const processQueue = useCallback(() => {
    if (processingStep.current) return;
    if (pendingSteps.current === 0) return;
    if (!isLocked.current) { pendingSteps.current = 0; return; }
    const dir = pendingSteps.current > 0 ? 1 : -1;
    pendingSteps.current += dir > 0 ? -1 : 1;
    performStep(dir as 1 | -1);
  }, [performStep]);

  const enqueueStep = useCallback((dir: 1 | -1) => {
    // Limit how many steps can be queued to avoid long jumps
    const next = pendingSteps.current + dir;
    pendingSteps.current = Math.max(-2, Math.min(2, next));
    processQueue();
  }, [processQueue]);

  useEffect(() => {
    const onScrollResize = () => {
      const ratio = getVisibilityRatio();
      const now = Date.now();
      if (ratio >= LOCK_THRESHOLD && now >= relockUntil.current) {
        lock();
      } else if (ratio < UNLOCK_LEAVE_THRESHOLD) {
        unlock();
      }
    };

    onScrollResize();
    window.addEventListener('scroll', onScrollResize, { passive: true });
    window.addEventListener('resize', onScrollResize);
    return () => {
      window.removeEventListener('scroll', onScrollResize);
      window.removeEventListener('resize', onScrollResize);
      unlock();
    };
  }, [getVisibilityRatio]);

  useEffect(() => {
    const normalizeDelta = (e: WheelEvent) => {
      if (e.deltaMode === 1) return e.deltaY * 16;
      if (e.deltaMode === 2) return e.deltaY * window.innerHeight;
      return e.deltaY;
    };

    const onWheel = (e: WheelEvent) => {
      if (!isLocked.current && isFullyInViewport()) lock();
      if (!isLocked.current) return;
      e.preventDefault();
      e.stopPropagation();
      wheelAccum.current += normalizeDelta(e);
      if (Math.abs(wheelAccum.current) >= WHEEL_THRESHOLD) {
        const dir = wheelAccum.current > 0 ? 1 : -1;
        wheelAccum.current = 0;
        enqueueStep(dir as 1 | -1);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (!isLocked.current && isFullyInViewport()) lock();
      if (!isLocked.current) return;
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        enqueueStep(1);
      }
      if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        enqueueStep(-1);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (!isLocked.current && isFullyInViewport()) lock();
      if (!isLocked.current) return;
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isLocked.current) return;
      if (touchStartY.current == null) return;
      const dy = touchStartY.current - e.touches[0].clientY;
      if (Math.abs(dy) > 30) {
        e.preventDefault();
        enqueueStep(dy > 0 ? 1 : -1);
        touchStartY.current = e.touches[0].clientY;
      }
    };

    document.addEventListener('wheel', onWheel, { passive: false });
    document.addEventListener('keydown', onKey, { passive: false });
    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => {
      document.removeEventListener('wheel', onWheel);
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
    };
  }, [enqueueStep, isFullyInViewport]);

  // Preload images
  useEffect(() => {
    if (typeof window === 'undefined') return;
    transitionImages.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full h-full relative overflow-hidden"
    >
      {transitionImages.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-all duration-500 ${i === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        >
          <Image src={src} alt={`Installation step ${i + 1}`} fill sizes="100vw" className="object-cover" priority={i <= 1} unoptimized />
        </div>
      ))}
      {/* Progress Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {transitionImages.map((_, i) => (
          <div key={i} className={`w-3 h-3 rounded-full transition-colors ${i === index ? 'bg-white' : 'bg-white/50'}`} />
        ))}
      </div>
      {/* Counter */}
      <div className="absolute top-8 left-8 bg-black/60 text-white px-4 py-2 rounded">{Math.max(1, Math.min(total, index + 1))} / {total}</div>
    </div>
  );
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: unknown) {
    console.error('3D Section Error:', error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-600">
          Failed to load 3D model. Showing placeholder.
        </div>
      );
    }
    return this.props.children;
  }
}

const BoxCulvertPageClean = () => {
  return (
    <div className="bg-white">
      {/* Hero Video Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/product/BoxCulvertProduct/video/box-video.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        </div>
      </section>

      {/* 3D Model Section */}
      <section className="w-full h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="w-full h-4/5">
          <Canvas camera={{ position: [4, 2.5, 4], fov: 45 }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <OrbitControls enablePan={false} enableZoom={false} enableRotate={true} target={[0,0,0]} />
            <ErrorBoundary>
              <Suspense fallback={<mesh><boxGeometry args={[2,1,3]} /><meshStandardMaterial color="#9ca3af" /></mesh>}>
                <Center>
                  <BoxCulvertModel />
                </Center>
              </Suspense>
            </ErrorBoundary>
          </Canvas>
        </div>
      </section>

      {/* Strength Section */}
      <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        <Image
          src="/concrete4.jpg"
          alt="Concrete background"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-10 flex items-center h-full py-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-20">
            {/* Left: Text */}
            <div className="w-full md:w-[42%] text-left text-white">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-wide">LOOKS STRONG.</h2>
              <p className="mt-6 text-base md:text-lg text-white leading-relaxed">
                To build strong and sustainable precast bridges, we designed them to comply with Indian loading conditions for
                Highways and Railways. We made it with high-performance self-compacting concrete as per Japanese
                Industrial manufacturing standards.
              </p>
              <p className="mt-4 text-base md:text-lg text-white leading-relaxed">
                Our reinforced concrete culverts deliver exceptional strength and durability even in the most challenging environments,
                with precision engineering that ensures perfect alignment during installation.
              </p>
            </div>
            {/* Right: Image */}
            <div className="w-full md:w-[58%] flex justify-center md:justify-end">
              <div className="relative scale-110 md:scale-125">
                <Image
                  src="/product/BoxCulvertProduct/strong/strong.png"
                  alt="Box culvert frame"
                  width={1200}
                  height={1200}
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll-Locked Transition Section */}
      <section className="w-full h-screen bg-black relative">
        <ScrollLockedImageTransition />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center text-white">
            <h2 className="text-6xl font-bold mb-4 drop-shadow-2xl">Installation Process</h2>
            <p className="text-xl opacity-90">Experience our streamlined methodology</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default BoxCulvertPageClean;
