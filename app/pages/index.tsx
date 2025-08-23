"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FaBolt, FaTint, FaTrain, FaIndustry, FaRoad } from 'react-icons/fa';

const FujiSilvertechLanding = () => {
  const [hoveredSector, setHoveredSector] = useState<number | null>(null);
  const MAIN_BG = "/HomeTransition/MainBackground.jpg";
  const [activeBg, setActiveBg] = useState<string>(MAIN_BG);
  const [overlayBg, setOverlayBg] = useState<string | null>(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const fadeTimeoutRef = useRef<number | null>(null);

  type Sector = {
    name: string;
    bgImage: string;
    icon: React.ReactNode;
    hoverText?: string;
  };

  const sectors: Sector[] = useMemo(() => ([
    {
      name: "Product 1",
      bgImage: "/Home/1P.png",
      icon: <FaBolt className="text-4xl md:text-5xl mb-2 text-yellow-400 drop-shadow" />
    },
    {
      name: "Product 2",
      bgImage: "/Home/2P.png",
      icon: <FaTint className="text-4xl md:text-5xl mb-2 text-blue-300 drop-shadow" />
    },
    {
      name: "Product 3",
      bgImage: "/Home/3P.png",
      icon: <FaTrain className="text-4xl md:text-5xl mb-2 text-gray-200 drop-shadow" />
    },
    {
      name: "Product 4",
      bgImage: "/Home/4P.png",
      icon: <FaIndustry className="text-4xl md:text-5xl mb-2 text-gray-400 drop-shadow" />
    },
    {
      name: "Product 5",
      bgImage: "/Home/5p.png",
      icon: <FaRoad className="text-4xl md:text-5xl mb-2 text-amber-200 drop-shadow" />
    },
    {
      name: "Product 6",
      bgImage: "/Home/6P.png",
      icon: <FaIndustry className="text-4xl md:text-5xl mb-2 text-slate-200 drop-shadow" />
    }
  ]), []);

  // Preload all background images for smooth transitions
  useEffect(() => {
    const urls = [MAIN_BG, ...sectors.map(s => s.bgImage)];
    urls.forEach(src => { const img = new Image(); img.src = src; });
  }, [sectors]);

  // Crossfade to target background when hoveredSector changes
  useEffect(() => {
    const target = hoveredSector !== null ? sectors[hoveredSector].bgImage : MAIN_BG;
    if (target === activeBg) {
      setOverlayVisible(false);
      return;
    }
    setOverlayBg(target);
    setOverlayVisible(true);
    if (fadeTimeoutRef.current) window.clearTimeout(fadeTimeoutRef.current);
    fadeTimeoutRef.current = window.setTimeout(() => {
      setActiveBg(target);
      setOverlayVisible(false);
    }, 700); // match CSS duration
    return () => {
      if (fadeTimeoutRef.current) window.clearTimeout(fadeTimeoutRef.current);
    };
  }, [hoveredSector, sectors, activeBg]);

  return (
    <div className="relative overflow-hidden font-sans w-full h-screen">
      {/* Background layers: base + overlay crossfade */}
      <div className="absolute inset-0 z-0" style={{
        backgroundImage: `url(${activeBg})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: '100% auto',
        backgroundColor: '#000',
      }} />
      <div className={`absolute inset-0 z-10 transition-opacity duration-700 ease-[cubic-bezier(.4,0,.2,1)] ${overlayVisible && overlayBg ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{
          backgroundImage: overlayBg ? `url(${overlayBg})` : undefined,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: '100% auto',
        }}
      />
      
      {/* Dynamic Text Overlay - Centered with white text (guarded) */}
      {hoveredSector !== null && sectors[hoveredSector]?.hoverText && (
        <div className="absolute z-30 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full px-4">
          <p className="text-white text-3xl md:text-5xl font-bold tracking-wide drop-shadow-[0_0_10px_rgba(0,0,0,0.55)]">
            {sectors[hoveredSector]?.hoverText}
          </p>
        </div>
      )}

  {/* Hover zones with vertical labels */}
  <div className="absolute inset-0 z-40 pointer-events-none flex flex-row w-full h-full">
        {sectors.map((sector, index) => (
          <div
            key={index}
            className="flex-1 h-full cursor-pointer relative"
            style={{ pointerEvents: 'auto' }}
            onMouseEnter={() => setHoveredSector(index)}
            onMouseLeave={() => setHoveredSector(null)}
          >
            {/* Vertical label container */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-full flex flex-col items-center">
              <span
                className={`text-center transition-all duration-300 text-white text-base sm:text-lg md:text-xl font-semibold ${hoveredSector === index ? 'drop-shadow-[0_0_16px_rgba(255,255,255,0.85)] scale-110' : 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]'}`}
                style={{ color: '#fff' }}
              >
                {sector.name}
              </span>
            </div>
            
            {index < sectors.length - 1 && (
              <span className="absolute top-0 right-0 w-px h-full bg-white opacity-60 z-50" aria-hidden="true"></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FujiSilvertechLanding;