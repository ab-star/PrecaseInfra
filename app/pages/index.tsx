"use client"
import React, { useState } from 'react';
import { FaBolt, FaTint, FaTrain, FaIndustry, FaRoad } from 'react-icons/fa';

const FujiSilvertechLanding = () => {
  const [hoveredSector, setHoveredSector] = useState<number | null>(null);
  
  const sectors = [
    {
      name: "POWER",
      bgImage: "/Home/1P.png",
      icon: <FaBolt className="text-4xl md:text-5xl mb-2 text-yellow-400 drop-shadow" />
    },
    {
      name: "WATER & SEWAGE",
      bgImage: "/Home/2P.png",
      icon: <FaTint className="text-4xl md:text-5xl mb-2 text-blue-300 drop-shadow" />
    },
    {
      name: "RAILWAYS",
      bgImage: "/Home/3P.png",
      icon: <FaTrain className="text-4xl md:text-5xl mb-2 text-gray-200 drop-shadow" />
    },
    {
      name: "INDUSTRIAL",
      bgImage: "/Home/4P.png",
      icon: <FaIndustry className="text-4xl md:text-5xl mb-2 text-gray-400 drop-shadow" />
    },
    {
      name: "ROADS & BRIDGES",
      bgImage: "/Home/5p.png", // note: filename is lowercase 'p' per directory listing
      icon: <FaRoad className="text-4xl md:text-5xl mb-2 text-amber-200 drop-shadow" />
    },
    {
      name: "URBAN INFRA",
      bgImage: "/Home/6P.png",
      icon: <FaIndustry className="text-4xl md:text-5xl mb-2 text-slate-200 drop-shadow" />
    }
  ];

  return (
    <div className="relative overflow-hidden font-sans w-full h-screen"> {/* Changed to h-screen */}
      {/* Background container */}
      <div className="absolute inset-0 z-0 transition-all duration-[1600ms] ease-[cubic-bezier(.4,0,.2,1)]" style={{
        backgroundImage: hoveredSector !== null && typeof hoveredSector === 'number'
          ? `url(${sectors[hoveredSector].bgImage})`
          : `url(/HomeTransition/MainBackground.jpeg)`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        transition: 'background-image 1.2s cubic-bezier(.4,0,.2,1)'
      }} />
      
    {/* Dynamic Text Overlay - Centered with white text (guarded) */}
  {hoveredSector !== null && (sectors as any)[hoveredSector]?.hoverText && (
        <div className="absolute z-30 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full px-4">
      <p className="text-white text-3xl md:text-5xl font-bold tracking-wide drop-shadow-[0_0_10px_rgba(0,0,0,0.55)]">
    {(sectors as any)[hoveredSector].hoverText}
          </p>
        </div>
      )}

      {/* Hover zones */}
      <div className="absolute inset-0 z-40 pointer-events-none flex flex-row w-full h-full">
        {sectors.map((_, index) => (
          <div
            key={index}
            className="flex-1 h-full cursor-pointer relative"
            style={{ pointerEvents: 'auto' }}
            onMouseEnter={() => setHoveredSector(index)}
            onMouseLeave={() => setHoveredSector(null)}
          >
            {index < sectors.length - 1 && (
              <span className="absolute top-0 right-0 w-px h-full bg-white opacity-60 z-50" aria-hidden="true"></span>
            )}
          </div>
        ))}
      </div>

      {/* Sectors labels overlay (full-height, centered vertically) */}
      <div className="absolute inset-0 z-50 bg-transparent flex flex-row pointer-events-none">
        {sectors.map((sector, index) => (
          <React.Fragment key={sector.name}>
            <div
              className="flex-1 h-full flex justify-center items-center transition-all duration-500 relative"
            >
              <button
                className={`w-full h-full flex-1 flex justify-center items-center text-center transition-all duration-300 bg-transparent border-none outline-none text-white text-xl sm:text-2xl md:text-3xl font-bold ${hoveredSector === index ? 'drop-shadow-[0_0_16px_rgba(255,255,255,0.85)] scale-105' : ''}`}
                tabIndex={0}
                style={{
                  color: '#fff',
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                  transform: 'rotate(180deg)',
                  letterSpacing: '0.08em',
                  pointerEvents: 'none'
                }}
              >
                {sector.name}
              </button>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default FujiSilvertechLanding;