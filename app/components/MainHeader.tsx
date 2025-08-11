"use client"
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const MainHeader = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProductsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header style={{padding: "0px 1rem"}} className="fixed top-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 py-6 px-8 md:px-24 lg:px-40 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 w-full shadow-xl border-b border-gray-200">
      <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
        <div className="flex items-center gap-3 mb-2">
          <Image 
            style={{ height: "5rem", width: "5rem" }} 
            src="/brandIcon.jpeg" 
            alt="Company Logo" 
            width={48} 
            height={48} 
            className="rounded-full shadow-lg" 
          />
        </div>
      </div>
      
      <nav className="hidden md:flex gap-x-10 pt-4 w-full justify-end relative">
        <Link
          href="/"
          style={{fontSize: "1.2rem"}}
          className="text-gray-800 hover:text-amber-600 transition-colors duration-300 text-base"
        >
          HOME
        </Link>
        
        {/* Enhanced Products Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsProductsOpen(!isProductsOpen)}
            className="flex items-center text-gray-800 hover:text-amber-600 transition-colors duration-300 text-base"
            aria-expanded={isProductsOpen}
            aria-haspopup="true"
            style={{fontSize: "1.2rem"}}
          >
            PRODUCTS
            <svg
              className={`ml-2 h-4 w-4 transition-transform duration-200 ${isProductsOpen ? 'transform rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          {/* Animated Dropdown */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 mt-4 w-64 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-out ${
              isProductsOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
            style={{
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
          >
            <div className="py-2">
              <Link
                href="/products/box-culvert"
                className="flex items-center px-6 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200 group"
                onClick={() => setIsProductsOpen(false)}
              >
                <span className="mr-3 w-2 h-2 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                <span className="flex-1">Box Culvert</span>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-amber-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
              
              <Link
                href="/products/drains"
                className="flex items-center px-6 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200 group"
                onClick={() => setIsProductsOpen(false)}
              >
                <span className="mr-3 w-2 h-2 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                <span className="flex-1">Drains</span>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-amber-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
              
              <Link
                href="/products/walls"
                className="flex items-center px-6 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200 group"
                onClick={() => setIsProductsOpen(false)}
              >
                <span className="mr-3 w-2 h-2 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                <span className="flex-1">Walls</span>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-amber-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <Link
          href="/aboutus"
          style={{fontSize: "1.2rem"}}
          className="text-gray-800 hover:text-amber-600 transition-colors duration-300 text-base"
        >
          ABOUT US
        </Link>
      </nav>
      
      <button className="md:hidden text-gray-900">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </header>
  );
};

export default MainHeader;