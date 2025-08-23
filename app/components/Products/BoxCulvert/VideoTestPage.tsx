"use client";
import React from 'react';
import Image from 'next/image';

const VideoTestPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Video Test Page</h1>
      
      {/* Direct video test */}
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Direct Video Test</h2>
          <video 
            className="w-full h-64 bg-black"
            controls
            muted
            loop
            preload="auto"
          >
            <source src="https://pub-ff6f7349f0ca4f698e9006f92b5c1c8a.r2.dev/BoxVideo/BoxVideo1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className="mt-4 text-sm text-gray-600">
            Note: Autoplay removed due to browser restrictions. Click play button above to test video.
          </p>
        </div>
        
        {/* Direct link test */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Direct Link Test</h2>
          <p className="mb-4">Test if the video file can be accessed directly:</p>
          <a 
            href="https://pub-ff6f7349f0ca4f698e9006f92b5c1c8a.r2.dev/BoxVideo/BoxVideo1.mp4" 
            target="_blank" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Open Video in New Tab
          </a>
        </div>
        
        {/* Fallback image test */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Fallback Image Test</h2>
          <div className="relative w-full h-64">
            <Image 
              src="/BoxCulvert/BoxIntro.jpeg" 
              alt="Box Culvert"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTestPage;
