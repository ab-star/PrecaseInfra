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
  minHeight: 560,
  height: 'auto',
  background: `url('/Home/IndiaMap.jpg') center/cover no-repeat`,
  paddingTop: '3vw',
  paddingBottom: '3vw',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        margin: 0,
        boxShadow: '0 8px 32px 0 #8886',
        borderRadius: 0,
        overflow: 'hidden',
        paddingTop: '25rem',
        paddingBottom: "30rem"
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
