"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const ScrollTransitionSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollCountRef = useRef(0);
  
  const images = [
    '/product/BoxCulvertProduct/transition/1.png',
    '/product/BoxCulvertProduct/transition/2.png',
    '/product/BoxCulvertProduct/transition/3.png',
    '/product/BoxCulvertProduct/transition/4.png',
    '/product/BoxCulvertProduct/transition/5.png',
    '/product/BoxCulvertProduct/transition/6.png'
  ];

  const imageDescriptions = [
    "Manufacturing Process",
    "Quality Control",
    "Reinforcement Installation",
    "Concrete Pouring",
    "Curing Process",
    "Final Product"
  ];

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const isInView = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;

      if (isInView && currentImage < images.length - 1) {
        e.preventDefault();
        setIsScrollLocked(true);
        
        scrollCountRef.current += 1;
        
        // Change image every 3 scroll events
        if (scrollCountRef.current >= 3) {
          setCurrentImage(prev => Math.min(prev + 1, images.length - 1));
          scrollCountRef.current = 0;
        }
      } else if (currentImage >= images.length - 1 && isInView) {
        // Allow normal scrolling after all images are shown
        setIsScrollLocked(false);
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [currentImage, images.length]);

  // Reset when leaving the section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && currentImage > 0) {
            // Reset only if we've scrolled past the section
            const rect = entry.boundingClientRect;
            if (rect.bottom < 0) {
              setCurrentImage(0);
              scrollCountRef.current = 0;
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [currentImage]);

  return (
    <section 
      ref={sectionRef}
      className="w-full h-screen bg-black relative overflow-hidden"
      style={{ 
        position: isScrollLocked ? 'fixed' : 'relative',
        top: isScrollLocked ? 0 : 'auto',
        zIndex: isScrollLocked ? 1000 : 'auto'
      }}
    >
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentImage]}
            alt={`Box Culvert Process ${currentImage + 1}`}
            fill
            className="object-cover"
            priority
            quality={100}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-30" />
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="text-center text-white px-6">
          <motion.h2
            key={`title-${currentImage}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            {imageDescriptions[currentImage]}
          </motion.h2>
          <motion.p
            key={`desc-${currentImage}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl opacity-90"
          >
            Step {currentImage + 1} of {images.length}
          </motion.p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {images.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full border-2 border-white ${
                index <= currentImage ? 'bg-white' : 'bg-transparent'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
            />
          ))}
        </div>
        <p className="text-white text-sm text-center mt-2 opacity-75">
          {currentImage < images.length - 1 ? 'Scroll to continue' : 'Continue scrolling'}
        </p>
      </div>

      {/* Scroll indicator */}
      {currentImage < images.length - 1 && (
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20"
        >
          <div className="w-6 h-12 border-2 border-white rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-4 bg-white rounded-full mt-2"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default ScrollTransitionSection;
