"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import './ImageTextTransition.css';

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

const ImageWithTextTransition = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
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
  
  return (
    <div className="transition-container">
      <h2 className="transition-heading">Box Culvert Installation Process</h2>
      
      {/* Debug marker */}
      <div className="debug-marker">
        DEBUG TEXT - Step {currentIndex + 1}
      </div>
      
      {/* Content container */}
      <div className="transition-content-row">
        {/* Text content */}
        <div className="transition-text">
          <span className="transition-step">
            Step {currentIndex + 1} of {transitionImages.length}
          </span>
          <h3 className="transition-title">{transitionContent[currentIndex].title}</h3>
          <p className="transition-description">{transitionContent[currentIndex].description}</p>
          <div className="transition-tip">
            <span style={{fontWeight: "bold"}}>Pro tip:</span> {currentIndex === 0 ? "Ensure proper site drainage before installation." : 
              currentIndex === 1 ? "Level foundations reduce long-term settlement issues." :
              currentIndex === 2 ? "Use crane signals for precise placement." :
              currentIndex === 3 ? "Allow sealants proper curing time before backfilling." :
              currentIndex === 4 ? "Compact backfill in 6-8 inch layers for best results." :
              "Road markings should be restored promptly for safety."}
          </div>
        </div>
        
        {/* Image container */}
        <div className="transition-image">
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
      <div className="transition-nav">
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className={`nav-button ${currentIndex === 0 ? 'nav-button-disabled' : 'nav-button-active'}`}
        >
          Previous Step
        </button>
        
        <div className="nav-dots">
          {transitionImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`nav-dot ${i === currentIndex ? 'nav-dot-active' : ''}`}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>
        
        <button
          onClick={goNext}
          disabled={currentIndex === transitionImages.length - 1}
          className={`nav-button ${currentIndex === transitionImages.length - 1 ? 'nav-button-disabled' : 'nav-button-active'}`}
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default ImageWithTextTransition;
