"use client"
import React from "react";

const CompanyVision = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-amber-50">
      {/* Navigation Bar */}
      <nav className="w-full flex justify-between items-center px-8 py-5 bg-white/70 shadow-md sticky top-0 z-30">
        <div className="text-blue-800 font-extrabold text-xl tracking-wider">Fuji Silvertech</div>
        <div className="flex gap-6">
          <a href="/" className="text-blue-700 hover:text-amber-500 font-semibold transition-colors">Home</a>
          <a href="/company-vision" className="text-blue-700 hover:text-amber-500 font-semibold transition-colors">Company Vision</a>
        </div>
      </nav>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-2xl w-full bg-white/80 rounded-2xl shadow-2xl p-10 text-center animate-fadeInUp">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-6 tracking-tight drop-shadow-lg">Our Vision</h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed animate-fadeInUp delay-200">
          To be the leading force in precast innovation, delivering sustainable infrastructure solutions that shape a better tomorrow. We are committed to quality, integrity, and progress, empowering communities and industries with advanced technology and visionary thinking.
        </p>
        <div className="mt-8 flex flex-col gap-4 animate-fadeInUp delay-400">
          <div className="bg-blue-100/60 rounded-xl p-4 shadow-md">
            <h2 className="text-xl font-bold text-blue-600 mb-1">Innovation</h2>
            <p className="text-gray-600">We embrace new ideas and technologies to drive progress in every project.</p>
          </div>
          <div className="bg-amber-100/60 rounded-xl p-4 shadow-md">
            <h2 className="text-xl font-bold text-amber-600 mb-1">Sustainability</h2>
            <p className="text-gray-600">We build for the future, prioritizing eco-friendly solutions and responsible growth.</p>
          </div>
          <div className="bg-gray-100/60 rounded-xl p-4 shadow-md">
            <h2 className="text-xl font-bold text-gray-700 mb-1">Community</h2>
            <p className="text-gray-600">We empower people and industries, creating value for all stakeholders.</p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyVision;
