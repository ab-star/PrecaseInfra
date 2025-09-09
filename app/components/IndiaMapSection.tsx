"use client";
import React, { useRef, useEffect, useState } from "react";

const IndiaMapSection = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState<number | null>(null);
  const imgRatioRef = useRef<number | null>(null); // width / height
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  useEffect(() => {
    // Check screen size
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('gsap').then(gsapModule => {
        const gsap = gsapModule.gsap;
        if (textRef.current) {
          gsap.fromTo(
            textRef.current,
            { opacity: 0, y: 120, scale: 0.7, z: -200, filter: 'blur(18px)' },
            { opacity: 1, y: 0, scale: 1.08, z: 0, filter: 'blur(0px)', duration: 1.1, ease: 'back.out(1.7)', delay: 0.2,
              onComplete: () => {
                gsap.to(textRef.current, { scale: 1, duration: 0.25, ease: 'power2.out' });
              }
            }
          );
        }
      });
    }
  }, []);

  // Ensure full image is visible at 100% viewport width without cutoff
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const img = new Image();
    img.src = '/Home/IndiaMap.jpg';
    const updateHeight = () => {
      if (!imgRatioRef.current) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const imgDisplayHeight = vw / imgRatioRef.current;
      
      // Use contain instead of cover to ensure full image is visible
      const useContain = vw / imgRatioRef.current > vh * 0.7;
      
      if (useContain) {
        // For contain: set height based on image aspect ratio
        setSectionHeight(Math.ceil(imgDisplayHeight));
      } else {
        // For cover: use viewport height with padding
        const paddingV = isMobile ? 0.12 * vw : 0.08 * vw;
        const h = Math.max(Math.ceil(imgDisplayHeight - paddingV), 0);
        setSectionHeight(h);
      }
    };
    
    const onLoad = () => {
      if (img.naturalWidth && img.naturalHeight) {
        imgRatioRef.current = img.naturalWidth / img.naturalHeight;
        updateHeight();
      }
    };
    
    if (img.complete) {
      onLoad();
    } else {
      img.onload = onLoad;
    }
    
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [isMobile]);

  return (
    <section
      style={{
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        marginRight: 'calc(50% - 50vw)',
        height: sectionHeight ?? 'auto',
        minHeight: isMobile ? '50vh' : isTablet ? '60vh' : '70vh',
        background: `url('/Home/IndiaMap.jpg') center/contain no-repeat`,
        backgroundColor: '#f0f4f8',
        paddingTop: isMobile ? '6vw' : '4vw',
        paddingBottom: isMobile ? '6vw' : '4vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isMobile ? 'center' : 'flex-start',
        position: 'relative',
        boxShadow: '0 8px 32px 0 rgba(136, 136, 136, 0.4)',
        borderRadius: 0,
        overflow: 'hidden'
      }}
    >
      {/* Overlay for better text readability - only on the left side */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: '60%',
          bottom: 0,
          background: 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
          zIndex: 1
        }}
      />
      
      <div
        ref={textRef}
        style={{
          padding: isMobile ? '24px 20px' : '48px 36px 40px 36px',
          marginLeft: isMobile ? '0' : '5vw',
          maxWidth: isMobile ? '90%' : '480px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isMobile ? 'center' : 'flex-start',
          textAlign: isMobile ? 'center' : 'left',
          borderRadius: '12px',
          backgroundColor: isMobile ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 2,
          position: 'relative',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <h2 style={{ 
          color: '#fff', 
          fontWeight: 800, 
          fontSize: isMobile ? '1.8rem' : isTablet ? '2.1rem' : '2.4rem', 
          marginBottom: isMobile ? 12 : 18, 
          letterSpacing: 1,
          lineHeight: 1.2,
          textShadow: '2px 2px 6px rgba(0,0,0,0.7)'
        }}>
          Our Presence Spans the Heart of India
        </h2>
        <p style={{ 
          color: '#fff', 
          fontWeight: 500, 
          fontSize: isMobile ? '1rem' : '1.18rem', 
          marginBottom: 12, 
          lineHeight: 1.6,
          textShadow: '1px 1px 3px rgba(0,0,0,0.5)'
        }}>
          Serving infrastructure projects across the nation with quality and precision
        </p>
        
        {/* Additional visual element */}
        <div style={{
          height: '4px',
          width: isMobile ? '80px' : '100px',
          background: 'linear-gradient(90deg, #ff6b35, #f7931e)',
          marginTop: isMobile ? '8px' : '12px',
          borderRadius: '2px'
        }} />
      </div>
    </section>
  );
};

export default IndiaMapSection;