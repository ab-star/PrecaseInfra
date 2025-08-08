"use client";
import React, { useState, useRef, useEffect } from 'react';

const FinalHeroSection = () => {
  const [videoStatus, setVideoStatus] = useState<'loading' | 'loaded' | 'error' | 'fallback'>('loading');
  const [userInteracted, setUserInteracted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Show fallback after 3 seconds if video hasn't loaded
    const fallbackTimer = setTimeout(() => {
      if (videoStatus === 'loading') {
        console.log('Video taking too long - showing fallback');
        setVideoStatus('fallback');
      }
    }, 3000);

    return () => clearTimeout(fallbackTimer);
  }, [videoStatus]);

  const handleLoadVideo = async () => {
    setUserInteracted(true);
    if (videoRef.current && videoStatus !== 'loaded') {
      try {
        setVideoStatus('loading');
        videoRef.current.load(); // Force reload
        await videoRef.current.play();
        setVideoStatus('loaded');
        setIsPlaying(true);
      } catch (error) {
        console.error('Failed to load/play video:', error);
        setVideoStatus('error');
      }
    } else if (videoRef.current && videoStatus === 'loaded') {
      try {
        if (isPlaying) {
          videoRef.current.pause();
          setIsPlaying(false);
        } else {
          await videoRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('Failed to play video:', error);
      }
    }
  };

  const handleVideoLoad = () => {
    console.log('Video loaded successfully');
    setVideoStatus('loaded');
  };

  const handleVideoError = () => {
    console.error('Video failed to load');
    setVideoStatus('error');
  };

  const showVideo = videoStatus === 'loaded' && userInteracted;

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image - Always visible */}
      <div 
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/BoxCulvert/BoxIntro.jpeg)',
          filter: showVideo ? 'brightness(0.7)' : 'brightness(1)'
        }}
      />

      {/* Video Layer - Only when user chooses to load it */}
      {userInteracted && (
        <video
          ref={videoRef}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
            showVideo ? 'opacity-100' : 'opacity-0'
          }`}
          muted
          loop
          playsInline
          preload="none" // Don't preload due to large file size
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
        >
          <source src="/box-culvert-hero.mp4" type="video/mp4" />
        </video>
      )}

      {/* Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black/60 via-transparent to-black/40 z-10" />

      {/* Content Overlay */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="text-center text-white max-w-5xl px-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            Box Culvert
            <span className="block text-3xl md:text-4xl lg:text-5xl text-blue-400 mt-2 font-light">
              Engineering Excellence
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 leading-relaxed text-gray-200 max-w-3xl mx-auto">
            Innovative precast concrete solutions for modern infrastructure. 
            Built to last, designed to perform under the most demanding conditions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            {/* Video Control Button */}
            <button 
              onClick={handleLoadVideo}
              disabled={videoStatus === 'loading'}
              className={`${
                videoStatus === 'loading' 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : videoStatus === 'error'
                  ? 'bg-red-600 hover:bg-red-700'
                  : showVideo && isPlaying
                  ? 'bg-orange-600 hover:bg-orange-700'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg`}
            >
              {videoStatus === 'loading' && userInteracted ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  Loading Video...
                </>
              ) : videoStatus === 'error' ? (
                <>🔄 Retry Video</>
              ) : showVideo && isPlaying ? (
                <>⏸ Pause Video</>
              ) : showVideo ? (
                <>▶ Play Video</>
              ) : (
                <>🎥 Load Video (36MB)</>
              )}
            </button>
            
            <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg">
              View Specifications
            </button>
          </div>

          {/* Status Information */}
          <div className="text-sm text-gray-300 space-y-1">
            {videoStatus === 'fallback' && (
              <p className="text-blue-400">📷 High-quality image mode - Click "Load Video" to switch to video</p>
            )}
            {videoStatus === 'error' && (
              <p className="text-red-400">⚠ Video unavailable - Check your connection and try again</p>
            )}
            {showVideo && (
              <p className="text-green-400">✓ Video active - Click to control playback</p>
            )}
            {!userInteracted && videoStatus === 'loading' && (
              <div className="space-y-1">
                <p className="text-yellow-400">🎬 Ready to load video presentation</p>
                <p className="text-xs text-gray-400">Large file (36MB) - loads only when requested</p>
              </div>
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

      {/* Performance Badge */}
      <div className="absolute top-6 right-6 z-20">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-sm">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              videoStatus === 'loaded' ? 'bg-green-400' : 
              videoStatus === 'error' ? 'bg-red-400' : 
              'bg-yellow-400'
            }`}></div>
            <span className="font-medium">
              {videoStatus === 'loaded' ? 'Video Ready' : 
               videoStatus === 'error' ? 'Image Mode' : 
               'Optimized Loading'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalHeroSection;
