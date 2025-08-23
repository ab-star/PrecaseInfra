"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const clients = [
  { name: "Road & Buildings Department Gujarat", logo: "/file.svg" },
  { name: "National Highways Authority of India", logo: "/file.svg" },
  { name: "DMICDC", logo: "/file.svg" },
  { name: "NHSRCL", logo: "/file.svg" },
  { name: "Airports Authority of India", logo: "/file.svg" },
  { name: "Border Roads Organisation", logo: "/file.svg" },
  { name: "BARC", logo: "/file.svg" },
  { name: "Obayashi", logo: "/file.svg" },
  { name: "Nishimatsu Construction", logo: "/file.svg" },
  { name: "Nippo", logo: "/file.svg" },
  { name: "JICA", logo: "/file.svg" },
  { name: "Tokyo Metro", logo: "/file.svg" },
  { name: "Dedicated Freight Corridor", logo: "/file.svg" },
  { name: "CocaCola", logo: "/file.svg" },
  { name: "Nestle", logo: "/file.svg" },
  { name: "Honda", logo: "/file.svg" },
  { name: "Colgate-Palmolive", logo: "/file.svg" },
  { name: "Reliance Industries Limited", logo: "/file.svg" },
  { name: "IndianOil", logo: "/file.svg" },
  { name: "Tata Projects", logo: "/file.svg" },
  { name: "Larsen & Toubro", logo: "/file.svg" },
  // Add more as needed
];

const tileVariants = {
  offscreen: { opacity: 0, y: 60, scale: 0.8, rotate: -8, filter: "blur(4px)" },
  onscreen: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      bounce: 0.45,
      stiffness: 60,
    },
  },
  hover: {
    scale: 1.12,
    rotate: 2,
    boxShadow: "0 8px 32px 0 rgba(0,0,0,0.22), 0 0 0 4px #60a5fa88",
    borderColor: "#60a5fa",
    zIndex: 20,
    filter: "drop-shadow(0 0 16px #60a5fa88)",
    transition: { type: "spring" as const, stiffness: 320 },
  },
};

const ClientsAcquiredSection = () => {
  return (
    <section
      className="w-full pt-[120px] pb-[48px] px-6 md:px-24 lg:px-40 flex flex-col items-center relative overflow-x-clip"
      style={{ minHeight: "700px", background: "none", padding: '64px 48px 32px 48px' }}
    >
  {/* Background image to avoid local video dependency */}
  <div className="absolute inset-0 w-full h-full object-cover z-0 bg-cover bg-center" style={{ backgroundImage: 'url(/HomeTransition/MainBackground.webp)' }} />
      {/* Parallax floating shapes for depth */}
      <motion.div
        className="hidden md:block absolute -top-10 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl z-0"
        animate={{ y: [0, 30, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
      <motion.div
        className="hidden md:block absolute top-1/2 right-10 w-24 h-24 bg-blue-200/30 rounded-full blur-2xl z-0"
        animate={{ y: [0, -20, 0], x: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 md:gap-8 relative z-10">
        {clients.map((client, idx) => {
          // Make the last client tile span across remaining columns beside the previous tile
          const isLast = idx === clients.length - 1;
          return (
            <motion.div
              key={client.name}
              className={`relative flex flex-col items-center justify-center bg-white rounded-none shadow-xl border-2 border-white/10 p-4 md:p-6 min-h-[100px] md:min-h-[120px] min-w-[100px] md:min-w-[120px] group overflow-hidden will-change-transform ${isLast ? 'sm:col-span-2 md:col-span-2 lg:col-span-3 max-w-full' : ''}`}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              variants={tileVariants}
              transition={{ delay: idx * 0.04, duration: 0.9 }}
              style={{ perspective: 800 }}
              whileHover={{
                scale: 1.12,
                rotate: 2,
                boxShadow: "0 8px 32px 0 rgba(0,0,0,0.22), 0 0 0 4px #60a5fa88",
                borderColor: "#60a5fa",
                zIndex: 20,
                filter: "drop-shadow(0 0 16px #60a5fa88)",
                rotateY: 8,
                rotateX: -6,
                transition: { type: "spring", stiffness: 320 },
              }}
            >
              <motion.div
                className="absolute inset-0 bg-white/70 group-hover:bg-white/90 transition-all duration-300 z-0"
                initial={{ opacity: 0.7 }}
                whileHover={{ opacity: 0.95 }}
              />
              <div className="relative z-10 flex flex-col items-center">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={80}
                  height={60}
                  className="object-contain mb-2 grayscale group-hover:grayscale-0 transition-all duration-300"
                  draggable={false}
                />
                <span className="text-xs md:text-sm font-semibold text-gray-800 text-center leading-tight drop-shadow-sm">
                  {client.name}
                </span>
              </div>
              <motion.div
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-tr from-blue-400 to-blue-700 rounded-full blur-xl opacity-60 group-hover:opacity-90 z-0"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1.2 }}
              />
            </motion.div>
          );
        })}
      </div>
      {/* Optional: Carousel or Masonry grid for many logos (not implemented here, but grid is responsive) */}
    </section>
  );
};

export default ClientsAcquiredSection;
