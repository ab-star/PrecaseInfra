"use client";
import React from "react";

const PrecastInfoAnimated = () => (
  <div
    style={{
      position: "absolute",
      top: 40,
      right: 40,
      maxWidth: 420,
      background: "url('/cement.jpg') center/cover, #f3f4f6",
      borderRadius: 18,
      boxShadow: "0 8px 32px 0 #8888, 0 0 0 2px #fff8 inset",
      padding: "2.5rem 2.5rem 2.5rem 3rem",
      zIndex: 100,
      animation: "slideInRight 1.2s cubic-bezier(.77,0,.18,1)"
    }}
  >
    <h2 style={{fontWeight:700, fontSize:'1.35rem', marginBottom:18, color:'#1a237e', letterSpacing:0.2}}>Precast Concrete Solutions</h2>
    <p style={{fontSize:'1.12rem', color:'#222', lineHeight:1.7, marginBottom:0}}>
      Empowering Infrastructure with Precast Solutions: Our advanced precast concrete technology ensures faster construction, superior quality, and long-lasting durability for projects across India. Experience innovation, efficiency, and reliability with every build.
    </p>
    <style>{`
      @keyframes slideInRight {
        0% { opacity: 0; transform: translateX(80px); }
        100% { opacity: 1; transform: translateX(0); }
      }
    `}</style>
  </div>
);

export default PrecastInfoAnimated;
