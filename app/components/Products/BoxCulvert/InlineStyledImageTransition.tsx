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

const InlineStyledImageTransition = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  
  // Effect to handle window resize and initial mounting
  useEffect(() => {
    setIsMounted(true);
    
    // Set initial window width
    setWindowWidth(window.innerWidth);
    
    // Add resize listener
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Navigation functions
  const goNext = () => {
    if (currentIndex < transitionImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // If not mounted yet, show placeholder
  if (!isMounted) {
    return <div style={{ width: '100%', height: '600px', backgroundColor: 'white' }} />;
  }
  
  // Determine if we're on mobile
  const isMobile = windowWidth < 768;
  
  return (
    <div style={{
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: 'white',
      padding: '32px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      position: 'relative',
      zIndex: 10
    }}>
      <h2 style={{
        color: 'black',
        fontSize: '2rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>Box Culvert Installation Process</h2>
      
      {/* Debug marker */}
      <div style={{
        position: 'absolute',
        top: '0',
        right: '0',
        backgroundColor: 'red',
        color: 'white',
        padding: '8px 16px',
        fontSize: '14px',
        zIndex: 50
      }}>
        DEBUG TEXT - Step {currentIndex + 1}
      </div>
      
      {/* Content container */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: '32px',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        {/* Text content */}
        <div style={{
          width: isMobile ? '100%' : '50%',
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '8px',
          border: '2px solid #3b82f6'
        }}>
          <span style={{
            display: 'inline-block',
            backgroundColor: '#dbeafe',
            color: '#1e40af',
            padding: '4px 12px',
            borderRadius: '9999px',
            fontSize: '14px',
            fontWeight: 500,
            marginBottom: '16px'
          }}>
            Step {currentIndex + 1} of {transitionImages.length}
          </span>
          <h3 style={{
            fontSize: '30px',
            fontWeight: '700',
            marginBottom: '16px',
            color: 'black'
          }}>{transitionContent[currentIndex].title}</h3>
          <p style={{
            color: '#1f2937',
            fontSize: '18px',
            marginBottom: '24px'
          }}>{transitionContent[currentIndex].description}</p>
          <div style={{
            backgroundColor: '#f3f4f6',
            padding: '12px',
            borderRadius: '8px',
            color: '#4b5563',
            fontSize: '14px'
          }}>
            <span style={{fontWeight: 'bold'}}>Pro tip:</span> {currentIndex === 0 ? "Ensure proper site drainage before installation." : 
              currentIndex === 1 ? "Level foundations reduce long-term settlement issues." :
              currentIndex === 2 ? "Use crane signals for precise placement." :
              currentIndex === 3 ? "Allow sealants proper curing time before backfilling." :
              currentIndex === 4 ? "Compact backfill in 6-8 inch layers for best results." :
              "Road markings should be restored promptly for safety."}
          </div>
        </div>
        
        {/* Image container */}
        <div style={{
          width: isMobile ? '100%' : '50%',
          height: '320px',
          position: 'relative',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '2px solid #d1d5db'
        }}>
          <Image
            src={transitionImages[currentIndex]}
            alt={`Installation step ${currentIndex + 1}`}
            fill
            style={{objectFit: "contain"}}
            priority
          />
        </div>
      </div>
      
      {/* Navigation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '40px'
      }}>
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          style={{
            padding: '8px 20px',
            borderRadius: '8px',
            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
            border: 'none',
            fontWeight: 500,
            transition: 'background-color 0.2s',
            backgroundColor: currentIndex === 0 ? '#e5e7eb' : '#2563eb',
            color: currentIndex === 0 ? '#9ca3af' : 'white'
          }}
        >
          Previous Step
        </button>
        
        <div style={{
          display: 'flex',
          gap: '8px'
        }}>
          {transitionImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: i === currentIndex ? '#2563eb' : '#d1d5db',
                transition: 'background-color 0.2s',
                border: 'none',
                padding: 0,
                cursor: 'pointer'
              }}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>
        
        <button
          onClick={goNext}
          disabled={currentIndex === transitionImages.length - 1}
          style={{
            padding: '8px 20px',
            borderRadius: '8px',
            cursor: currentIndex === transitionImages.length - 1 ? 'not-allowed' : 'pointer',
            border: 'none',
            fontWeight: 500,
            transition: 'background-color 0.2s',
            backgroundColor: currentIndex === transitionImages.length - 1 ? '#e5e7eb' : '#2563eb',
            color: currentIndex === transitionImages.length - 1 ? '#9ca3af' : 'white'
          }}
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default InlineStyledImageTransition;

// Note: The component uses client-side rendering with useEffect to ensure proper window width detection
// and prevent hydration errors. The image transition sequence is fully controlled with state
// and includes accessibility features like keyboard navigation and ARIA labels.
