"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";

const IndianFlagWithPole = () => {
  const textRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('gsap').then(gsapModule => {
        const gsap = gsapModule.gsap;
        if (textRef.current) {
          gsap.fromTo(
            textRef.current,
            { opacity: 0, x: 120, filter: 'blur(16px)' },
            { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power4.out', delay: 0.3 }
          );
        }
      });
    }
  }, []);

  return (
  <div
    className="flex flex-row flex-wrap items-center justify-start relative overflow-hidden" // wrap and clip to avoid overflow
      style={{
        width: "100%",
  minHeight: "auto",
        isolation: 'isolate',
        paddingLeft: '3.5rem',
        paddingRight: '3.5rem',
  paddingBottom: '2.5rem',
        marginRight: 'auto',
        boxShadow: "0 8px 32px 0 #8886, 0 0 0 4px #fff8 inset",
  borderRadius: 0,
        background: "url('/bgFlag.jpg') center/cover, #f3f4f6"
      }}
    >
      {/* Flag and pole group */}
    <div className="relative flex flex-col items-center" style={{ height: 'auto', zIndex: 2, alignItems: 'flex-start', flex: '1 1 640px', maxWidth: '100%' }}>
        <div style={{ position: 'relative', height: 600, width: 32, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Ball on top */}
          <div
            style={{
              width: 22,
              height: 22,
              background: "radial-gradient(circle at 60% 40%, #fffbe6 70%, #bfa76a 100%)",
              borderRadius: "50%",
              boxShadow: "0 2px 8px 0 #bfa76a99, 0 0 0 2px #bfa76a inset",
              position: "absolute",
              top: "3rem",
              left: '350%',
              transform: 'translateX(-50%)',
              zIndex: 60
            }}
          />
          {/* Flag attached to pole */}
          <div
            style={{
              position: 'absolute',
              top: "2rem",
              left: '7rem',
              transform: 'translateX(0)',
              width: 180,
              height: 200,
              zIndex: 50,
              overflow: 'visible',
              marginLeft: 8
            }}
          >
            <Image
              src="https://fujisilvertech.com/wp-content/themes/fujisilvertech/assets/img/indian-flag.gif"
              alt="Indian Flag"
              width={180}
              height={200}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                boxShadow: "0 2px 8px 0 #0002",
                display: 'block'
              }}
              draggable={false}
              priority
            />
          </div>
          {/* Steel pole, bottom flush with platform */}
          <div
            style={{
              width: 10,
              background: "linear-gradient(180deg, #e0e0e0 0%, #b0b0b0 100%)",
              borderRadius: 5,
              boxShadow: "0 0 8px 0 #8888, 0 0 0 1px #aaa inset",
              zIndex: -1,
              position: 'absolute',
              left: '350%',
              transform: 'translateX(-50%)',
              bottom: 0,
              top: "4rem",
              height: '35rem'
            }}
          />
        </div>
        {/* Platform for flag */}
  <div style={{ position: 'relative', width: 'min(80vw, 600px)', minWidth: 320, marginTop: 24, marginBottom: 0, zIndex: 10, display: 'flex', alignItems: 'flex-end', marginLeft: 0, left: 0 }}>
          <div
            className="flex flex-col justify-center items-center"
            style={{
              flex: 1,
              minHeight: 160,
              background: "url('/concrete_texture.jpg') center/cover no-repeat, #e0e0e0",
              borderRadius: 0,
              boxShadow: "0 4px 24px 0 #8886, 0 0 0 2px #fff8 inset",
              padding: '1.5rem 2.5rem',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 160
            }}
          />
        </div>
      </div>
      {/* Text section - now properly aligned */}
    <div
        ref={textRef}
        style={{
          opacity: 0,
          transform: 'translateX(120px) scale(1.04)',
          filter: 'blur(16px)',
      marginLeft: 32,
      flex: '1 1 420px',
      maxWidth: '100%',
          minWidth: 320,
          alignSelf: 'center', // Changed to center alignment
          paddingTop: 0, // Removed excessive padding
          marginBottom: 0, // Removed bottom margin
          marginTop: 0, // Removed top margin
          position: 'relative',
          top: '-2rem' // Fine-tune vertical position
        }}
      >
        <h2 style={{ color: '#1a2a3a', fontWeight: 800, fontSize: '2.5rem', marginBottom: 16, letterSpacing: 1 }}>
          Igniting India&apos;s Infrastructure Renaissance
        </h2>
        <p style={{ fontSize: '1.18em', color: '#fff', width: '100%' }}>
          At <b>3gInfraTech</b>, we are not just constructing structures—we are shaping the dreams of a billion people. Our cutting-edge precast solutions, visionary engineering, and relentless pursuit of excellence are powering India&apos;s leap into a new era of smart cities, sustainable highways, and world-class infrastructure.<br /><br />
          With every project, we strive to set new benchmarks in quality, safety, and sustainability. Our team is dedicated to delivering innovative solutions that not only meet today&apos;s needs but also anticipate tomorrow&apos;s challenges. From iconic bridges to vital water systems, we are committed to building a stronger, more resilient nation—one that stands tall for generations to come.
        </p>
      </div>
    </div>
  );
};

export default IndianFlagWithPole;