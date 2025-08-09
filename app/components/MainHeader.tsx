"use client"
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const MainHeader = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  return (
    <header style={{ padding: "0px 2rem" }} className="fixed top-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 py-8 px-8 md:px-24 lg:px-40 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 w-full shadow-xl border-b border-gray-200">
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
          style={{fontSize: "1.1rem"}}
        >
          HOME
        </Link>
        
        {/* Products Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProductsOpen(!isProductsOpen)}
            className="flex items-center"
            style={{fontSize: "1.1rem"}}
          >
            PRODUCTS
            <svg
              className={`ml-1 h-5 w-5 transition-transform ${isProductsOpen ? 'transform rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          {isProductsOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-[110] border border-gray-200">
              <Link
                href="/products/box-culvert"
                className="block px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                onClick={() => setIsProductsOpen(false)}
              >
                Box Culvert
              </Link>
              <Link
                href="/products/drains"
                className="block px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                onClick={() => setIsProductsOpen(false)}
              >
                Drains
              </Link>
              <Link
                href="/products/walls"
                className="block px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                onClick={() => setIsProductsOpen(false)}
              >
                Walls
              </Link>
            </div>
          )}
        </div>

        <Link
          href="/aboutus"
          className=""
          style={{fontSize: "1.1rem"}}
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