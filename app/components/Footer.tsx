"use client"
import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const branches = [
  {
    city: "Mumbai",
    address: "2nd Floor, ABC Tower, Bandra East, Mumbai, MH 400051",
  },
  {
    city: "Delhi",
    address: "Suite 12, Connaught Place, New Delhi, DL 110001",
  },
  {
    city: "Bangalore",
    address: "#45, MG Road, Bengaluru, KA 560001",
  },
  {
    city: "Chennai",
    address: "Plot 8, Anna Salai, Chennai, TN 600002",
  },
  // Add more branches as needed
];

const Footer = () => (
  <footer className="w-full relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-gray-800 text-white pt-[120px] pb-[120px] px-8 md:px-32 lg:px-56 flex flex-col md:flex-row gap-16 md:gap-0 justify-between items-start shadow-2xl border-t-0">
    {/* Decorative divider */}
    <div className="absolute top-0 left-0 w-full" style={{zIndex:2}}>
      <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-20">
        <path d="M0,80 C480,0 960,160 1440,80 L1440,0 L0,0 Z" fill="#181e29" fillOpacity="0.9" />
      </svg>
    </div>
    {/* Geometric/abstract background shapes */}
    <div className="absolute inset-0 pointer-events-none z-0">
      <div className="absolute left-1/4 top-10 w-72 h-72 bg-gradient-to-tr from-blue-900/30 to-indigo-700/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute right-0 bottom-0 w-60 h-60 bg-gradient-to-br from-amber-600/20 to-pink-500/10 rounded-full blur-2xl animate-float" />
    </div>
    {/* Left: Branding & Contact */}
    <div className="relative z-10 flex-1 flex flex-col gap-8 items-start">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-4xl font-extrabold tracking-wider drop-shadow-lg animate-pulse-slow" style={{textShadow:'0 0 32px #fff6,0 2px 8px #38bdf8'}}>
          <img src="/file.svg" alt="Logo" className="w-14 h-14 inline-block mr-2 drop-shadow-lg" style={{filter:'drop-shadow(0 0 16px #fff8)'}} />
          FLAJI SILVERTECH
        </span>
      </div>
      <div className="text-lg font-medium text-white/90 leading-relaxed mb-2">
        Head Office:<br/>
        101, Silvertech House, Main Street, Andheri West,<br/>
        Mumbai, Maharashtra 400053, India
      </div>
      <div className="flex flex-col gap-2 text-base text-white/80">
        <div className="flex items-center gap-3 group cursor-pointer hover:text-amber-400 transition-all">
          <FaPhoneAlt className="text-xl group-hover:scale-110 transition-transform animate-float" />
          +91 22 1234 5678
        </div>
        <div className="flex items-center gap-3 group cursor-pointer hover:text-amber-400 transition-all">
          <FaEnvelope className="text-xl group-hover:scale-110 transition-transform animate-float" />
          info@flajisil.com
        </div>
        <div className="flex gap-4 mt-2">
          <a href="#" className="group hover:text-blue-400 transition-all"><FaFacebookF className="text-xl group-hover:scale-125 animate-pulse-slow" /></a>
          <a href="#" className="group hover:text-blue-300 transition-all"><FaTwitter className="text-xl group-hover:scale-125 animate-pulse-slow" /></a>
          <a href="#" className="group hover:text-blue-500 transition-all"><FaLinkedinIn className="text-xl group-hover:scale-125 animate-pulse-slow" /></a>
        </div>
      </div>
    </div>
    {/* Right: Branches */}
    <div className="relative z-10 flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 w-full max-w-2xl">
      <div className="col-span-full mb-4">
        <h4 className="text-2xl font-bold text-white mb-4 tracking-wide">Branch Offices</h4>
      </div>
      {branches.map((branch, idx) => (
        <div key={branch.city} className="flex items-start gap-4 group">
          <span className="mt-1 text-2xl text-amber-400 group-hover:scale-110 group-hover:text-blue-400 transition-all animate-float">
            <FaMapMarkerAlt />
          </span>
          <div>
            <div className="font-semibold text-lg text-white mb-1">{branch.city}</div>
            <div className="text-white/80 text-base leading-snug">{branch.address}</div>
          </div>
        </div>
      ))}
    </div>
    {/* Custom animations */}
    <style jsx>{`
      @keyframes float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }
      .animate-float { animation: float 2.8s ease-in-out infinite; }
      @keyframes pulse-slow { 0%,100%{opacity:1;} 50%{opacity:0.7;} }
      .animate-pulse-slow { animation: pulse-slow 2.5s ease-in-out infinite; }
    `}</style>
  </footer>
);

export default Footer;
