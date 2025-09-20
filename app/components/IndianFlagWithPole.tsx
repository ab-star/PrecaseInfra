"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

const IndianFlagWithPole = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check screen size on initial load
      const checkScreenSize = () => {
        const width = window.innerWidth;
        setIsMobile(width < 768);
        setIsTablet(width >= 768 && width < 1024);
      };
      
      checkScreenSize();
      
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
      
      // Add resize listener
      const handleResize = () => {
        const width = window.innerWidth;
        setIsMobile(width < 768);
        setIsTablet(width >= 768 && width < 1024);
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <div
      className="flex flex-col md:flex-row flex-wrap items-center justify-start relative overflow-hidden"
      style={{
        width: "100%",
        minHeight: "auto",
        isolation: 'isolate',
        padding: isMobile ? '1.5rem' : isTablet ? '2rem' : '3.5rem',
        marginRight: 'auto',
        boxShadow: "0 8px 32px 0 #8886, 0 0 0 4px #fff8 inset",
        borderRadius: 0,
        background: "url('/bgFlag.jpg') center/cover, #f3f4f6"
      }}
    >
      {/* Flag and pole group */}
      <div className="relative flex flex-col items-center" style={{ 
        height: 'auto', 
        zIndex: 2, 
        alignItems: isMobile ? 'center' : 'flex-start',
        flex: '1 1 640px', 
        maxWidth: '100%',
        marginBottom: isTablet ? '5rem' : '0'
      }}>
        <div style={{ 
          position: 'relative', 
          height: isMobile ? '400px' : isTablet ? '500px' : '600px', 
          width: isMobile ? '24px' : isTablet ? '28px' : '32px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          marginLeft: isMobile ? '0' : isTablet ? '4rem' : '6rem',
        }}>
          {/* Ball on top */}
          <div
            style={{
              width: isMobile ? '18px' : isTablet ? '20px' : '22px',
              height: isMobile ? '18px' : isTablet ? '20px' : '22px',
              background: "radial-gradient(circle at 60% 40%, #fffbe6 70%, #bfa76a 100%)",
              borderRadius: "50%",
              boxShadow: "0 2px 8px 0 #bfa76a99, 0 0 0 2px #bfa76a inset",
              position: "absolute",
              top: isMobile ? "3rem" : isTablet ? "3rem" : "3rem",
              left: '1%',
              transform: 'translateX(-50%)',
              zIndex: 60
            }}
          />
          {/* Flag attached to pole - Shifted further right on desktop */}
          <div
            style={{
              position: 'absolute',
              top: isMobile ? "2.5rem" : isTablet ? "2.5rem" : "2rem",
              left: isMobile ? '50%' : isTablet ? '40%' : '30%', 
              transform: isMobile ? 'translateX(-4px)' : 'translateX(0)',
              width: isMobile ? '120px' : isTablet ? '150px' : '180px',
              height: isMobile ? '133px' : isTablet ? '166px' : '200px',
              zIndex: 50,
              overflow: 'visible',
              marginLeft: isMobile ? 0 : 8
            }}
          >
            <Image
              src="https://fujisilvertech.com/wp-content/themes/fujisilvertech/assets/img/indian-flag.gif"
              alt="Indian Flag"
              width={isMobile ? 120 : isTablet ? 150 : 180}
              height={isMobile ? 133 : isTablet ? 166 : 200}
              style={{
                width: '100%',
                height: '100%',
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
              width: isMobile ? '8px' : isTablet ? '9px' : '10px',
              background: "linear-gradient(180deg, #e0e0e0 0%, #b0b0b0 100%)",
              borderRadius: 5,
              boxShadow: "0 0 8px 0 #8888, 0 0 0 1px #aaa inset",
              zIndex: -1,
              position: 'absolute',
              left: '1%',
              transform: 'translateX(-50%)',
              bottom: 0,
              top: isMobile ? "4rem" : isTablet ? "4rem" : "4rem",
              height: isMobile ? '22rem' : isTablet ? '28rem' : '35rem'
            }}
          />
        </div>
        {/* Platform for flag - Kept in original position */}
        <div style={{ 
          position: 'relative', 
          width: isMobile ? '90vw' : isTablet ? '70vw' : 'min(80vw, 600px)', 
          minWidth: isMobile ? '280px' : isTablet ? '300px' : '320px', 
          marginTop: isMobile ? '16px' : isTablet ? '20px' : '24px', 
          marginBottom: 0, 
          zIndex: 10, 
          display: 'flex', 
          alignItems: 'flex-end', 
          marginLeft: isMobile ? 0 : isTablet ? '1rem' : '2rem', 
          left: 0 
        }}>
          <div
            className="flex flex-col justify-center items-center"
            style={{
              flex: 1,
              minHeight: isMobile ? '120px' : isTablet ? '140px' : '160px',
              background: "url('/concrete_texture.jpg') center/cover no-repeat, #e0e0e0",
              borderRadius: 0,
              boxShadow: "0 4px 24px 0 #8886, 0 0 0 2px #fff8 inset",
              padding: isMobile ? '1rem' : isTablet ? '1.25rem' : '1.5rem 2.5rem',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: isMobile ? '120px' : isTablet ? '140px' : '160px'
            }}
          />
        </div>
      </div>
      {/* Text section - Fixed alignment */}
      <div
        ref={textRef}
        className="flex flex-col justify-center"
        style={{
          opacity: 0,
          transform: 'translateX(120px) scale(1.04)',
          filter: 'blur(16px)',
          marginLeft: isMobile ? 0 : isTablet ? '0' : '32px',
          flex: '1 1 420px',
          maxWidth: '100%',
          minWidth: isMobile ? '280px' : isTablet ? '300px' : '320px',
          alignSelf: 'center',
          paddingTop: isMobile ? '0' : isTablet ? '1rem' : '2rem',
          paddingBottom: isMobile ? '0' : isTablet ? '1rem' : '2rem',
          marginBottom: 0,
          marginTop: isMobile ? '-1rem' : isTablet ? '0' : '0',
          position: 'relative',
        }}
      >
        <h2 style={{ 
          color: '#1a2a3a', 
          fontWeight: 800, 
          fontSize: isMobile ? '1.8rem' : isTablet ? '2.1rem' : '2.5rem', 
          marginBottom: isMobile ? '12px' : isTablet ? '14px' : '16px', 
          letterSpacing: 1,
          lineHeight: 1.2
        }}>
          Igniting India&apos;s Infrastructure Renaissance
        </h2>
        <p style={{ 
          fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.18em', 
          color: "#fff", 
          width: '100%',
          lineHeight: 1.6,
          marginTop: 0
        }}>
Since 2007, 3G Infratech has been at the forefront of India’s precast revolution—transforming how the nation builds, connects, and grows. Headquartered in Surat, Gujarat, and certified under ISO 9001:2015, we have evolved from manufacturing essential products like Hume pipes, paver blocks, and boundary walls to becoming a trusted partner for comprehensive precast infrastructure solutions.
Our portfolio today includes stormwater drains, box culverts, retaining walls, and compound walls—each engineered with precision to meet international quality standards of strength, durability, and performance. With three advanced manufacturing facilities and a combined capacity of 700 metric tons per day, we deliver with unmatched scale, efficiency, and reliability.
<br />
<br />
        </p>
      </div>
    </div>
  );
};

export default IndianFlagWithPole;