"use client";
import React from 'react';

const SimpleVideoHero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        controls
      >
        <source src="/box-culvert-hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 z-10" />

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center h-full text-white text-center px-4">
        <div className="max-w-4xl">
          <h1 className="text-6xl font-bold mb-6 drop-shadow-lg">
            Box Culvert Solutions
          </h1>
          <p className="text-xl mb-8 drop-shadow-lg">
            Engineered for strength, built for durability. Our precast concrete box culverts provide superior drainage solutions for infrastructure projects.
          </p>
          <div className="space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition-colors">
              Learn More
            </button>
            <button className="border border-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-semibold transition-colors">
              Download Specs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleVideoHero;
