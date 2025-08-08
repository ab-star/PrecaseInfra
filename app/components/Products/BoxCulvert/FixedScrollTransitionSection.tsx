"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const FixedScrollTransitionSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const images = [
    '/product/BoxCulvertProduct/transition/1.png',
    '/product/BoxCulvertProduct/transition/2.png',
    '/product/BoxCulvertProduct/transition/3.png',
    '/product/BoxCulvertProduct/transition/4.png',
    '/product/BoxCulvertProduct/transition/5.png',
    '/product/BoxCulvertProduct/transition/6.png'
  ];

  const imageDescriptions = [
    "Raw Material Preparation",
    "Steel Reinforcement Setup", 
    "Concrete Mixing & Pouring",
    "Molding & Shaping Process",
    "Curing & Quality Control",
    "Final Box Culvert Product"
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / (sectionHeight - window.innerHeight)));
      
      // Calculate which image to show based on scroll progress
      const imageIndex = Math.floor(scrollProgress * (images.length - 1));
      setCurrentImage(Math.min(imageIndex, images.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [images.length]);

  return (
    <section 
      ref={sectionRef}
      className="w-full h-[600vh] bg-black relative"
    >
      {/* Fixed image container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentImage]}
              alt={`Box Culvert Process ${currentImage + 1}`}
              fill
              className="object-cover"
              priority={currentImage < 2}
              quality={90}
              onError={(e) => {
                console.error(`Failed to load image: ${images[currentImage]}`);
                // Show a fallback
                e.currentTarget.style.backgroundColor = '#374151';
                e.currentTarget.style.display = 'flex';
                e.currentTarget.style.alignItems = 'center';
                e.currentTarget.style.justifyContent = 'center';
                e.currentTarget.innerHTML = `<div style="color: white; text-align: center;">
                  <h3>Image ${currentImage + 1}</h3>
                  <p>${imageDescriptions[currentImage]}</p>
                </div>`;
              }}
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black bg-opacity-40" />
          </motion.div>
        </AnimatePresence>

        {/* Content Overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="text-center text-white px-6 max-w-4xl">
            <motion.h2
              key={`title-${currentImage}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg"
            >
              {imageDescriptions[currentImage]}
            </motion.h2>
            <motion.p
              key={`desc-${currentImage}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl opacity-90 drop-shadow-lg"
            >
              Manufacturing Step {currentImage + 1} of {images.length}
            </motion.p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-3">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full border-2 border-white transition-all duration-300 ${
                  index <= currentImage ? 'bg-white scale-110' : 'bg-transparent'
                }`}
              />
            ))}
          </div>
          <p className="text-white text-sm text-center mt-2 opacity-75">
            Scroll to see the manufacturing process
          </p>
        </div>

        {/* Step indicator */}
        <div className="absolute top-8 right-8 z-20 text-white">
          <div className="bg-black bg-opacity-50 px-4 py-2 rounded-lg">
            <span className="text-lg font-semibold">
              Step {currentImage + 1}/{images.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FixedScrollTransitionSection;
