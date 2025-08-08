"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const StrengthSection = () => {
  return (
    <section className="w-full h-screen bg-gray-900 flex items-center">
      <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8 text-white"
        >
          <div className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-6xl font-bold leading-tight"
            >
              UNMATCHED
              <span className="block text-amber-500">STRENGTH</span>
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100px' }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="h-1 bg-amber-500"
            />
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-xl leading-relaxed text-gray-300"
          >
            Built to withstand extreme loads and environmental conditions. 
            Our Box Culverts deliver exceptional durability with reinforced 
            concrete construction that exceeds industry standards.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6 pt-6"
          >
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-amber-500">50+</h3>
              <p className="text-gray-400">Years Lifespan</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-amber-500">100%</h3>
              <p className="text-gray-400">Quality Tested</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-amber-500">M40</h3>
              <p className="text-gray-400">Concrete Grade</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-amber-500">IP68</h3>
              <p className="text-gray-400">Water Resistance</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative h-96 lg:h-full"
        >
          <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="/product/BoxCulvertProduct/strong/strong.png"
              alt="Box Culvert Strength"
              fill
              className="object-cover"
              priority
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/20 to-transparent" />
          </div>
          
          {/* Floating stats card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            viewport={{ once: true }}
            className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-xl"
          >
            <div className="text-center">
              <h4 className="text-2xl font-bold text-gray-900">2000+</h4>
              <p className="text-gray-600">Projects Completed</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StrengthSection;
