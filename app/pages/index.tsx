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
  const [containerHeight, setContainerHeight] = useState<number | null>(null);
  const [activeAspect, setActiveAspect] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<{[key: string]: {width: number, height: number}}>({});
  const isTopAligned = (src?: string | null) => !!src && (src.includes('/Home/3P.png') || src.includes('/Home/4P.png'));

  type Sector = {
    name: string;
    bgImage: string;
    icon: React.ReactNode;
    hoverText?: string;
    shortName: string;
    customAspect?: number;
  };

  const sectors: Sector[] = useMemo(() => ([
    {
      name: "U Shape Drain - T6(Light)",
      shortName: "U-Drain T6",
      bgImage: "/Home/4P.png",
      icon: <FaBolt className="text-4xl md:text-5xl mb-2 text-yellow-400 drop-shadow" />
    },
    {
      name: "U Shape Drain - T25(Heavy)",
      shortName: "U-Drain T25",
      bgImage: "/Home/1P.png",
      icon: <FaIndustry className="text-4xl md:text-5xl mb-2 text-gray-400 drop-shadow" />
    },
    {
      name: "FT (Big size Drain)",
      shortName: "FT Drain",
      bgImage: "/Home/5p.png",
      icon: <FaRoad className="text-4xl md:text-5xl mb-2 text-amber-200 drop-shadow" />,
      customAspect: 4/3
    },
    {
      name: "Box Culvert",
      shortName: "Box Culvert",
      bgImage: "/Home/3P.png",
      icon: <FaTrain className="text-4xl md:text-5xl mb-2 text-gray-200 drop-shadow" />
    },
    {
      name: "L Shape Retaining Wall",
      shortName: "L-Wall",
      bgImage: "/Home/2P.png",
      icon: <FaTint className="text-4xl md:text-5xl mb-2 text-blue-300 drop-shadow" />
    },
    {
      name: "Compound Wall",
      shortName: "Compound Wall",
      bgImage: "/Home/6P.png",
      icon: <FaIndustry className="text-4xl md:text-5xl mb-2 text-slate-200 drop-shadow" />
    }
  ]), []);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Preload and get dimensions of all images
  useEffect(() => {
    const urls = [MAIN_BG, ...sectors.map(s => s.bgImage)];
    const dimensions: {[key: string]: {width: number, height: number}} = {};
    
    urls.forEach(src => {
      const img = new Image();
      img.onload = () => {
        dimensions[src] = {
          width: img.naturalWidth,
          height: img.naturalHeight
        };
        setImageDimensions(prev => ({...prev, ...dimensions}));
        
        // Set aspect ratio for active background
        if (src === activeBg) {
          setActiveAspect(img.naturalWidth / img.naturalHeight);
        }
      };
      img.src = src;
    });
  }, [sectors, activeBg]);

  // Improved responsive height calculation with aspect ratio consideration
  useEffect(() => {
    const computeHeight = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const mobile = vw < 768;
      
      if (mobile) {
        // For mobile, calculate height based on viewport width and image aspect ratio
        let calculatedHeight;
        
        if (activeAspect) {
          // Use the image's natural aspect ratio to calculate height
          calculatedHeight = vw / activeAspect;
        } else {
          // Fallback to viewport-based calculation
          calculatedHeight = Math.max(340, Math.min(vh, 620));
        }
        
        // Ensure the height is reasonable for mobile
        calculatedHeight = Math.max(300, Math.min(calculatedHeight, vh * 0.9));
        setContainerHeight(calculatedHeight);
      } else {
        // For desktop, use full viewport height
        setContainerHeight(vh);
      }
    };
    
    computeHeight();
    window.addEventListener('resize', computeHeight);
    window.addEventListener('orientationchange', computeHeight);
    
    return () => {
      window.removeEventListener('resize', computeHeight);
      window.removeEventListener('orientationchange', computeHeight);
    };
  }, [activeAspect, isMobile]);

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
    }, 700);
    return () => {
      if (fadeTimeoutRef.current) window.clearTimeout(fadeTimeoutRef.current);
    };
  }, [hoveredSector, sectors, activeBg]);

  // Get optimal object position for each image
  const getObjectPosition = (bgImage: string) => {
    // Special handling for problematic images
    if (bgImage.includes('5p.png')) {
      return isMobile ? 'left center' : 'center center';
    }
    
    // For other images, use top center if they need top alignment
    return isTopAligned(bgImage) ? 'top center' : 'center center';
  };

  // Check if image needs special handling on mobile
  const needsSpecialHandling = (bgImage: string) => {
    return bgImage.includes('5p.png') && isMobile;
  };

  return (
    <div
      className="relative overflow-hidden font-sans w-full flex items-center justify-center bg-black"
      style={{
        height: containerHeight ? `${containerHeight}px` : '100dvh',
        minHeight: '480px',
        maxHeight: isMobile ? '90vh' : '100vh',
        transition: 'height 300ms ease',
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 0,
        touchAction: 'pan-y',
        overflow: 'hidden',
      }}
    >
      {/* Background layers: base + overlay crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={activeBg}
          alt="Background"
          className={`w-full h-full transition-opacity duration-300 ${
            needsSpecialHandling(activeBg) ? 'object-cover' : 'object-cover'
          }`}
          style={{
            objectPosition: getObjectPosition(activeBg),
            // Ensure the image fills the container completely
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto'
          }}
        />
      </div>

      {/* Overlay background for transitions */}
      <div className={`absolute inset-0 z-10 transition-opacity duration-700 ease-[cubic-bezier(.4,0,.2,1)] ${
        overlayVisible && overlayBg ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } overflow-hidden`}>
        {overlayBg && (
          <img
            src={overlayBg}
            alt="Overlay background"
            className={`w-full h-full ${
              needsSpecialHandling(overlayBg) ? 'object-cover' : 'object-cover'
            }`}
            style={{
              objectPosition: getObjectPosition(overlayBg),
              minWidth: '100%',
              minHeight: '100%',
              width: 'auto',
              height: 'auto'
            }}
          />
        )}
      </div>
      
      {/* Dynamic Text Overlay */}
      {hoveredSector !== null && sectors[hoveredSector]?.hoverText && (
        <div className="absolute z-30 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full px-4">
          <p className="text-white text-3xl md:text-5xl font-bold tracking-wide drop-shadow-[0_0_10px_rgba(0,0,0,0.55)]">
            {sectors[hoveredSector]?.hoverText}
          </p>
        </div>
      )}

      {/* Hover zones with optimized mobile text */}
      <div className="absolute inset-0 z-40 pointer-events-none flex flex-row w-full h-full">
        {sectors.map((sector, index) => (
          <div
            key={index}
            className="flex-1 h-full cursor-pointer relative group"
            style={{ pointerEvents: 'auto' }}
            onMouseEnter={() => setHoveredSector(index)}
            onMouseLeave={() => setHoveredSector(null)}
            onClick={() => setHoveredSector(index)}
            onTouchStart={() => setHoveredSector(index)}
          >
            {/* Optimized vertical label for mobile */}
            <div className={`absolute ${isMobile ? 'top-1' : 'top-2 md:top-6'} left-1/2 -translate-x-1/2 w-full flex flex-col items-center px-0.5`}>
              <span
                className="block max-w-[95%] break-words text-center leading-tight px-0.5 py-0.5 transition-all duration-300 bg-black/30 rounded backdrop-blur-[1px] font-medium md:font-semibold md:text-[clamp(12px,2vw,18px)] md:drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] text-[10px]"
                style={{
                  fontSize: isMobile ? '10px' : '',
                  color: 'white',
                  transform: hoveredSector === index ? (isMobile ? '' : 'scale(1.05)') : '',
                  textShadow: '0 1px 3px rgba(0,0,0,0.5)'
                }}
              >
                {isMobile ? sector.shortName : sector.name}
              </span>
            </div>
            
            {index < sectors.length - 1 && (
              <span className="absolute top-0 right-0 w-px h-full bg-white opacity-40 z-50" aria-hidden="true"></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FujiSilvertechLanding;