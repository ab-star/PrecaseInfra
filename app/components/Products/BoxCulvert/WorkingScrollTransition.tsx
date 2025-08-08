"use client";
import React, { useState, useEffect } from 'react';

const WorkingScrollTransition = () => {
  const [currentImage, setCurrentImage] = useState(0);
  
  const images = [
    '/product/BoxCulvertProduct/transition/1.png',
    '/product/BoxCulvertProduct/transition/2.png', 
    '/product/BoxCulvertProduct/transition/3.png',
    '/product/BoxCulvertProduct/transition/4.png',
    '/product/BoxCulvertProduct/transition/5.png',
    '/product/BoxCulvertProduct/transition/6.png'
  ];

  const descriptions = [
    "Raw Material Preparation",
    "Steel Reinforcement Setup",
    "Concrete Mixing & Pouring", 
    "Molding & Shaping Process",
    "Curing & Quality Control",
    "Final Box Culvert Product"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="w-full h-screen bg-gray-900 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={images[currentImage]}
          alt={`Manufacturing step ${currentImage + 1}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error(`Failed to load: ${images[currentImage]}`);
            e.currentTarget.style.backgroundColor = '#374151';
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-white text-center px-6">
        <div className="max-w-4xl">
          <h2 className="text-5xl font-bold mb-6 drop-shadow-lg">
            Manufacturing Process
          </h2>
          <h3 className="text-3xl font-semibold mb-4 drop-shadow-lg">
            {descriptions[currentImage]}
          </h3>
          <p className="text-xl mb-8 drop-shadow-lg">
            Step {currentImage + 1} of {images.length}
          </p>
          
          {/* Manual navigation buttons */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              ← Previous
            </button>
            <button
              onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Progress indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-3 h-3 rounded-full border-2 border-white transition-all duration-300 ${
                index === currentImage ? 'bg-white scale-110' : 'bg-transparent hover:bg-white hover:bg-opacity-50'
              }`}
            />
          ))}
        </div>
        <p className="text-white text-sm text-center mt-2 opacity-75">
          Click dots or buttons to navigate • Auto-advances every 3 seconds
        </p>
      </div>

      {/* Debug info */}
      <div className="absolute top-4 right-4 bg-black bg-opacity-75 text-white p-2 rounded text-sm">
        Current: {currentImage + 1}/{images.length}<br/>
        File: {images[currentImage].split('/').pop()}
      </div>
    </section>
  );
};

export default WorkingScrollTransition;
