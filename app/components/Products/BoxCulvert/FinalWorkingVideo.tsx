"use client";
import React, { useRef, useState } from 'react';

const FinalWorkingVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      {/* Poster Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(/concreteBoxLegacy.jpg)',
          display: isLoaded && isPlaying ? 'none' : 'block'
        }}
      />

      {/* Video */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        muted
        loop
        preload="metadata"
        onLoadedData={() => setIsLoaded(true)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        style={{ display: isLoaded && isPlaying ? 'block' : 'none' }}
      >
        <source src="/box-culvert-hero.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center h-full text-white text-center px-4">
        <div className="max-w-4xl">
          <h1 className="text-6xl font-bold mb-6 drop-shadow-lg">
            Box Culvert Solutions
          </h1>
          <p className="text-xl mb-8 drop-shadow-lg">
            Engineered for strength, built for durability. Our precast concrete box culverts provide superior drainage solutions.
          </p>
          <div className="space-x-4">
            <button 
              onClick={handlePlayClick}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 mx-auto"
            >
              {isPlaying ? '⏸️ Pause Video' : '▶️ Play Video'}
            </button>
          </div>
          {!isLoaded && (
            <p className="text-sm mt-4 opacity-75">Loading video...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinalWorkingVideo;
