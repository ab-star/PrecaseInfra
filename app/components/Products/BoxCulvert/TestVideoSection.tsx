"use client";
import React, { useRef, useEffect } from 'react';

const TestVideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    console.log('TestVideoSection mounted');
    if (videoRef.current) {
      console.log('Video element found:', videoRef.current);
      const video = videoRef.current;
      
      video.addEventListener('loadstart', () => console.log('Video: loadstart'));
      video.addEventListener('loadeddata', () => console.log('Video: loadeddata'));
      video.addEventListener('canplay', () => console.log('Video: canplay'));
      video.addEventListener('error', (e) => console.log('Video: error', e));
      
      video.play().then(() => {
        console.log('Video: play succeeded');
      }).catch((err) => {
        console.log('Video: play failed', err);
      });
    }
  }, []);

  return (
    <section className="relative w-full h-screen bg-red-500 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-4xl mb-8">Video Test Section</h1>
        <div className="relative w-80 h-60 mx-auto bg-black">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            controls
          >
            <source src="/box-culvert-hero.mp4" type="video/mp4" />
            <p>Your browser does not support the video tag.</p>
          </video>
        </div>
        <p className="mt-4">Check console for video loading events</p>
      </div>
    </section>
  );
};

export default TestVideoSection;
