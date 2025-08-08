"use client"
import React, { useState } from 'react';
import { FaBolt, FaTint, FaTrain, FaIndustry, FaRoad } from 'react-icons/fa';

const FujiSilvertechLanding = () => {
  const [hoveredSector, setHoveredSector] = useState<number | null>(null);
  
  const sectors = [
    {
      name: "POWER",
      hoverText: "Innovative power distribution systems for modern cities",
      bgImage: "/HomeTransition/HomeProd1.jpeg",
      icon: <FaBolt className="text-4xl md:text-5xl mb-2 text-yellow-400 drop-shadow" />
    },
    {
      name: "WATER & SEWAGE",
      hoverText: "Eco-friendly water treatment and drainage solutions",
      bgImage: "/HomeTransition/HomeProd2.jpeg",
      icon: <FaTint className="text-4xl md:text-5xl mb-2 text-blue-300 drop-shadow" />
    },
    {
      name: "RAILWAYS",
      hoverText: "Durable railway components for high-speed transit",
      bgImage: "/HomeTransition/HomeProd3.jpeg",
      icon: <FaTrain className="text-4xl md:text-5xl mb-2 text-gray-200 drop-shadow" />
    },
    {
      name: "INDUSTRIAL",
      hoverText: "Heavy-duty industrial construction materials",
      bgImage: "/HomeTransition/HomeProd4.jpeg",
      icon: <FaIndustry className="text-4xl md:text-5xl mb-2 text-gray-400 drop-shadow" />
    },
    {
      name: "ROADS & BRIDGES",
      hoverText: "Long-lasting road and bridge construction systems",
      bgImage: "/HomeTransition/HomeProd5.jpeg",
      icon: <FaRoad className="text-4xl md:text-5xl mb-2 text-amber-200 drop-shadow" />
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
      
      {/* Dynamic Text Overlay - Centered with black text */}
      {hoveredSector !== null && (
        <div className="absolute z-30 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full px-4">
          <p className="text-black text-3xl md:text-5xl font-bold tracking-wide">
            {sectors[hoveredSector].hoverText}
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

      {/* Sectors bar */}
      <div className="absolute left-0 bottom-0 w-full z-50 bg-transparent flex flex-row">
        {sectors.map((sector, index) => (
          <React.Fragment key={sector.name}>
            <div
              className="group flex-1 h-full min-h-[64px] flex flex-col justify-center items-center cursor-pointer transition-all duration-500 relative"
              onMouseEnter={() => setHoveredSector(index)}
            >
              <button
                className={`w-full h-full flex-1 flex flex-col justify-center items-center text-center transition-all duration-300 truncate bg-transparent border-none outline-none text-white text-lg sm:text-xl md:text-2xl font-bold ${hoveredSector === index ? 'drop-shadow-[0_0_16px_rgba(59,130,246,0.7)] text-blue-300 scale-105' : ''}`}
                tabIndex={0}
              >
                {sector.icon}
                {sector.name}
              </button>
              {index < sectors.length - 1 && (
                <span className="absolute top-0 right-0 w-px h-full bg-white opacity-60" aria-hidden="true"></span>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default FujiSilvertechLanding;