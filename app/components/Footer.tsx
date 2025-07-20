"use client"
import React from "react";
import Image from "next/image";
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
  <footer
    className="w-full relative overflow-hidden text-white flex flex-col md:flex-row gap-16 md:gap-0 justify-between items-start shadow-2xl border-t-0"
    style={{
      background: "url('/footerBackground.jpg') center/cover no-repeat, linear-gradient(135deg, #1e293b 60%, #181e29 100%)",
      padding: '96px 64px 96px 64px',
      minHeight: '520px',
      fontSize: '1.25rem', // 20px
      fontFamily: 'Segoe UI, Arial, Helvetica Neue, Helvetica, sans-serif',
      letterSpacing: '0.02em',
      fontWeight: 500,
    }}
  >
    {/* Geometric/abstract background shapes */}
    <div className="absolute inset-0 pointer-events-none z-0">
      <div className="absolute left-1/4 top-10 w-72 h-72 bg-gradient-to-tr from-blue-900/30 to-indigo-700/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute right-0 bottom-0 w-60 h-60 bg-gradient-to-br from-amber-600/20 to-pink-500/10 rounded-full blur-2xl animate-float" />
    </div>
    {/* Left: Branding & Contact */}
    <div className="relative z-10 flex-1 flex flex-col gap-8 items-start">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-4xl font-extrabold tracking-wider drop-shadow-lg animate-pulse-slow" style={{textShadow:'0 0 32px #fff6,0 2px 8px #38bdf8'}}>
          <Image src="/brandIcon.jpeg" alt="Logo" width={56} height={56} className="w-14 h-14 inline-block mr-2 drop-shadow-lg rounded-full" style={{filter:'drop-shadow(0 0 16px #fff8)'}} />
        </span>
      </div>
      <div className="text-xl font-semibold text-white/90 leading-relaxed mb-2" style={{fontFamily: 'inherit'}}>
        Head Office:<br/>
        101, Silvertech House, Main Street, Andheri West,<br/>
        Mumbai, Maharashtra 400053, India
      </div>
      <div className="flex flex-col gap-8 text-lg text-white/90 w-full" style={{fontFamily: 'inherit'}}>
        <div className="w-full max-w-3xl mx-auto p-16 rounded-[2.5rem] shadow-2xl border-2 border-white/20 bg-[url('/footerBackground.jpg')] bg-cover bg-center bg-no-repeat flex flex-col items-center" style={{backgroundColor: 'rgba(20,24,36,0.98)', boxShadow: '0 16px 64px 0 #000c'}}>
          <div className="flex items-center gap-12 mb-12">
            <FaPhoneAlt className="text-6xl text-amber-300 drop-shadow-2xl" />
            <span className="text-5xl font-extrabold tracking-widest text-white select-all">+91 22 1234 5678</span>
          </div>
          <div className="flex items-center gap-12">
            <FaEnvelope className="text-6xl text-blue-300 drop-shadow-2xl" />
            <span className="text-5xl font-extrabold tracking-widest text-white select-all">info@flajisil.com</span>
          </div>
        </div>
        <div className="flex gap-6 mt-8 justify-center w-full">
          <a href="#" className="group hover:text-blue-400 transition-all"><FaFacebookF className="text-3xl group-hover:scale-125 animate-pulse-slow" /></a>
          <a href="#" className="group hover:text-blue-300 transition-all"><FaTwitter className="text-3xl group-hover:scale-125 animate-pulse-slow" /></a>
          <a href="#" className="group hover:text-blue-500 transition-all"><FaLinkedinIn className="text-3xl group-hover:scale-125 animate-pulse-slow" /></a>
        </div>
      </div>
    </div>
    {/* Right: Branches */}
    <div className="relative z-10 flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 w-full max-w-2xl">
      <div className="col-span-full mb-4">
        <h4 className="text-3xl font-extrabold text-white mb-4 tracking-wide" style={{fontFamily: 'inherit'}}>
          Branch Offices
        </h4>
      </div>
      {branches.map((branch, idx) => (
        <div key={branch.city} className="flex items-start gap-4 group">
          <span className="mt-1 text-2xl text-amber-400 group-hover:scale-110 group-hover:text-blue-400 transition-all animate-float">
            <FaMapMarkerAlt />
          </span>
          <div>
            <div className="font-bold text-xl text-white mb-1" style={{fontFamily: 'inherit'}}>{branch.city}</div>
            <div className="text-white/90 text-lg leading-snug" style={{fontFamily: 'inherit'}}>{branch.address}</div>
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
