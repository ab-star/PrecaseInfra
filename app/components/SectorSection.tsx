"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FaWater, FaBolt, FaTrain, FaIndustry, FaRoad, FaHardHat } from 'react-icons/fa';

const ConstructionSectorNavigation = () => {
  const router = useRouter();
  const [activeSector] = useState<number | null>(null);

  const sectors = [
    {
      id: 1,
      name: "Water Systems",
      icon: <FaWater />,
      color: "bg-blue-600",
      size: "md", // sm, md, lg
      position: "left",
      route: "/sectors/water"
    },
    {
      id: 2,
      name: "Power Infrastructure",
      icon: <FaBolt />,
      color: "bg-amber-500",
      size: "lg",
      position: "center",
      route: "/sectors/power"
    },
    {
      id: 3,
      name: "Rail Networks",
      icon: <FaTrain />,
      color: "bg-gray-600",
      size: "md",
      position: "right",
      route: "/sectors/railways"
    },
    {
      id: 4,
      name: "Industrial",
      icon: <FaIndustry />,
      color: "bg-red-600",
      size: "sm",
      position: "bottom-left",
      route: "/sectors/industrial"
    },
    {
      id: 5,
      name: "Roads & Bridges",
      icon: <FaRoad />,
      color: "bg-green-600",
      size: "sm",
      position: "bottom-right",
      route: "/sectors/roads"
    }
  ];

  // size classes not used in current layout; kept for future reference

  const handleSectorClick = (route: string) => {
    router.push(route);
  };

  return (
    <section className="relative py-40 px-4 md:px-16 overflow-hidden" style={{ background: "url('/cement.jpg') center/cover, #e0e0e0" }}>
      {/* Construction-themed background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-4 border-yellow-500"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 border-4 border-yellow-500"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gray-300 rotate-45"></div>
      </div>

      <div className="container mx-auto px-4 md:px-10 relative z-10">
        <div className="text-center mb-16 p-4 md:p-8 bg-white/80 rounded-xl shadow-lg inline-block">
          <div className="inline-flex items-center justify-center bg-yellow-500 text-yellow-900 px-4 py-2 rounded-full mb-4">
            <FaHardHat className="mr-2" />
            <span className="font-bold">OUR SECTORS</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Building India&apos;s Future</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our specialized construction solutions
          </p>
        </div>

        {/* Flexbox navigation: 3 tiles in first row, 2 in second, all centered, no gaps */}
        <div className="flex flex-col items-center w-full gap-8">
          {/* First row: 3 tiles, stuck together */}
          <div className="flex flex-row justify-center items-center w-auto mx-auto gap-8">
            {sectors.slice(0, 3).map((sector) => (
              <motion.div
                key={sector.id}
                className={`${sector.color} h-48 flex flex-col items-center justify-center text-white cursor-pointer relative overflow-hidden transition-all first:rounded-l-xl last:rounded-r-xl shadow-xl p-6`}
                style={{ minWidth: 120, width: sector.size === 'lg' ? 260 : sector.size === 'md' ? 180 : 120 }}
                onClick={() => handleSectorClick(sector.route)}
                whileHover={{ 
                  scale: 1.05,
                  zIndex: 10,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-20"></div>
                <motion.div
                  animate={{ 
                    scale: activeSector === sector.id ? 1.2 : 1,
                    rotate: activeSector === sector.id ? 5 : 0
                  }}
                  className="text-4xl mb-4"
                >
                  {sector.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-center px-4">{sector.name}</h3>
                <motion.div 
                  className="absolute inset-0 border-4 border-white/30 rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeSector === sector.id ? 1 : 0 }}
                />
                <div className="absolute top-2 right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-yellow-800 font-bold">
                  +
                </div>
              </motion.div>
            ))}
          </div>
          {/* Second row: 2 tiles, stuck together and centered */}
          <div className="flex flex-row justify-center items-center w-auto mx-auto gap-8 mt-2">
            {sectors.slice(3).map((sector) => (
              <motion.div
                key={sector.id}
                className={`${sector.color} h-48 flex flex-col items-center justify-center text-white cursor-pointer relative overflow-hidden transition-all first:rounded-l-xl last:rounded-r-xl shadow-xl p-6`}
                style={{ minWidth: 120, width: sector.size === 'lg' ? 260 : sector.size === 'md' ? 180 : 120 }}
                onClick={() => handleSectorClick(sector.route)}
                whileHover={{ 
                  scale: 1.05,
                  zIndex: 10,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-20"></div>
                <motion.div
                  animate={{ 
                    scale: activeSector === sector.id ? 1.2 : 1,
                    rotate: activeSector === sector.id ? 5 : 0
                  }}
                  className="text-4xl mb-4"
                >
                  {sector.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-center px-4">{sector.name}</h3>
                <motion.div 
                  className="absolute inset-0 border-4 border-white/30 rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeSector === sector.id ? 1 : 0 }}
                />
                <div className="absolute top-2 right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-yellow-800 font-bold">
                  +
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Blueprint-style border */}
      <div className="absolute inset-0 border-8 border-transparent border-dashed pointer-events-none">
        <div className="absolute inset-0 border border-yellow-500/20 m-1"></div>
      </div>
    </section>
  );
};

export default ConstructionSectorNavigation;