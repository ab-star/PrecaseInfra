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
          <div className="text-center text-white">
            <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="text-6xl font-bold mb-4">
              Box Culvert
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-xl">
              High-Strength | Precision Engineering | Rapid Installation
            </motion.p>
          </div>
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
        <div className="text-center p-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore in 3D</h2>
          <p className="text-lg text-gray-600">Interact with the model to view from every angle</p>
        </div>
      </section>

      {/* Strength Section */}
      <section className="w-full h-screen flex items-center">
        <div className="flex-1 p-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Strength That Lasts</h2>
          <p className="text-lg text-gray-700 mb-8">
            Engineered for exceptional durability and load-bearing capacity. Built with high-performance concrete and reinforced steel.
          </p>
          <ul className="space-y-3 text-gray-700">
            <li>• Designed for Indian highways & railways</li>
            <li>• 100+ year design life</li>
            <li>• Exceeds IS, IRC, and IRS standards</li>
          </ul>
        </div>
        <div className="flex-1 p-16">
          <Image 
            src="/product/BoxCulvertProduct/strong/strong.png" 
            alt="Strength" 
            width={600} 
            height={600} 
            className="w-full h-auto rounded-lg shadow-xl" 
          />
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

      {/* Gallery Section */}
      <section className="w-full h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex flex-col items-center justify-center text-white">
        <h2 className="text-5xl font-bold mb-8 text-yellow-400">Project Gallery</h2>
        <p className="text-lg mb-10 text-center max-w-2xl">See our Box Culverts in action across major infrastructure projects</p>
        <div className="grid grid-cols-3 gap-8 max-w-5xl">
          {[1, 2, 3].map((i) => (
            <Image 
              key={i}
              src={`/product/BoxCulvertProduct/gallery/${i}.jpg`} 
              alt={`Project ${i}`} 
              width={400} 
              height={300} 
              className="rounded-lg shadow-lg object-cover w-full h-64" 
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Infrastire</h3>
            <p className="text-blue-100">Building the future with precision engineering</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Contact</h4>
            <p className="text-blue-100">📞 +91 79 4021 0000</p>
            <p className="text-blue-100">✉️ askexpert@infrastire.com</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <div className="space-y-1">
              <div><a href="#" className="hover:underline text-blue-100">Home</a></div>
              <div><a href="#" className="hover:underline text-blue-100">Products</a></div>
              <div><a href="#" className="hover:underline text-blue-100">Projects</a></div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-400 hover:text-white">LinkedIn</a>
              <a href="#" className="text-blue-400 hover:text-white">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BoxCulvertPageClean;
