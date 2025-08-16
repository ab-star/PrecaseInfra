// components/PrecastBoxCulverts.jsx
"use client"
import React, { useState, useRef, useEffect } from 'react';

const PrecastBoxCulverts = () => {
  const [rotation, setRotation] = useState({ x: -15, y: 30 });
  const [isHovered, setIsHovered] = useState(false);
  const [activePart, setActivePart] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const modelRef = useRef<HTMLDivElement | null>(null);
  
  // Culvert parts data
  const culvertParts = [
    { id: 'base', name: 'Foundation Base', description: 'Reinforced concrete base designed for stability and load distribution', color: 'bg-blue-500' },
    { id: 'wall-left', name: 'Left Side Wall', description: 'Precast concrete wall with integrated reinforcement', color: 'bg-green-500' },
    { id: 'wall-right', name: 'Right Side Wall', description: 'Precast concrete wall with integrated reinforcement', color: 'bg-green-500' },
    { id: 'top', name: 'Roof Slab', description: 'Heavy-duty precast concrete roof with excellent load-bearing capacity', color: 'bg-purple-500' },
  ];
  
  // Features data
  const features = [
    { 
      title: 'Superior Strength', 
      description: 'Designed to withstand extreme loads and environmental conditions', 
      icon: '💪' 
    },
    { 
      title: 'Quick Installation', 
      description: 'Precast design allows for rapid assembly on-site', 
      icon: '⚡' 
    },
    { 
      title: 'Low Maintenance', 
      description: 'Durable concrete construction requires minimal upkeep', 
      icon: '🛠️' 
    },
    { 
      title: 'Cost Effective', 
      description: 'Reduces construction time and long-term maintenance costs', 
      icon: '💰' 
    },
    { 
      title: 'Eco-Friendly', 
      description: 'Made from sustainable materials with long service life', 
      icon: '🌱' 
    },
    { 
      title: 'Customizable', 
      description: 'Available in various sizes and configurations', 
      icon: '📐' 
    },
  ];
  
  // Applications data
  const applications = [
    { 
      title: 'Highway Drainage', 
      description: 'Efficient water management for road infrastructure', 
      icon: '🛣️' 
    },
    { 
      title: 'Pedestrian Underpasses', 
      description: 'Safe crossings beneath busy roads', 
      icon: '🚶' 
    },
    { 
      title: 'Utility Tunnels', 
      description: 'Protection for cables and pipelines', 
      icon: '🔌' 
    },
    { 
      title: 'Stormwater Management', 
      description: 'Effective flood control systems', 
      icon: '🌧️' 
    },
    { 
      title: 'Railway Crossings', 
      description: 'Durable solutions for rail infrastructure', 
      icon: '🚆' 
    },
    { 
      title: 'Wildlife Passages', 
      description: 'Safe animal crossings under roadways', 
      icon: '🦌' 
    },
  ];
  
  // Handle mouse movement for 3D rotation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!modelRef.current) return;
    
    const rect = modelRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const rotateY = (x / rect.width - 0.5) * 60;
    const rotateX = -(y / rect.height - 0.5) * 30;
    
    setRotation({ x: rotateX, y: rotateY });
  };
  
  // Handle scroll animations
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Reset rotation when not hovering
  useEffect(() => {
  let timeout: ReturnType<typeof setTimeout> | undefined;
    if (!isHovered) {
      timeout = setTimeout(() => {
        setRotation({ x: -15, y: 30 });
      }, 300);
    }
    return () => clearTimeout(timeout);
  }, [isHovered]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-gray-900/90 backdrop-blur-md py-3 shadow-xl' : 'bg-transparent py-6'
      }`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="font-bold text-xl">F</span>
            </div>
            <span className="text-xl font-bold">FujiSilverTech</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-blue-400 transition-colors">Home</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Products</a>
            <a href="#" className="text-blue-400 font-semibold">Precast Culverts</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Projects</a>
            <a href="#" className="hover:text-blue-400 transition-colors">About</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
          </div>
          
          <button className="bg-blue-600 hover:bg-blue-500 transition-colors px-6 py-2 rounded-full font-medium">
            Request Quote
          </button>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="block text-blue-400">Precast Concrete</span>
                <span className="block">Box Culverts</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                High-quality, durable precast concrete box culverts designed for infrastructure projects requiring strength, longevity, and efficient installation.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-12">
                <button className="bg-blue-600 hover:bg-blue-500 transition-colors px-8 py-4 rounded-full font-medium text-lg">
                  Download Brochure
                </button>
                <button className="bg-transparent border-2 border-blue-500 hover:bg-blue-500/10 transition-colors px-8 py-4 rounded-full font-medium text-lg">
                  View Specifications
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { value: '50+', label: 'Projects' },
                  { value: '100+', label: 'Installations' },
                  { value: '100yrs', label: 'Lifespan' },
                  { value: 'ISO', label: 'Certified' }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                    <div className="text-2xl font-bold text-blue-400">{item.value}</div>
                    <div className="text-gray-400">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 flex justify-center">
              <div 
                ref={modelRef}
                className="relative w-full max-w-lg h-96 md:h-[500px] rounded-2xl overflow-hidden border-4 border-blue-500/30 bg-gradient-to-br from-gray-800 to-gray-900"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                  transition: isHovered ? 'none' : 'transform 0.5s ease'
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-64 h-64 md:w-80 md:h-80">
                    {/* 3D Model Representation */}
                    <div className="absolute inset-0">
                      {/* Base */}
                      <div 
                        className={`absolute bottom-0 left-1/4 w-1/2 h-8 bg-gray-600 rounded-t-lg border-t-2 border-blue-400 ${activePart === 'base' ? 'ring-4 ring-blue-400' : ''}`}
                        onMouseEnter={() => setActivePart('base')}
                        onMouseLeave={() => setActivePart(null)}
                      />
                      
                      {/* Left Wall */}
                      <div 
                        className={`absolute bottom-8 left-1/4 w-8 h-40 bg-gray-700 rounded-l-lg border-l-2 border-blue-400 ${activePart === 'wall-left' ? 'ring-4 ring-blue-400' : ''}`}
                        onMouseEnter={() => setActivePart('wall-left')}
                        onMouseLeave={() => setActivePart(null)}
                      />
                      
                      {/* Right Wall */}
                      <div 
                        className={`absolute bottom-8 right-1/4 w-8 h-40 bg-gray-700 rounded-r-lg border-r-2 border-blue-400 ${activePart === 'wall-right' ? 'ring-4 ring-blue-400' : ''}`}
                        onMouseEnter={() => setActivePart('wall-right')}
                        onMouseLeave={() => setActivePart(null)}
                      />
                      
                      {/* Top */}
                      <div 
                        className={`absolute top-1/3 left-1/4 w-1/2 h-8 bg-gray-600 rounded-b-lg border-b-2 border-blue-400 ${activePart === 'top' ? 'ring-4 ring-blue-400' : ''}`}
                        onMouseEnter={() => setActivePart('top')}
                        onMouseLeave={() => setActivePart(null)}
                      />
                    </div>
                    
                    {/* Interactive Hotspots */}
                    {culvertParts.map((part) => (
                      <div 
                        key={part.id}
                        className={`absolute w-6 h-6 rounded-full flex items-center justify-center cursor-pointer animate-pulse ${part.color}`}
                        style={{
                          top: part.id === 'top' ? '30%' : part.id.includes('wall') ? '50%' : '85%',
                          left: part.id === 'wall-left' ? '25%' : part.id === 'wall-right' ? '75%' : '50%',
                          transform: 'translate(-50%, -50%)'
                        }}
                        onMouseEnter={() => setActivePart(part.id)}
                        onMouseLeave={() => setActivePart(null)}
                      >
                        <span className="text-xs font-bold">+</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Active Info Panel */}
                {activePart && (
                  <div className="absolute bottom-6 left-6 right-6 bg-gray-900/80 backdrop-blur-md p-4 rounded-xl border border-blue-500/30 transform transition-all duration-300">
                    <h3 className="text-xl font-bold text-blue-400 mb-2">
                      {culvertParts.find(p => p.id === activePart)?.name}
                    </h3>
                    <p className="text-gray-300">
                      {culvertParts.find(p => p.id === activePart)?.description}
                    </p>
                  </div>
                )}
                
                {/* Water Animation */}
                <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
                  <div className="absolute -top-4 left-0 right-0 h-20 bg-blue-500/20 animate-wave"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Our Precast Box Culverts?</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Engineered for performance and durability, our culverts offer superior solutions for modern infrastructure needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Applications Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Diverse Applications</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our precast box culverts are versatile solutions for a wide range of infrastructure projects.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applications.map((app, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-4">{app.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{app.title}</h3>
                  <p className="text-gray-400">{app.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Technical Specifications */}
      <section className="py-20 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Technical Specifications</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Engineered to meet international standards and project requirements.
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-800">
                  <th className="p-4 text-left">Parameter</th>
                  <th className="p-4 text-left">Standard</th>
                  <th className="p-4 text-left">Large</th>
                  <th className="p-4 text-left">Extra Large</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { param: 'Internal Dimensions (WxH)', standard: '1.5m x 1.5m', large: '3m x 3m', xlarge: '6m x 4m' },
                  { param: 'Wall Thickness', standard: '150mm', large: '200mm', xlarge: '250mm' },
                  { param: 'Roof Thickness', standard: '200mm', large: '250mm', xlarge: '300mm' },
                  { param: 'Load Capacity', standard: 'HS20', large: 'HS25', xlarge: 'HS30' },
                  { param: 'Concrete Grade', standard: 'M40', large: 'M45', xlarge: 'M50' },
                  { param: 'Waterproofing', standard: 'Integral', large: 'Integral + Membrane', xlarge: 'Integral + Membrane' },
                ].map((row, index) => (
                  <tr 
                    key={index} 
                    className={`border-b border-gray-700 hover:bg-gray-800/50 ${index % 2 === 0 ? 'bg-gray-900/50' : ''}`}
                  >
                    <td className="p-4 font-medium">{row.param}</td>
                    <td className="p-4">{row.standard}</td>
                    <td className="p-4">{row.large}</td>
                    <td className="p-4">{row.xlarge}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      {/* Gallery Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Project Gallery</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              See our precast box culverts in action across various infrastructure projects.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div 
                key={item}
                className="relative aspect-video rounded-xl overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gray-700 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-bold">Highway Drainage Project</h3>
                    <p className="text-gray-300">Bangalore, India</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-blue-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Contact our engineering team today to discuss your requirements and get a customized solution.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-blue-900 hover:bg-gray-100 transition-colors px-8 py-4 rounded-full font-medium text-lg">
              Request a Quote
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white/10 transition-colors px-8 py-4 rounded-full font-medium text-lg">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="font-bold text-xl">F</span>
                </div>
                <span className="text-xl font-bold">FujiSilverTech</span>
              </div>
              <p className="text-gray-400">
                Leading manufacturer of precast concrete solutions for modern infrastructure projects.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Products</h3>
              <ul className="space-y-2">
                {['Box Culverts', 'Pipe Culverts', 'Retaining Walls', 'Manhole Covers', 'Bridge Components'].map((item, index) => (
                  <li key={index}><a href="#" className="text-gray-400 hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                {['About Us', 'Projects', 'Careers', 'News', 'Sustainability'].map((item, index) => (
                  <li key={index}><a href="#" className="text-gray-400 hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>123 Industrial Area,</li>
                <li>Bangalore, India 560058</li>
                <li>info@fujisilvertech.com</li>
                <li>+91 80 1234 5678</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>© 2023 Fuji SilverTech. All rights reserved. ISO 9001:2015 Certified</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrecastBoxCulverts;