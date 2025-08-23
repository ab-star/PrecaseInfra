"use client"
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MainHeader = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProductsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prefetch common routes on mount for snappier navigation
  useEffect(() => {
    const routes = [
      "/",
      "/aboutus",
      "/gallery",
      "/view-gallery",
      "/view-projects",
      "/products/box-culvert",
      "/products/drains",
      "/products/walls",
    ];
    routes.forEach((r) => router.prefetch(r));
  }, [router]);

  // Prefetch product routes when dropdown opens
  useEffect(() => {
    if (isProductsOpen) {
      [
        "/products/box-culvert",
        "/products/drains",
        "/products/walls",
      ].forEach((r) => router.prefetch(r));
    }
  }, [isProductsOpen, router]);

  return (
    <header style={{ padding: '0px 3rem' }} className="relative w-full h-28 bg-gray-900 overflow-visible z-[1200]"> {/* keep dropdown above page content */}
      {/* Background image */}
      <div  className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          src="/navBgUt.webp"
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
          <Link href="/" onMouseEnter={() => router.prefetch('/')} onFocus={() => router.prefetch('/')} className="text-white hover:text-amber-300 transition-colors duration-300 text-sm font-medium tracking-normal" style={{ fontSize: '14px', fontWeight: 500 }}>
            HOME
          </Link>
          
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsProductsOpen(!isProductsOpen)}
              className="flex items-center text-white hover:text-amber-300 transition-colors duration-300 text-sm font-medium tracking-normal"
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              PRODUCTS
              <svg className={`ml-2 h-4 w-4 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`}>
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* Dropdown positioned absolutely below header */}
            <div className={`absolute right-0 top-full mt-0 w-64 max-w-[calc(100vw-1rem)] bg-emerald-600 text-white rounded-b-lg shadow-xl border border-emerald-700 transition-all duration-300 z-[1300] ${
              isProductsOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
            }`}>
              <div className="py-3 px-3">
                <Link href="/products/box-culvert" prefetch onClick={() => setIsProductsOpen(false)} className="flex w-full items-center rounded-md px-6 py-3 hover:bg-emerald-500 text-xs sm:text-sm">
                  <span className="flex-1 font-medium leading-tight" style={{ color: '#fff', fontSize: '12px' , padding: "0.7rem 1rem" }}>Box Culvert</span>
                </Link>
                <Link href="/products/drains" prefetch onClick={() => setIsProductsOpen(false)} className="flex w-full items-center rounded-md px-6 py-3 hover:bg-emerald-500 text-xs sm:text-sm">
                  <span className="flex-1 font-medium leading-tight" style={{ color: '#fff', fontSize: '12px' , padding: "0.7rem 1rem" }}>Drains</span>
                </Link>
                <Link href="/products/walls" prefetch onClick={() => setIsProductsOpen(false)} className="flex w-full items-center rounded-md px-6 py-3 hover:bg-emerald-500 text-xs sm:text-sm">
                  <span className="flex-1 font-medium leading-tight" style={{ color: '#fff', fontSize: '12px' , padding: "0.7rem 1rem" }}>Walls</span>
                </Link>
                {/* Other product links... */}
              </div>
            </div>
          </div>

          {/* <Link href="/aboutus" onMouseEnter={() => router.prefetch('/aboutus')} onFocus={() => router.prefetch('/aboutus')} className="text-white hover:text-amber-300 transition-colors duration-300 text-sm font-medium tracking-normal" style={{ fontSize: '14px', fontWeight: 500 }}>
            ABOUT US
          </Link>
          
          <Link href="/gallery" onMouseEnter={() => router.prefetch('/gallery')} onFocus={() => router.prefetch('/gallery')} className="text-white hover:text-amber-300 transition-colors duration-300 text-sm font-medium tracking-normal" style={{ fontSize: '14px', fontWeight: 500 }}>
            GALLERY
          </Link>
          <Link href="/view-gallery" onMouseEnter={() => router.prefetch('/view-gallery')} onFocus={() => router.prefetch('/view-gallery')} className="text-white hover:text-amber-300 transition-colors duration-300 text-sm font-medium tracking-normal" style={{ fontSize: '14px', fontWeight: 500 }}>
            VIEW GALLERY
          </Link>
          <Link href="/view-projects" onMouseEnter={() => router.prefetch('/view-projects')} onFocus={() => router.prefetch('/view-projects')} className="text-white hover:text-amber-300 transition-colors duration-300 text-sm font-medium tracking-normal" style={{ fontSize: '14px', fontWeight: 500 }}>
            VIEW PROJECTS
          </Link> */}
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