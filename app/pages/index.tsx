"use client"
import React, { useState } from 'react';
import MainHeader from '../components/MainHeader';
import { FaBolt, FaTint, FaTrain, FaIndustry, FaRoad } from 'react-icons/fa';

const FujiSilvertechLanding = () => {
  const [activeSector, setActiveSector] = useState(0);
  const [hoveredSector, setHoveredSector] = useState<number | null>(null);
  
  // Sector data with local background images
  const sectors = [
    {
      name: "POWER",
      description: "Advanced solutions for energy infrastructure",
      bgImage: "/power.jpeg",
      icon: <FaBolt className="text-2xl md:text-3xl mb-1 text-yellow-400 drop-shadow" />
    },
    {
      name: "WATER & SEWAGE",
      description: "Sustainable water management systems",
      bgImage: "/water.jpeg",
      icon: <FaTint className="text-2xl md:text-3xl mb-1 text-blue-300 drop-shadow" />
    },
    {
      name: "RAILWAYS",
      description: "Innovative rail infrastructure solutions",
      bgImage: "/railway.jpeg",
      icon: <FaTrain className="text-2xl md:text-3xl mb-1 text-gray-200 drop-shadow" />
    },
    {
      name: "INDUSTRIAL",
      description: "Robust industrial infrastructure",
      bgImage: "/industry.jpeg",
      icon: <FaIndustry className="text-2xl md:text-3xl mb-1 text-gray-400 drop-shadow" />
    },
    {
      name: "ROADS & BRIDGES",
      description: "Modern transportation infrastructure",
      bgImage: "/road.jpeg",
      icon: <FaRoad className="text-2xl md:text-3xl mb-1 text-amber-200 drop-shadow" />
    }
  ];
  return (
    <div className="relative overflow-hidden font-sans mx-auto" style={{width: "100%", minHeight: '700px', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}>
      {/* Container-scoped background and overlays */}
      <div className="absolute inset-0 z-0 transition-all duration-[1600ms] ease-[cubic-bezier(.4,0,.2,1)]" style={{
        backgroundImage: hoveredSector !== null && typeof hoveredSector === 'number'
          ? `url(${sectors[hoveredSector].bgImage})`
          : `url(/baseImage.jpeg)`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundColor: '#f3f4f6',
        // borderRadius removed
        transition: 'background-image 1.2s cubic-bezier(.4,0,.2,1)'
      }} />
      {/* Container-scoped vertical hover zones */}
      <div className="absolute inset-0 z-40 pointer-events-none flex flex-row w-full h-full">
        {sectors.map((_, index) => (
          <div
            key={index}
            className="flex-1 h-full cursor-pointer relative"
            style={{ pointerEvents: 'auto' }}
            onMouseEnter={() => setHoveredSector(index)}
            onMouseLeave={() => setHoveredSector(null)}
          >
            {/* Vertical white separator except for last sector */}
            {index < sectors.length - 1 && (
              <span className="absolute top-0 right-0 w-px h-full bg-white opacity-60 z-50" aria-hidden="true"></span>
            )}
          </div>
        ))}
      </div>
      {/* Logo above the sector bar with floating animation */}
      <div className="absolute left-1/2 z-50 flex flex-col items-center animate-floatLogo" style={{ bottom: '110px', transform: 'translateX(-50%)' }}>
        <img src="/file.svg" alt="Logo" className="w-10 h-10 mb-2 drop-shadow-lg" />
      </div>
      {/* Container-scoped horizontal sectors bar at bottom */}
      <div className="absolute left-0 bottom-0 w-full z-50 bg-transparent flex flex-row">
        {sectors.map((sector, index) => (
          <React.Fragment key={sector.name}>
            <div
              className="group flex-1 h-full min-h-[64px] flex flex-col justify-center items-center cursor-pointer transition-all duration-500 relative"
              style={{height: '100%'}}
              onMouseEnter={() => { setActiveSector(index); }}
            >
              <button
                className={`w-full h-full flex-1 flex flex-col justify-center items-center text-center transition-all duration-300 truncate bg-transparent border-none outline-none text-white text-lg sm:text-xl md:text-2xl font-bold ${hoveredSector === index ? 'drop-shadow-[0_0_16px_rgba(59,130,246,0.7)] text-blue-300 scale-105' : ''}`}
                tabIndex={0}
              >
                {sector.icon}
                {sector.name}
              </button>
              {/* Vertical white separator except for last sector */}
              {index < sectors.length - 1 && (
                <span className="absolute top-0 right-0 w-px h-full bg-white opacity-60" aria-hidden="true"></span>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
<style jsx global>{`
@keyframes floatLogo {
  0%, 100% { transform: translateY(0) scale(1.05); }
  50% { transform: translateY(-10px) scale(1.12); }
}
.animate-floatLogo {
  animation: floatLogo 3.5s ease-in-out infinite;
}
`}</style>

        {/* Content Container */}
        <div className="relative z-20 flex flex-col min-h-screen">
        {/* Top Navigation */}
        {/* Main Content */}
        <main className="flex-grow flex flex-col justify-center px-8 py-12">
          <div className="max-w-7xl mx-auto w-full">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-12 tracking-wider">
              THE FUTURE IS PRECAST
            </h2>
            {/* ...existing code... */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default FujiSilvertechLanding;