// components/RiverAnimation.jsx
import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const RiverAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* River base */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-b from-blue-600 to-blue-800" />
      
      {/* River flow animation */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1/3 opacity-70"
        initial={{ backgroundPosition: '0% 0%' }}
        animate={{ backgroundPosition: '100% 0%' }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: 'linear' 
        }}
        style={{
          backgroundImage: `linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 100%
          )`,
          backgroundSize: '200% 100%',
        }}
      />
      
      {/* River highlights */}
      <div className="absolute bottom-[33%] left-0 right-0 h-1 bg-blue-400 opacity-50" />
      <div className="absolute bottom-[15%] left-0 right-0 h-1 bg-blue-300 opacity-30" />
    </div>
  );
};

export default RiverAnimation;