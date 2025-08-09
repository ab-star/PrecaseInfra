"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Image paths
const transitionImages = [
  '/product/BoxCulvertProduct/transition/1.png',
  '/product/BoxCulvertProduct/transition/2.png',
  '/product/BoxCulvertProduct/transition/3.png',
  '/product/BoxCulvertProduct/transition/4.png',
  '/product/BoxCulvertProduct/transition/5.png',
  '/product/BoxCulvertProduct/transition/6.png',
];

// Content for each transition image
const transitionContent = [
  {
    title: "Site Preparation",
    description: "The first step involves thorough site preparation, including excavation, grading, and ensuring proper drainage conditions for the box culvert installation.",
  },
  {
    title: "Foundation Setting",
    description: "A stable foundation is crucial for box culvert performance. This phase includes pouring the concrete base and ensuring precise leveling for proper water flow.",
  },
  {
    title: "Box Culvert Placement",
    description: "Using specialized equipment, precast box culvert segments are carefully positioned on the prepared foundation, ensuring perfect alignment and joint positioning.",
  },
  {
    title: "Joint Sealing",
    description: "High-performance sealants are applied to all joints between culvert segments, creating watertight connections that prevent leakage and soil infiltration.",
  },
  {
    title: "Backfilling Process",
    description: "Carefully selected materials are compacted around the structure in layers, providing lateral support while avoiding damage to the culvert segments.",
  },
  {
    title: "Final Road Construction",
    description: "The surface above the culvert is restored with road base material and pavement, completing the installation with minimal disruption to traffic flow.",
  },
];

// New improved component that doesn't try to lock scrolling
const SimpleImageTransition = () => {
  const [index, setIndex] = useState(0);
  
  // Navigate through images - wrapped in useCallback to prevent recreation on each render
  const goToNext = React.useCallback(() => {
    if (index < transitionImages.length - 1) {
      setIndex(index + 1);
    }
  }, [index]);
  
  const goToPrev = React.useCallback(() => {
    if (index > 0) {
      setIndex(index - 1);
    }
  }, [index]);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        goToNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        goToPrev();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [index, goToNext, goToPrev]);
  
  return (
    <div className="w-full max-w-7xl mx-auto h-full flex flex-col bg-white" 
      style={{ 
        backgroundColor: '#ffffff', 
        color: '#000000',
        position: 'relative',
        zIndex: 100 
      }}
    >
      {/* Debug overlay to confirm visibility */}
      <div className="absolute top-0 right-0 bg-red-500 text-white p-2 z-50 text-xs">
        Current index: {index + 1} (This is a debug overlay)
      </div>
      
      {/* Explicit white background layer */}
      <div className="absolute inset-0 bg-white" style={{ zIndex: -1 }}></div>
      
      <h2 className="text-center text-3xl font-bold text-black mb-8 pt-4">Box Culvert Installation Process</h2>
      
      {/* Main content area with forced styles */}
      <div className="flex-grow flex flex-col lg:flex-row items-center justify-between gap-8 p-4 lg:p-12"
        style={{ 
          backgroundColor: '#ffffff', 
          boxShadow: '0 0 0 2px blue',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* Text content with forced visible styles */}
        <div className="w-full lg:w-2/5 p-4 bg-white border-2 border-blue-500"
          style={{ 
            backgroundColor: 'white', 
            color: 'black',
            minHeight: '300px',
            zIndex: 20
          }}
        >
          <div className="text-sm uppercase tracking-wider text-blue-600 font-semibold mb-2"
            style={{ color: '#1e40af' }}
          >
            <b>Step {index + 1} of {transitionImages.length}</b>
          </div>
          
          <h3 className="text-3xl font-bold mb-4 text-gray-800"
            style={{ color: '#000000' }}
          >
            <strong>{transitionContent[index].title}</strong>
          </h3>
          
          <p className="text-lg text-black mb-8"
            style={{ color: '#000000', fontWeight: 'normal', opacity: 1 }}
          >
            {transitionContent[index].description}
          </p>
          
          <div className="bg-blue-100 py-2 px-4 rounded-lg inline-flex items-center text-blue-800"
            style={{ backgroundColor: '#dbeafe', color: '#1e40af' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Installation Phase {index + 1}
          </div>
        </div>
        
        {/* Image content with reduced size for better visibility */}
        <div className="w-full lg:w-1/2 relative h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden border-2 border-blue-500 shadow-xl"
          style={{ maxHeight: '400px' }}
        >
          <Image
            src={transitionImages[index]}
            alt={transitionContent[index].title}
            width={800}
            height={600}
            style={{ 
              objectFit: 'contain',
              width: '100%',
              height: '100%',
              maxHeight: '100%'
            }}
            priority
          />
        </div>
      </div>
      
      {/* Navigation controls */}
      <div className="flex justify-between items-center px-4 py-8">
        <button 
          onClick={goToPrev} 
          disabled={index === 0}
          className={`p-3 rounded-full ${index === 0 ? 'bg-gray-200 text-gray-400' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'} transition-colors`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="flex items-center space-x-2">
          {transitionImages.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-colors ${i === index ? 'bg-blue-600' : 'bg-gray-300'}`}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>
        
        <button 
          onClick={goToNext} 
          disabled={index === transitionImages.length - 1}
          className={`p-3 rounded-full ${index === transitionImages.length - 1 ? 'bg-gray-200 text-gray-400' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'} transition-colors`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SimpleImageTransition;
