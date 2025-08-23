"use client";
import React, { useRef, useEffect, useState } from "react";

const IndiaMapSection = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState<number | null>(null);
  const imgRatioRef = useRef<number | null>(null); // width / height
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

  // Ensure full image is visible at 100% viewport width without bottom cutoff
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const img = new Image();
    img.src = '/Home/IndiaMap.jpg';
    const updateHeight = () => {
      if (!imgRatioRef.current) return;
      const vw = window.innerWidth;
      const paddingV = 0.08 * vw; // 4vw top + 4vw bottom
      const imgDisplayHeight = vw / imgRatioRef.current; // height of the background image at 100% width
      // Set content height so that total section height (content + padding) equals the image height
  const h = Math.max(Math.ceil(imgDisplayHeight - paddingV), 0);
      setSectionHeight(h);
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
  }, []);

  return (
    <section
    style={{
    width: '100vw',
    marginLeft: 'calc(50% - 50vw)',
    marginRight: 'calc(50% - 50vw)',
  height: sectionHeight ?? 'auto',
  background: `url('/Home/IndiaMap.jpg') center top / 100% auto no-repeat`,
  backgroundColor: 'transparent',
  paddingTop: '4vw',
  paddingBottom: '4vw',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        boxShadow: '0 8px 32px 0 #8886',
        borderRadius: 0,
  overflow: 'hidden'
      }}
    >
      <div
        ref={textRef}
        style={{
          padding: '48px 36px 40px 36px',
          marginLeft: '5vw',
          maxWidth: 480,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          borderRadius: 0,
        }}
      >
        <h2 style={{ color: '#fff', fontWeight: 800, fontSize: '2.4rem', marginBottom: 18, letterSpacing: 1 }}>
          Our Presence Spans the Heart of India
        </h2>
  <p style={{ color: '#000', fontWeight: 500, fontSize: '1.18rem', marginBottom: 12, lineHeight: 1.6 }}>
        </p>
      </div>
    </section>
  );
};

export default IndiaMapSection;
