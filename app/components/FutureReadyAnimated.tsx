"use client";
import React from "react";
import { motion } from "framer-motion";

const features = [
  "HIGH DURABILITY AND EXTREMELY LONG SERVICE LIFE",
  "HIGHLY EXPERIENCED TEAM WITH 50+ YEARS OF EXPERIENCE",
  "5X FASTER CONSTRUCTION TIMELINES",
  "FACTORY MADE, QUALITY ASSURED PRODUCTS",
  "HIGH PERFORMANCE CONCRETE FOR THE BEST QUALITY",
  "JAPANESE TECHNOLOGY MIXED WITH INDIAN CREATIVITY",
  "LESS CONSTRUCTION SPACE AND MANPOWER REQUIRED"
];

const tilePositions = [
  { x: 0, y: 0, z: 0, rotate: -2 },
  { x: 320, y: 0, z: 0, rotate: 3 },
  { x: 160, y: 80, z: 0, rotate: 1 },
  { x: 480, y: 80, z: 0, rotate: -2 },
  { x: 0, y: 180, z: 0, rotate: 2 },
  { x: 320, y: 180, z: 0, rotate: -3 },
  { x: 160, y: 260, z: 0, rotate: 1 }
];

const FutureReadyAnimated = () => (
  <motion.section className="w-full min-h-[700px] py-32 px-6 md:px-20 flex items-center justify-center" style={{ background: "url('/concrete3.webp'), url('/concrete3.jpg') center/cover, #222" }}
    initial={{ opacity: 0, y: 80 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
    viewport={{ once: true, amount: 0.2 }}
  >
    <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row gap-16 items-start bg-white/10 p-12 md:p-20">
      <div className="flex-1 text-green-900 pr-8">
        <h2 className="text-5xl font-extrabold mb-6 drop-shadow-lg" style={{marginBottom: "1rem"}}>We are Future Ready</h2>
        <p className="text-xl font-semibold leading-relaxed opacity-95 mt-16" style={{ color: '#111' }}>
          Our 100-year legacy and partnership with Fuji Japan give us access to advanced precast concrete technology, allowing us to complete projects faster, cost-effectively, and with less manpower and machinery needed on site. Our durable products are engineered with precision and manufactured by experts. We strive to exceed client expectations with high-quality precast concrete solutions continuously.
        </p>
      </div>
      <div className="flex-1 relative min-h-[520px] flex items-center justify-center" style={{ minWidth: 600 }}>
        {features.map((text, i) => (
          <motion.div
            key={text}
            initial={{ opacity: 0, scale: 1.5, z: 200, y: 100, rotate: 0 }}
            whileInView={{ opacity: 1, scale: 1, z: tilePositions[i].z, x: tilePositions[i].x, y: tilePositions[i].y, rotate: tilePositions[i].rotate }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: i * 0.18, type: "spring", stiffness: 60 }}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 400,
              minHeight: 100,
              background: "url('/concrete_texture.webp'), url('/concrete_texture.jpg') center/cover, #e0e0e0",
              boxShadow: "0 12px 36px 0 #0008",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem 2.5rem",
              fontWeight: 800,
              fontSize: "1.35rem",
              color: "#1a1a1a",
              textAlign: "center",
              zIndex: 10 - i,
              textShadow: "0 2px 8px #fff8"
            }}
          >
            {text}
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

export default FutureReadyAnimated;
