"use client";
import React, { useRef, useEffect } from "react";

const IndiaMapSection = () => {
  const textRef = useRef<HTMLDivElement>(null);
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

  return (
    <section
      style={{
        width: '100%',
        minHeight: 1100,
        height: '100vh',
  background: `url('/Home/IndiaMap.jpg') center/cover no-repeat`,
        paddingTop: '6vw',
        paddingBottom: '6vw',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        margin: 0,
        padding: 0,
        boxShadow: '0 8px 32px 0 #8886',
        borderRadius: 0,
        overflow: 'hidden',
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
          From the peaks of the Himalayas to the coasts of Kanyakumari, <b>3gInfraTech</b> is powering progress in every region. Our projects connect cities, empower rural communities, and drive economic growth in every state.<br /><br />
          Whether it’s the bustling metros of Mumbai and Delhi, the vibrant tech corridors of Bengaluru and Hyderabad, or the heartlands of Uttar Pradesh and Bihar, our footprint is everywhere. We bring world-class infrastructure to remote villages, modernize transport in growing towns, and support sustainable development in every corner of the country.<br /><br />
        </p>
      </div>
      {/* Gujarat/Surat location pointer - adjust left/top as needed */}
      {/* Animated SVG pointer for Surat/Gujarat */}
      <div
        style={{
          position: 'absolute',
         left: '45%', // Surat
         top: '60%',
          transform: 'translate(-50%, -100%)',
          zIndex: 10,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
          <g>
            <circle cx="48" cy="39" r="24" fill="#e11d48" fillOpacity="0.85">
              <animate attributeName="r" values="24;32;24" dur="1.2s" repeatCount="indefinite" />
              <animate attributeName="fill-opacity" values="0.85;0.5;0.85" dur="1.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="48" cy="39" r="12" fill="#fff" />
            <circle cx="48" cy="39" r="8" fill="#e11d48" />
            <path d="M48 66 L36 90 Q48 81 60 90 Z" fill="#e11d48" stroke="#fff" strokeWidth="2" filter="url(#shadow)" />
            <animateTransform attributeName="transform" type="translate" values="0 0; 0 -3; 0 0" dur="1.2s" repeatCount="indefinite" />
          </g>
          <defs>
            <filter id="shadow" x="0" y="0" width="44" height="44" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.25" />
            </filter>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default IndiaMapSection;
