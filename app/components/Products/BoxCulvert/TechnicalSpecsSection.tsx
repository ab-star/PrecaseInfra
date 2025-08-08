"use client";
import React from 'react';
import { motion } from 'framer-motion';

const TechnicalSpecsSection = () => {
  const specifications = [
    {
      category: "Structural",
      items: [
        { label: "Concrete Grade", value: "M40", unit: "" },
        { label: "Steel Grade", value: "Fe500", unit: "" },
        { label: "Cover", value: "40", unit: "mm" },
        { label: "Design Life", value: "50+", unit: "years" }
      ]
    },
    {
      category: "Dimensions",
      items: [
        { label: "Width Range", value: "1.5-4.0", unit: "m" },
        { label: "Height Range", value: "1.5-4.0", unit: "m" },
        { label: "Length", value: "2.0-6.0", unit: "m" },
        { label: "Wall Thickness", value: "150-300", unit: "mm" }
      ]
    },
    {
      category: "Performance",
      items: [
        { label: "Load Bearing", value: "HS25", unit: "" },
        { label: "Water Resistance", value: "IP68", unit: "" },
        { label: "Flow Capacity", value: "50", unit: "m³/s" },
        { label: "Installation Time", value: "2-4", unit: "hours" }
      ]
    }
  ];

  const features = [
    {
      icon: "🏗️",
      title: "Rapid Installation",
      description: "Pre-engineered design enables quick on-site assembly"
    },
    {
      icon: "💧",
      title: "Hydraulic Efficiency",
      description: "Optimized flow characteristics for maximum capacity"
    },
    {
      icon: "🛡️",
      title: "Weather Resistant",
      description: "Engineered to withstand extreme environmental conditions"
    },
    {
      icon: "🔧",
      title: "Low Maintenance",
      description: "Durable construction minimizes ongoing maintenance needs"
    }
  ];

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            TECHNICAL
            <span className="block text-cyan-400">EXCELLENCE</span>
          </h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mb-6" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Precision-engineered specifications that meet and exceed international standards
          </p>
        </motion.div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {specifications.map((spec, index) => (
            <motion.div
              key={spec.category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                {spec.category}
              </h3>
              <div className="space-y-4">
                {spec.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: (index * 0.2) + (itemIndex * 0.1) }}
                    viewport={{ once: true }}
                    className="flex justify-between items-center py-2 border-b border-white/10"
                  >
                    <span className="text-gray-300">{item.label}</span>
                    <span className="text-cyan-400 font-bold">
                      {item.value} {item.unit}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
              <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button className="bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-300 shadow-lg hover:shadow-cyan-500/25">
            Download Technical Datasheet
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnicalSpecsSection;
