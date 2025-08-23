"use client";
import React, { useState, useRef } from 'react';

const HeroVideoSectionWorking = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoLoad = () => {
    console.log('Video loaded successfully');
    setVideoLoaded(true);
  };

  const handleVideoError = (e: unknown) => {
    console.error('Video failed to load:', e);
    setVideoError(true);
  };

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gray-900">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        muted
        loop
        playsInline
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
        poster="/BoxCulvert/BoxIntro.jpeg"
      >
        <source src="https://pub-ff6f7349f0ca4f698e9006f92b5c1c8a.r2.dev/BoxVideo/BoxVideo1.mp4" type="video/mp4" />
      </video>

      {/* Fallback Image (shown if video fails) */}
      {videoError && (
        <div 
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/BoxCulvert/BoxIntro.jpeg)'
          }}
        />
      )}

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 z-10" />

      {/* Content Overlay */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="text-center text-white max-w-4xl px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Box Culvert
            <span className="block text-3xl md:text-4xl text-blue-400 mt-2">
              Engineering Excellence
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 leading-relaxed text-gray-200">
            Innovative precast concrete solutions for modern infrastructure. 
            Built to last, designed to perform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={handlePlayVideo}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              {videoLoaded ? 'Play Video' : 'Loading Video...'}
            </button>
            
            <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300">
              View Specifications
            </button>
          </div>

          {/* Video Status */}
          <div className="mt-6 text-sm text-gray-300">
            {videoError && (
              <p className="text-red-400">⚠ Video unavailable - showing fallback image</p>
            )}
            {videoLoaded && !videoError && (
              <p className="text-green-400">✓ Video ready</p>
            )}
            {!videoLoaded && !videoError && (
              <p className="text-yellow-400">Loading video...</p>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center text-white animate-bounce">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroVideoSectionWorking;
