"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FutureReadySection = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  const innovations = [
    {
      title: "Smart Infrastructure",
      description: "IoT-enabled structures with real-time monitoring capabilities",
      features: [
        "Embedded sensors for structural health monitoring",
        "Automated maintenance alerts",
        "Data-driven decision making"
      ],
      image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Sustainable Solutions",
      description: "Eco-friendly materials and energy-efficient designs",
      features: [
        "Carbon-neutral manufacturing processes",
        "Recycled material integration",
        "Solar-ready infrastructure"
      ],
      image: "https://images.unsplash.com/photo-1617103996702-96ff29b1c467?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Modular Construction",
      description: "Precision-engineered components for rapid deployment",
      features: [
        "Factory-controlled quality assurance",
        "70% faster installation",
        "Minimal site disruption"
      ],
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Digital Twin Technology",
      description: "Virtual replicas for optimized planning and maintenance",
      features: [
        "AI-powered predictive analytics",
        "Lifespan optimization",
        "Remote diagnostics"
      ],
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
      {/* Construction grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/concrete-wall-3.png')]"></div>
      </div>
      
      {/* Blueprint lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-0.5 h-full bg-blue-500/20"></div>
        <div className="absolute top-1/3 left-0 w-full h-0.5 bg-blue-500/20"></div>
        <div className="absolute top-2/3 left-0 w-full h-0.5 bg-blue-500/20"></div>
        <div className="absolute top-20 right-1/4 w-0.5 h-full bg-blue-500/20"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4"
          >
            <span className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              INNOVATION IN ACTION
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Building the <span className="text-blue-400">Future-Ready</span> India
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300"
          >
            Next-generation infrastructure solutions designed for tomorrow&apos;s challenges
          </motion.p>
        </div>
        
        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-800 p-1 rounded-lg">
            {innovations.map((innovation, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                  activeTab === index 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {innovation.title}
              </button>
            ))}
          </div>
        </div>
        
        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-700">
              <img 
                src={innovations[activeTab].image} 
                alt={innovations[activeTab].title} 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
              
              {/* Construction elements */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">
                +
              </div>
              <div className="absolute bottom-4 left-4 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            
            {/* Blueprint annotation */}
            <div className="absolute -bottom-6 -right-6 bg-blue-900 text-white px-4 py-2 rounded-lg shadow-lg">
              <span className="font-bold">3D Model</span> Preview
            </div>
          </motion.div>
          
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-3xl font-bold text-white mb-4">
              {innovations[activeTab].title}
            </h3>
            <p className="text-xl text-blue-300 mb-6">
              {innovations[activeTab].description}
            </p>
            
            <ul className="space-y-4 mb-8">
              {innovations[activeTab].features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                  <p className="ml-4 text-lg text-gray-300">{feature}</p>
                </li>
              ))}
            </ul>
            
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg">
                Request Technical Details
              </button>
              <button className="px-6 py-3 bg-transparent hover:bg-gray-800 text-white rounded-lg font-medium border border-gray-700 transition-colors">
                View Case Studies
              </button>
            </div>
          </motion.div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
            className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700"
          >
            <div className="text-4xl font-bold text-blue-400 mb-2">40%</div>
            <div className="text-gray-300">Reduced construction time</div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700"
          >
            <div className="text-4xl font-bold text-blue-400 mb-2">50+</div>
            <div className="text-gray-300">Years lifespan guarantee</div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700"
          >
            <div className="text-4xl font-bold text-blue-400 mb-2">200+</div>
            <div className="text-gray-300">Future-ready projects delivered</div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700"
          >
            <div className="text-4xl font-bold text-blue-400 mb-2">35%</div>
            <div className="text-gray-300">Lower carbon footprint</div>
          </motion.div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-8 h-8 bg-yellow-500 rounded-full opacity-30 animate-float"></div>
      <div className="absolute top-1/3 right-20 w-6 h-6 bg-blue-500 rounded-full opacity-30 animate-float animation-delay-2000"></div>
      <div className="absolute bottom-40 left-1/4 w-4 h-4 bg-green-500 rounded-full opacity-30 animate-float animation-delay-3000"></div>
      
      <style jsx>{`
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-15px) translateX(5px); }
        }
      `}</style>
    </section>
  );
};

export default FutureReadySection;