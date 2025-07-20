"use client";
import React, { useRef, useEffect } from "react";

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
      className="flex flex-row items-end justify-start relative overflow-visible"
      style={{
        width: "100%",
        minHeight: 480,
        isolation: 'isolate',
        alignItems: 'flex-end',
        paddingLeft: '3.5rem',
        paddingTop: '6.5rem',
        paddingBottom: '12.5rem',
        marginRight: 'auto',
        boxShadow: "0 8px 32px 0 #8886, 0 0 0 4px #fff8 inset",
        borderRadius: 18,
        background: "url('/lightGreenGranite.jpg') center/cover, #f3f4f6"
      }}
    >
      {/* Flag and pole group */}
      <div className="relative flex flex-col items-center" style={{ height: 400, zIndex: 2, alignItems: 'flex-start', marginBottom: '-32px' }}>
        <div style={{ position: 'relative', height: 400, width: 32, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Ball on top */}
          <div
            style={{
              width: 22,
              height: 22,
              background: "radial-gradient(circle at 60% 40%, #fffbe6 70%, #bfa76a 100%)",
              borderRadius: "50%",
              boxShadow: "0 2px 8px 0 #bfa76a99, 0 0 0 2px #bfa76a inset",
              position: "absolute",
              top: "-9rem",
              left: '350%',
              transform: 'translateX(-50%)',
              zIndex: 60
            }}
          />
          {/* Flag attached to pole */}
          <div
            style={{
              position: 'absolute',
              top: "-10rem",
              left: '7rem',
              transform: 'translateX(0)',
              width: 180,
              height: 200,
              zIndex: 50,
              overflow: 'visible',
              marginLeft: 8
            }}
          >
            <img
              src="https://fujisilvertech.com/wp-content/themes/fujisilvertech/assets/img/indian-flag.gif"
              alt="Indian Flag"
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                boxShadow: "0 2px 8px 0 #0002",
                display: 'block'
              }}
              draggable={false}
            />
          </div>
          {/* Steel pole, bottom flush with platform */}
          <div
            style={{
              width: 10,
              height: '484px',
              background: "linear-gradient(180deg, #e0e0e0 0%, #b0b0b0 100%)",
              borderRadius: 5,
              boxShadow: "0 0 8px 0 #8888, 0 0 0 1px #aaa inset",
              zIndex: -1,
              position: 'absolute',
              left: '350%',
              transform: 'translateX(-50%)',
              bottom: 0,
              top: "-9rem"
            }}
          />
        </div>
        {/* Platform for flag - wide, concrete, with a right-side stem, no text */}
        <div style={{ position: 'relative', width: 'min(100vw, 1200px)', minWidth: 600, marginTop: 24, marginBottom: 8, zIndex: 10, display: 'flex', alignItems: 'flex-end', marginLeft: 0, left: 0 , top: "6rem" }}>
          {/* Main platform */}
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
          {/* Step platform on the right */}
          <div
            style={{
              width: 480,
              height: 54,
              background: "url('/concrete_texture.jpg') center/cover no-repeat, #b0b0b0",
              borderRadius: 0,
              marginLeft: 0,
              marginBottom: 0,
              alignSelf: 'flex-end',
              boxShadow: "0 4px 12px 0 #8886, 0 0 0 1px #fff8 inset",
              zIndex: 11,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          />
        </div>
      </div>
      {/* Animated text to the right of the flag, no background */}
      <div
        ref={textRef}
        style={{
          opacity: 0,
          transform: 'translateX(120px) scale(1.04)',
          filter: 'blur(16px)',
          marginLeft: 48,
          marginRight: 0,
          maxWidth: 520,
          minWidth: 320,
          transition: 'box-shadow 0.3s',
          alignSelf: 'flex-end',
          marginBottom: 32
        }}
      >
        <h2 style={{ color: '#1a2a3a', fontWeight: 800, fontSize: '2.5rem', marginBottom: 16, letterSpacing: 1 }}>
          Igniting India&apos;s Infrastructure Renaissance
        </h2>
        <h4 style={{ color: '#3e5c76', fontWeight: 600, marginBottom: 18 }}>
          Proudly Building the Nation&apos;s Future
        </h4>
        <p style={{ fontSize: '1.18em', color: '#22334a', maxWidth: 480 }}>
          At <b>3gInfraTech</b>, we are not just constructing structures—we are shaping the dreams of a billion people. Our cutting-edge precast solutions, visionary engineering, and relentless pursuit of excellence are powering India&apos;s leap into a new era of smart cities, sustainable highways, and world-class infrastructure. <br /><br />
          <span style={{ color: '#1a7f4e', fontWeight: 700 }}>Join us as we build a legacy of progress, innovation, and national pride.</span>
        </p>
      </div>
    </div>
  );
};

export default IndianFlagWithPole;

