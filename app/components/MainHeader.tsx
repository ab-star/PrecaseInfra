"use client"
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const MainHeader = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProductsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header style={{ padding: '0px 3rem' }} className="relative w-full h-28 bg-gray-900 overflow-visible"> {/* Changed to overflow-visible */}
      {/* Background image */}
      <div  className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          src="/navBgUt.jpg"
          alt="Concrete background"
          layout="fill"
          objectFit="cover"
          quality={100}       
          priority
          className="opacity-90"
        />
      </div>
      
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Main container */}
      <div className="relative z-20 h-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center pl-4 sm:pl-6">
          <div className="rounded-full p-1 bg-white/10 backdrop-blur-sm border border-white/20">
            <Image 
              src="/brandIcon.jpeg" 
              alt="Company Logo" 
              width={80}
              height={80}
              className="rounded-full border-2 border-white/80 shadow-lg"
              quality={100}
            />
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-x-6 lg:gap-x-8 pr-4 sm:pr-6 relative">
          <Link href="/" className="text-white hover:text-amber-300 transition-colors duration-300 text-lg font-semibold tracking-wide">
            HOME
          </Link>
          
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsProductsOpen(!isProductsOpen)}
              className="flex items-center text-white hover:text-amber-300 transition-colors duration-300 text-lg font-semibold tracking-wide"
            >
              PRODUCTS
              <svg className={`ml-2 h-5 w-5 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`}>
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* Dropdown positioned absolutely below header */}
            <div className={`absolute left-0 top-full mt-0 w-64 bg-white rounded-b-lg shadow-xl transition-all duration-300 z-50 ${
              isProductsOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
            }`}>
              <div className="py-1 border-t-2 border-amber-500">
                <Link href="/products/box-culvert" className="flex items-center px-6 py-3 text-gray-800 hover:bg-amber-50 hover:text-amber-600 group">
                  <span className="mr-3 w-2 h-2 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="flex-1 font-medium">Box Culvert</span>
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-amber-600" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
                <Link href="/products/box-culvert" className="flex items-center px-6 py-3 text-gray-800 hover:bg-amber-50 hover:text-amber-600 group">
                  <span className="mr-3 w-2 h-2 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="flex-1 font-medium">Drains</span>
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-amber-600" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
                <Link href="/products/box-culvert" className="flex items-center px-6 py-3 text-gray-800 hover:bg-amber-50 hover:text-amber-600 group">
                  <span className="mr-3 w-2 h-2 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="flex-1 font-medium">Walls</span>
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-amber-600" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
                {/* Other product links... */}
              </div>
            </div>
          </div>

          <Link href="/aboutus" className="text-white hover:text-amber-300 transition-colors duration-300 text-lg font-semibold tracking-wide">
            ABOUT US
          </Link>
          
          <Link href="/gallery" className="text-white hover:text-amber-300 transition-colors duration-300 text-lg font-semibold tracking-wide">
            GALLERY
          </Link>
        </nav>
        
        {/* Mobile menu button */}
        <button className="md:hidden text-white p-2 mr-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default MainHeader;