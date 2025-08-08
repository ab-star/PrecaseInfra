"use client";
import React, { useState } from 'react';

const SuperSimpleTransition = () => {
  const [currentImage, setCurrentImage] = useState(0);
  
  const images = [
    '/test-image.png', // We know this works
    '/product/BoxCulvertProduct/transition/1.png',
    '/product/BoxCulvertProduct/transition/2.png',
    '/product/BoxCulvertProduct/transition/3.png',
    '/product/BoxCulvertProduct/transition/4.png',
    '/product/BoxCulvertProduct/transition/5.png',
    '/product/BoxCulvertProduct/transition/6.png'
  ];

  const titles = [
    'Test Image (Root)',
    'Manufacturing Step 1',
    'Manufacturing Step 2', 
    'Manufacturing Step 3',
    'Manufacturing Step 4',
    'Manufacturing Step 5',
    'Manufacturing Step 6'
  ];

  return (
    <section className="w-full h-screen bg-gray-900 flex items-center justify-center">
      <div className="max-w-4xl w-full p-8">
        <h1 className="text-white text-4xl mb-8 text-center">
          Image Test - {titles[currentImage]}
        </h1>
        
        {/* Display Current Image */}
        <div className="w-full h-96 bg-gray-800 border-4 border-white mb-8 relative">
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-sm rounded z-10">
            Image {currentImage + 1}/7
          </div>
          <img
            src={images[currentImage]}
            alt={`Test ${currentImage}`}
            className="w-full h-full object-contain"
            style={{ backgroundColor: '#1f2937' }}
            onLoad={() => {
              console.log(`✅ Loaded: ${images[currentImage]}`);
            }}
            onError={(e) => {
              console.error(`❌ Failed: ${images[currentImage]}`);
              e.currentTarget.style.backgroundColor = 'red';
              e.currentTarget.innerHTML = `<div style="color: white; display: flex; align-items: center; justify-content: center; height: 100%; flex-direction: column;">
                <h3>FAILED TO LOAD</h3>
                <p>${images[currentImage]}</p>
              </div>`;
            }}
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={() => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white font-semibold"
          >
            ← Previous
          </button>
          <button
            onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white font-semibold"
          >
            Next →
          </button>
        </div>

        {/* Image dots */}
        <div className="flex justify-center space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentImage ? 'bg-white' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Debug info */}
        <div className="mt-8 bg-black bg-opacity-75 text-white p-4 rounded text-sm">
          <strong>Current Path:</strong> {images[currentImage]}<br/>
          <strong>Index:</strong> {currentImage}<br/>
          <strong>Title:</strong> {titles[currentImage]}
        </div>
      </div>
    </section>
  );
};

export default SuperSimpleTransition;
