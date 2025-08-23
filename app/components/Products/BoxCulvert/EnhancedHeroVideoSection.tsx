"use client";
import React, { useState, useRef, useEffect } from 'react';

const EnhancedHeroVideoSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Set timeout to show fallback if video doesn't load within 5 seconds
    const timer = setTimeout(() => {
      if (!videoLoaded && !videoError) {
        console.log('Video taking too long to load, showing fallback');
        setShowFallback(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [videoLoaded, videoError]);

  const handleVideoLoad = () => {
    console.log('Video loaded successfully');
    setVideoLoaded(true);
    setShowFallback(false);
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Video failed to load:', e);
    setVideoError(true);
    setShowFallback(true);
  };

  const handlePlayVideo = async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.play();
        setIsPlaying(true);
        console.log('Video playing successfully');
      } catch (error) {
        console.error('Failed to play video:', error);
        setVideoError(true);
        setShowFallback(true);
      }
    }
  };

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        handlePlayVideo();
      }
    }
  };

  const handleCanPlay = () => {
    console.log('Video can start playing');
    setVideoLoaded(true);
  };

  const handleLoadStart = () => {
    console.log('Video load started');
  };

  const handleProgress = () => {
    if (videoRef.current) {
      const buffered = videoRef.current.buffered;
      if (buffered.length > 0) {
        const percentLoaded = (buffered.end(0) / videoRef.current.duration) * 100;
        console.log(`Video ${percentLoaded.toFixed(1)}% loaded`);
      }
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      {/* Background Image (Always visible as base layer) */}
      <div 
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/BoxCulvert/BoxIntro.jpeg)'
        }}
      />

      {/* Video Layer (Only visible when loaded and not showing fallback) */}
      {!showFallback && (
        <video
          ref={videoRef}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={handleVideoLoad}
          onCanPlay={handleCanPlay}
          onLoadStart={handleLoadStart}
          onProgress={handleProgress}
          onError={handleVideoError}
          onClick={handleVideoClick}
          style={{ cursor: 'pointer' }}
        >
          <source src="https://pub-ff6f7349f0ca4f698e9006f92b5c1c8a.r2.dev/BoxVideo/BoxVideo1.mp4" type="video/mp4" />
        </video>
      )}

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10" />

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

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            {!showFallback && !videoError && (
              <button 
                onClick={handlePlayVideo}
                disabled={!videoLoaded}
                className={`${
                  videoLoaded 
                    ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer' 
                    : 'bg-gray-600 cursor-not-allowed'
                } text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center gap-2`}
              >
                {isPlaying ? (
                  <>⏸ Pause Video</>
                ) : videoLoaded ? (
                  <>▶ Play Video</>
                ) : (
                  <>⏳ Loading Video...</>
                )}
              </button>
            )}
            
            <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300">
              View Specifications
            </button>
          </div>

          {/* Video Status */}
          <div className="text-sm text-gray-300">
            {showFallback && (
              <p className="text-yellow-400">📷 High-quality image mode</p>
            )}
            {videoError && (
              <p className="text-red-400">⚠ Video unavailable - showing static image</p>
            )}
            {videoLoaded && !videoError && !showFallback && (
              <p className="text-green-400">✓ Video ready - Click to play/pause</p>
            )}
            {!videoLoaded && !videoError && !showFallback && (
              <p className="text-blue-400">🔄 Loading video... (36MB file)</p>
            )}
          </div>

          {/* File Size Warning */}
          {!videoLoaded && !showFallback && (
            <div className="text-xs text-gray-400 mt-2">
              <p>Large video file loading - this may take a moment on slower connections</p>
            </div>
          )}
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

      {/* Debug Info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-4 rounded text-xs z-30">
          <p>Video loaded: {videoLoaded ? 'Yes' : 'No'}</p>
          <p>Video error: {videoError ? 'Yes' : 'No'}</p>
          <p>Show fallback: {showFallback ? 'Yes' : 'No'}</p>
          <p>Is playing: {isPlaying ? 'Yes' : 'No'}</p>
        </div>
      )}
    </section>
  );
};

export default EnhancedHeroVideoSection;
