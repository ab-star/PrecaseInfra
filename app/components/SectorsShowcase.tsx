
"use client";
import React from "react";
import { FaWater, FaRoad, FaTrain, FaIndustry, FaBolt } from "react-icons/fa";
import { motion } from "framer-motion";

const sectors = [
  {
    name: "Water & Sewage",
    icon: <FaWater size={48} color="#222" />,
    href: "/sectors/water-sewage"
  },
  {
    name: "Roads & Bridges",
    icon: <FaRoad size={48} color="#222" />,
    href: "/sectors/roads-bridges"
  },
  {
    name: "Railways",
    icon: <FaTrain size={48} color="#222" />,
    href: "/sectors/railways"
  },
  {
    name: "Industrial",
    icon: <FaIndustry size={48} color="#222" />,
    href: "/sectors/industrial"
  },
  {
    name: "Cable & Power",
    icon: <FaBolt size={48} color="#222" />,
    href: "/sectors/cable-power"
  }
];

const SectorsShowcase = () => (
  <section
    className="w-full pt-[36px] pb-[20px] px-2 sm:px-8 md:px-16 xl:px-32 flex flex-col justify-start items-center min-h-[700px]"
  style={{ background: "url('/concrete4.webp') center/cover, #181818" }}
  >
    <h2 className="text-4xl font-bold mb-16 text-gray-800 text-center w-full" style={{paddingTop: "4rem" , paddingBottom: "4rem"}}>
      <span className="border-b-4 border-blue-600 pb-1 pr-2">Sectors Catered</span>
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full" style={{paddingLeft: "3rem", paddingRight: "3rem"}}>
      {sectors.map((sector, i) => {
        // Make 'Cable & Power' span all columns beside Industrial
        const isCablePower = sector.name === "Cable & Power";
        return (
          <motion.a
            key={sector.name}
            href={sector.href}
            className={`group relative flex flex-col items-center justify-center bg-blue-800/90 shadow-2xl hover:shadow-2xl transition-shadow duration-300 p-10 min-h-[220px] w-full focus:outline-none focus:ring-4 focus:ring-blue-400 border border-blue-900/10 text-center ${isCablePower ? 'sm:col-span-2 lg:col-span-2' : ''}`}
            tabIndex={0}
            initial={{ opacity: 0, scale: 0.7, y: 120, rotateX: 60 }}
            whileInView={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            whileHover={{ scale: 1.08, rotate: 2, boxShadow: "0 32px 64px -12px #0006" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: i * 0.15, type: "spring", stiffness: 60 }}
            style={{ perspective: 1000, background: "url('/tiles.webp') center/cover, #1e293b" }}
          >
            <div className="flex flex-col items-center gap-4 mb-6 w-full">
              <span className="flex items-center justify-center">
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
  </section>
);

export default SectorsShowcase;
