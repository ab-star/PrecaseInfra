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
        minHeight: 1400,
        height: '100vh',
        background: `url('/IndiaMapStatus.png') center/cover no-repeat`,
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
        <h2 style={{ color: '#1a2a3a', fontWeight: 800, fontSize: '2.4rem', marginBottom: 18, letterSpacing: 1 }}>
          Our Presence Spans the Heart of India
        </h2>
        <p style={{ color: '#3e5c76', fontWeight: 500, fontSize: '1.18rem', marginBottom: 12, lineHeight: 1.6 }}>
          From the peaks of the Himalayas to the coasts of Kanyakumari, <b>3gInfraTech</b> is powering progress in every region. Our projects connect cities, empower rural communities, and drive economic growth in every state.
        </p>
        <p style={{ color: '#1a7f4e', fontWeight: 600, fontSize: '1.13rem', marginBottom: 0, lineHeight: 1.6 }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0b3d91' }}>We are present in every corner of India—</span> building bridges, highways, metros, and smart infrastructure that unite the nation. Our commitment to quality and innovation ensures that no matter where you are, our impact is felt, seen, and celebrated.
        </p>
      </div>
    </section>
  );
};

export default IndiaMapSection;
