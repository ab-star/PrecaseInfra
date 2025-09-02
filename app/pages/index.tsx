"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Anton } from 'next/font/google';
// Font must be initialized at module scope
const anton = Anton({ subsets: ['latin'], weight: '400', display: 'swap' });
import { FaBolt, FaTint, FaTrain, FaIndustry, FaRoad } from 'react-icons/fa';

const FujiSilvertechLanding = () => {
  const [hoveredSector, setHoveredSector] = useState<number | null>(null);
  const MAIN_BG = "/HomeTransition/MainBackground.jpg";
  const [activeBg, setActiveBg] = useState<string>(MAIN_BG);
  const [overlayBg, setOverlayBg] = useState<string | null>(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const fadeTimeoutRef = useRef<number | null>(null);
  const [activeAspect, setActiveAspect] = useState<number | null>(null); // width / height
  const [overlayAspect, setOverlayAspect] = useState<number | null>(null);
  const [containerHeight, setContainerHeight] = useState<number | null>(null);
  const isTopAligned = (src?: string | null) => !!src && (src.includes('/Home/3P.png') || src.includes('/Home/4P.png'));

  type Sector = {
    name: string;
    bgImage: string;
    icon: React.ReactNode;
    hoverText?: string;
  };

  const sectors: Sector[] = useMemo(() => ([
    {
      name: "U Shape Drain - H Weight",
      bgImage: "/Home/1P.png",
      icon: <FaBolt className="text-4xl md:text-5xl mb-2 text-yellow-400 drop-shadow" />
    },
    {
      name: "L Shape Wall",
      bgImage: "/Home/2P.png",
      icon: <FaTint className="text-4xl md:text-5xl mb-2 text-blue-300 drop-shadow" />
    },
    {
      name: "Box Culvert",
      bgImage: "/Home/3P.png",
      icon: <FaTrain className="text-4xl md:text-5xl mb-2 text-gray-200 drop-shadow" />
    },
    {
      name: "U Shape Big Drain",
      bgImage: "/Home/4P.png",
      icon: <FaIndustry className="text-4xl md:text-5xl mb-2 text-gray-400 drop-shadow" />
    },
    {
      name: "U Shape Drain - L Weight",
      bgImage: "/Home/5p.png",
      icon: <FaRoad className="text-4xl md:text-5xl mb-2 text-amber-200 drop-shadow" />
    },
    {
      name: "Retaining Wall",
      bgImage: "/Home/6P.png",
      icon: <FaIndustry className="text-4xl md:text-5xl mb-2 text-slate-200 drop-shadow" />
    }
  ]), []);

  // Preload all background images for smooth transitions
  useEffect(() => {
    const urls = [MAIN_BG, ...sectors.map(s => s.bgImage)];
    urls.forEach(src => { const img = new Image(); img.src = src; });
  }, [sectors]);

  // Load natural aspect ratio for a given image url
  const loadAspect = (src: string, setter: (r: number) => void) => {
    if (!src) return;
    const img = new Image();
    img.onload = () => {
      if (img.naturalWidth && img.naturalHeight) {
        setter(img.naturalWidth / img.naturalHeight);
      }
    };
    img.src = src;
  };

  // Load aspect ratios for active and overlay backgrounds
  useEffect(() => { loadAspect(activeBg, r => setActiveAspect(r)); }, [activeBg]);
  useEffect(() => { if (overlayBg) loadAspect(overlayBg, r => setOverlayAspect(r)); }, [overlayBg]);

  // Compute container height on resize/orientation and bg changes (mobile-first)
  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const isMobile = vw < 768;
      const targetAspect = (overlayVisible && overlayBg ? overlayAspect : activeAspect) ?? null;
      if (isMobile && targetAspect) {
        // Fit image without cropping: height based on width, capped by viewport height
        const heightByWidth = vw / targetAspect;
        const h = Math.min(vh, heightByWidth);
        setContainerHeight(Math.max(320, Math.round(h))); // clamp a sensible minimum
      } else {
        setContainerHeight(Math.round(vh));
      }
    };
    compute();
    window.addEventListener('resize', compute);
    window.addEventListener('orientationchange', compute);
    return () => {
      window.removeEventListener('resize', compute);
      window.removeEventListener('orientationchange', compute);
    };
  }, [activeAspect, overlayAspect, overlayVisible, overlayBg]);

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
  <div
    className="relative overflow-hidden font-sans w-full"
    style={{
      height: containerHeight ? `${containerHeight}px` : '100dvh',
      transition: 'height 300ms ease',
      // Respect safe areas on mobile notch devices
      paddingTop: 'env(safe-area-inset-top)',
      paddingBottom: 'env(safe-area-inset-bottom)',
      touchAction: 'pan-y',
      overflowY: 'hidden',
    }}
  >
      {/* Background layers: base + overlay crossfade */}
      <div
        className="absolute inset-0 z-0 bg-center bg-no-repeat bg-contain md:bg-cover"
        style={{
          backgroundImage: `url(${activeBg})`,
          backgroundPosition: isTopAligned(activeBg) ? 'top center' : 'center center',
        }}
      />

      {/* Center Tagline - Stone textured, 3D, two-line (1+2 words) */}
      <div className="absolute inset-0 z-25 pointer-events-none flex items-center justify-center px-4">
        <div className="text-center leading-none rounded-md bg-black/20 md:bg-transparent backdrop-blur-[2px] md:backdrop-blur-0 px-3 py-2 md:px-0 md:py-0">
          <div
            className={`${anton.className} uppercase tracking-[0.06em] text-transparent bg-clip-text select-none
              text-[clamp(28px,10vw,88px)]`}
            style={{
              backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,255,255,0.9)), url('/concrete_texture.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextStroke: '0.75px rgba(255,255,255,0.35)',
              textShadow: '0 1px 0 rgba(0,0,0,0.35), 0 2px 0 rgba(0,0,0,0.25), 0 3px 0 rgba(0,0,0,0.2), 0 8px 14px rgba(0,0,0,0.45)'
            }}
          >
            Built
          </div>
          <div
            className={`${anton.className} uppercase tracking-[0.08em] mt-1 text-transparent bg-clip-text select-none
              text-[clamp(28px,10vw,88px)]`}
            style={{
              backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,255,255,0.9)), url('/concrete_texture.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextStroke: '0.75px rgba(255,255,255,0.35)',
              textShadow: '0 1px 0 rgba(0,0,0,0.35), 0 2px 0 rgba(0,0,0,0.25), 0 3px 0 rgba(0,0,0,0.2), 0 10px 18px rgba(0,0,0,0.5)'
            }}
            aria-label="Built To Last"
          >
            To Last
          </div>
        </div>
      </div>
      <div
        className={`absolute inset-0 z-10 transition-opacity duration-700 ease-[cubic-bezier(.4,0,.2,1)] ${overlayVisible && overlayBg ? 'opacity-100' : 'opacity-0 pointer-events-none'} bg-center bg-no-repeat bg-contain md:bg-cover`}
        style={{
          backgroundImage: overlayBg ? `url(${overlayBg})` : undefined,
          backgroundPosition: isTopAligned(overlayBg) ? 'top center' : 'center center',
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
            onClick={() => setHoveredSector(index)}
            onTouchStart={() => setHoveredSector(index)}
          >
            {/* Vertical label container */}
            <div className="absolute top-1 sm:top-2 md:top-6 left-1/2 -translate-x-1/2 w-full flex flex-col items-center px-1">
              <span
                className={`block max-w-[92%] break-words text-center leading-tight px-1.5 py-0.5 md:py-1 transition-all duration-300 text-white font-semibold bg-black/30 rounded-md backdrop-blur-[2px]
                  text-[clamp(10px,3vw,15px)] sm:text-[clamp(12px,2vw,18px)] md:text-xl
                  ${hoveredSector === index ? 'drop-shadow-[0_0_16px_rgba(255,255,255,0.85)] md:scale-105' : 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]'}`}
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

  {/* Bottom chip labels removed as requested */}
    </div>
  );
};

export default FujiSilvertechLanding;