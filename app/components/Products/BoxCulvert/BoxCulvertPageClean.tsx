"use client";
import React, { useState, useEffect, useRef, Suspense, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center } from '@react-three/drei';
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
  const WHEEL_THRESHOLD = 60; // Reduced threshold for faster response (was 120)
  const LOCK_THRESHOLD = 0.6; // More aggressive lock when partially visible (was 0.98)
  const LOCK_AGGRESSIVE_THRESHOLD = 0.85; // When section is mostly visible, lock immediately
  const UNLOCK_LEAVE_THRESHOLD = 0.1; // unlock when largely out of view
  const FAST_SCROLL_THRESHOLD = 100; // Detect fast scrolling to capture it

  // Track scroll speed to detect fast scrollers
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const scrollSpeed = useRef(0);
  
  const getVisibilityRatio = useCallback(() => {
    // Measure the closest <section> to ensure full-viewport logic
    const sectionEl = (sectionRef.current?.closest('section') as HTMLElement | null) ?? sectionRef.current;
    if (!sectionEl) return 0;
    const r = sectionEl.getBoundingClientRect();
    const height = Math.min(window.innerHeight, r.height);
    const visible = Math.max(0, Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0));
    return height === 0 ? 0 : visible / height;
  }, []);

  const isAlmostFullyInViewport = useCallback(() => getVisibilityRatio() >= LOCK_AGGRESSIVE_THRESHOLD, [getVisibilityRatio]);
  
  const isFullyInViewport = useCallback(() => {
    const ratio = getVisibilityRatio();
    // If scrolling fast and section is partially visible, consider it "fully" in viewport
    return ratio >= LOCK_THRESHOLD || 
           isAlmostFullyInViewport() || 
           (scrollSpeed.current > FAST_SCROLL_THRESHOLD && ratio > 0.4);
  }, [getVisibilityRatio, isAlmostFullyInViewport]);

  const lock = useCallback(() => {
    const now = Date.now();
    if (now < relockUntil.current) return;
    if (isLocked.current) return;
    
    isLocked.current = true;
    prevBodyOverflow.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.setProperty('overscroll-behavior-y', 'contain');
    document.documentElement.classList.add('locked-scroll');
    
    // Make sure section is shown with an absolutely reliable approach
    const sectionEl = sectionRef.current?.closest('section') as HTMLElement | null;
    if (sectionEl) {
      // First immediate snap
      sectionEl.scrollIntoView({ behavior: 'auto', block: 'start' });
      
      // Backup snap after a moment in case first one didn't work
      setTimeout(() => {
        const ratio = getVisibilityRatio();
        if (ratio < 0.98) {
          window.scrollTo({
            top: window.pageYOffset + sectionEl.getBoundingClientRect().top,
            behavior: 'auto'
          });
        }
      }, 50);
    }
    
    // Show hint for keyboard users
    const hintTimeout = setTimeout(() => {
      console.log("Use arrows keys or mouse wheel to navigate images"); // Could show actual UI hint
    }, 1000);
    
    return () => clearTimeout(hintTimeout);
  }, [getVisibilityRatio]);

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
    // Track when section comes into view with IntersectionObserver
    const sectionEl = sectionRef.current?.closest('section');
    let observer: IntersectionObserver | null = null;
    
    if (sectionEl) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            // Pre-activate when scrolling into view
            const now = Date.now();
            if (now >= relockUntil.current && scrollSpeed.current > FAST_SCROLL_THRESHOLD) {
              lock();
            }
          }
        },
        {
          threshold: [0.2, 0.4, 0.5, 0.6, 0.8], // Multiple thresholds for granular detection
          rootMargin: "-10% 0px -10% 0px" // Slightly inset to ensure proper viewing area
        }
      );
      
      observer.observe(sectionEl);
    }
    
    const onScrollResize = () => {
      const ratio = getVisibilityRatio();
      const now = Date.now();
      
      // Track scroll speed
      const currentY = window.scrollY;
      const timeDelta = now - lastScrollTime.current;
      if (timeDelta > 0) {
        const distance = Math.abs(currentY - lastScrollY.current);
        scrollSpeed.current = distance / timeDelta * 1000; // px per second
      }
      lastScrollY.current = currentY;
      lastScrollTime.current = now;
      
      // Aggressive locking logic with improved conditions
      if ((ratio >= LOCK_THRESHOLD || 
          (ratio >= LOCK_AGGRESSIVE_THRESHOLD && scrollSpeed.current < FAST_SCROLL_THRESHOLD) ||
          (ratio >= 0.4 && scrollSpeed.current > FAST_SCROLL_THRESHOLD)) && 
          now >= relockUntil.current) {
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
      if (observer) observer.disconnect();
      unlock();
    };
  }, [getVisibilityRatio, lock]);

  useEffect(() => {
    const normalizeDelta = (e: WheelEvent) => {
      if (e.deltaMode === 1) return e.deltaY * 16;
      if (e.deltaMode === 2) return e.deltaY * window.innerHeight;
      return e.deltaY;
    };

    // Keep track of recent wheel events to detect fast flick patterns
    const recentWheelEvents: {delta: number, time: number}[] = [];
    const MAX_RECENT_EVENTS = 5;
    const MAX_RECENT_TIME_MS = 300; // Look at events in last 300ms

    const detectFlickPattern = () => {
      const now = Date.now();
      // Remove old events
      while (recentWheelEvents.length && now - recentWheelEvents[0].time > MAX_RECENT_TIME_MS) {
        recentWheelEvents.shift();
      }
      
      // Detect consistent direction and increasing speed
      if (recentWheelEvents.length >= 3) {
        const direction = Math.sign(recentWheelEvents[0].delta);
        const allSameDirection = recentWheelEvents.every(e => Math.sign(e.delta) === direction);
        
        if (allSameDirection) {
          const avgDelta = recentWheelEvents.reduce((sum, e) => sum + Math.abs(e.delta), 0) / recentWheelEvents.length;
          return { isFlick: true, direction, avgDelta };
        }
      }
      
      return { isFlick: false, direction: 0, avgDelta: 0 };
    };

    const onWheel = (e: WheelEvent) => {
      const delta = normalizeDelta(e);
      const ratio = getVisibilityRatio();
      const absDelta = Math.abs(delta);
      
      // Track this wheel event
      recentWheelEvents.push({ delta, time: Date.now() });
      if (recentWheelEvents.length > MAX_RECENT_EVENTS) recentWheelEvents.shift();
      
      // Check for flick pattern
      const { isFlick, direction } = detectFlickPattern();
      
      // Capture wheel events as early as possible when entering section
      const isFastWheel = absDelta > 40;
      const isVeryFastWheel = absDelta > 80;
      const isApproaching = ratio >= 0.3 && ratio < 0.8;
      
      // Super aggressive capture for fast wheels
      if (!isLocked.current) {
        if (isFullyInViewport() || 
            (ratio > 0.4 && isFastWheel) || 
            (ratio > 0.3 && isFlick) ||
            (ratio > 0.2 && isVeryFastWheel) ||
            (isApproaching && scrollSpeed.current > FAST_SCROLL_THRESHOLD)) {
          // Prevent default to avoid further scrolling
          e.preventDefault();
          
          // Use the ratio for immediate decision making without storing
          
          // Lock the section
          lock();
          
          // If this was a flick or fast wheel, immediately queue the step
          // with the correct direction based on the wheel event
          if (isFlick || isFastWheel) {
            const wheelDir = delta > 0 ? 1 : -1;
            const stepDir = isFlick ? direction : wheelDir;
            setTimeout(() => enqueueStep(stepDir as 1 | -1), 10); // Respond very quickly
          }
          return;
        }
      }
      
      if (!isLocked.current) return;
      e.preventDefault();
      e.stopPropagation();
      
      // For fast scrollers, be more responsive with almost instant step changes
      const shouldImmediatelyRespond = isVeryFastWheel || isFlick;
      
      if (shouldImmediatelyRespond) {
        const dir = delta > 0 ? 1 : -1;
        wheelAccum.current = 0; // Reset accumulator
        enqueueStep(dir as 1 | -1);
      } else {
        // Normal accumulation for smoother control
        wheelAccum.current += delta;
        
        if (Math.abs(wheelAccum.current) >= WHEEL_THRESHOLD) {
          const dir = wheelAccum.current > 0 ? 1 : -1;
          wheelAccum.current = 0;
          enqueueStep(dir as 1 | -1);
        }
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
  }, [enqueueStep, isFullyInViewport, getVisibilityRatio, lock]);

  // Preload images
  useEffect(() => {
    if (typeof window === 'undefined') return;
    transitionImages.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  // Track approach state to show scroll indicator
  const [state, setState] = useState({
    isLocked: false,
    isApproaching: false
  });
  
  // Use effect to track when user is approaching section
  useEffect(() => {
    const trackApproaching = () => {
      const ratio = getVisibilityRatio();
      if (ratio > 0.3 && ratio < 0.6) {
        setState(prev => ({...prev, isApproaching: true}));
      } else if (ratio <= 0.2 || ratio >= 0.8) {
        setState(prev => ({...prev, isApproaching: false}));
      }
    };
    
    window.addEventListener('scroll', trackApproaching, { passive: true });
    return () => window.removeEventListener('scroll', trackApproaching);
  }, [getVisibilityRatio]);

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
      
      {/* Scroll Indicator */}
      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 
                      ${state.isApproaching && !state.isLocked ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-black/70 rounded-full p-4 text-white flex flex-col items-center">
          <div className="flex flex-col items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          <p className="text-lg font-medium">Scroll to explore installation</p>
        </div>
      </div>
      
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
     
      </section>

    </div>
  );
};

export default BoxCulvertPageClean;
