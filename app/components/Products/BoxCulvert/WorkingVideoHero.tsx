"use client";
import React from 'react';

const WorkingVideoHero = () => {
  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        muted
        loop
        controls
        poster="/concreteBoxLegacy.jpg"
      >
        <source src="https://pub-ff6f7349f0ca4f698e9006f92b5c1c8a.r2.dev/BoxVideo/BoxVideo1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center h-full text-white text-center px-4">
        <div className="max-w-4xl">
          <h1 className="text-6xl font-bold mb-6 drop-shadow-lg">
            Box Culvert Solutions
          </h1>
          <p className="text-xl mb-8 drop-shadow-lg">
            Click play to view our engineering excellence in action
          </p>
          <button 
            onClick={() => {
              const video = document.querySelector('video');
              if (video) {
                video.play();
              }
            }}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Play Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkingVideoHero;
