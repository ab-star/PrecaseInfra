"use client";
import React from 'react';
import Image from 'next/image';

export default function ImageTest() {
  const images = [
    '/product/BoxCulvertProduct/transition/1.png',
    '/product/BoxCulvertProduct/transition/2.png',
    '/product/BoxCulvertProduct/transition/3.png',
    '/product/BoxCulvertProduct/transition/4.png',
    '/product/BoxCulvertProduct/transition/5.png',
    '/product/BoxCulvertProduct/transition/6.png'
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Image Test Page</h1>
      <div className="grid grid-cols-2 gap-4">
        {images.map((src, index) => (
          <div key={index} className="relative w-full h-64 border border-gray-300">
            <p className="text-center p-2">Image {index + 1}</p>
            <Image
              src={src}
              alt={`Test image ${index + 1}`}
              fill
              className="object-cover"
              onError={(e) => {
                console.log(`Error loading image ${index + 1}:`, src);
                e.currentTarget.style.backgroundColor = 'red';
              }}
              onLoad={() => console.log(`Loaded: ${src}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
