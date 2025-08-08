"use client";
import React from 'react';

export default function SimpleImageTest() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Simple Image Test</h1>
      
      {/* Test with regular img tag */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Using regular img tag:</h2>
        <img 
          src="/product/BoxCulvertProduct/transition/1.png" 
          alt="Test image 1"
          className="w-64 h-64 object-cover border"
          onError={(e) => {
            console.error('Image failed to load:', e);
            e.currentTarget.style.backgroundColor = 'red';
            e.currentTarget.innerHTML = 'FAILED TO LOAD';
          }}
          onLoad={() => console.log('Image loaded successfully')}
        />
      </div>

      {/* Test all images */}
      <div>
        <h2 className="text-lg font-semibold mb-2">All transition images:</h2>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(num => (
            <div key={num} className="text-center">
              <p>Image {num}</p>
              <img 
                src={`/product/BoxCulvertProduct/transition/${num}.png`}
                alt={`Transition ${num}`}
                className="w-32 h-32 object-cover border mx-auto"
                onError={(e) => {
                  e.currentTarget.style.backgroundColor = 'red';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.innerHTML = `ERROR ${num}`;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
