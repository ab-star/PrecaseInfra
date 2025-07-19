
"use client";
import React from "react";
import { motion } from "framer-motion";

const sectors = [
  {
    name: "Water & Sewage",
    icon: (
      <svg width="48" height="48" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 48 48"><path d="M8 12h8m-8 8h8m-8 8h8m8-16v24m8-24v24m8-24v24"/><path d="M8 36c2 2 6 2 8 0s6-2 8 0 6 2 8 0 6-2 8 0"/></svg>
    ),
    href: "/sectors/water-sewage"
  },
  {
    name: "Roads & Bridges",
    icon: (
      <svg width="48" height="48" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 48 48"><path d="M8 40c0-16 32-16 32 0"/><path d="M24 8v32"/><path d="M16 24h16"/></svg>
    ),
    href: "/sectors/roads-bridges"
  },
  {
    name: "Railways",
    icon: (
      <svg width="48" height="48" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 48 48"><rect x="8" y="16" width="32" height="16" rx="4"/><path d="M8 32l8 8m24-8l-8 8"/></svg>
    ),
    href: "/sectors/railways"
  },
  {
    name: "Industrial",
    icon: (
      <svg width="48" height="48" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 48 48"><rect x="8" y="24" width="8" height="16"/><rect x="20" y="16" width="8" height="24"/><rect x="32" y="8" width="8" height="32"/></svg>
    ),
    href: "/sectors/industrial"
  },
  {
    name: "Cable & Power",
    icon: (
      <svg width="48" height="48" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 48 48"><path d="M24 8v32"/><path d="M8 40h32"/><path d="M16 24h16"/><path d="M12 32h24"/></svg>
    ),
    href: "/sectors/cable-power"
  }
];

const SectorsShowcase = () => (
  <section
    className="w-full pt-[120px] pb-[120px] px-4 md:px-12 flex flex-col justify-center items-center min-h-[900px]"
    style={{ background: "url('/concrete4.jpg') center/cover, #181818" }}
  >
    <div className="max-w-6xl w-full mx-auto flex flex-col items-center p-8 md:p-14 text-center">
      <h2 className="text-3xl font-bold mb-10 text-gray-800">
        <span className="border-b-4 border-blue-600 pb-1 pr-2">Sectors Catered</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full justify-items-center">
        {sectors.map((sector, i) => {
          // Make 'Cable & Power' span all columns beside Industrial
          const isCablePower = sector.name === "Cable & Power";
          return (
            <motion.a
              key={sector.name}
              href={sector.href}
              className={`group relative flex flex-col items-center justify-center bg-blue-800/90 shadow-2xl hover:shadow-2xl transition-shadow duration-300 p-12 min-h-[220px] w-full max-w-[340px] focus:outline-none focus:ring-4 focus:ring-blue-400 border border-blue-900/10 text-center ${isCablePower ? 'sm:col-span-2 lg:col-span-2 max-w-full' : ''}`}
              tabIndex={0}
              initial={{ opacity: 0, scale: 0.7, y: 120, rotateX: 60 }}
              whileInView={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              whileHover={{ scale: 1.08, rotate: 2, boxShadow: "0 32px 64px -12px #0006" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.15, type: "spring", stiffness: 60 }}
              style={{ perspective: 1000, background: "url('/tiles.jpg') center/cover, #1e293b" }}
            >
              <div className="flex flex-col items-center gap-4 mb-6 w-full">
                <span className="bg-blue-700 rounded-full p-5 flex items-center justify-center shadow-lg">
                  {sector.icon}
                </span>
                <span className="text-white text-3xl font-extrabold tracking-wide drop-shadow-lg w-full">
                  {sector.name}
                </span>
              </div>
              <span className="absolute right-8 bottom-8 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300">
                <svg width="32" height="32" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </span>
            </motion.a>
          );
        })}
      </div>
    </div>
  </section>
);

export default SectorsShowcase;
