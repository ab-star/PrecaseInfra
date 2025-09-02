"use client"
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Breadcrumbs from "./Breadcrumbs";

const MainHeader = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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
  "/contacts",
    "/certifications",
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
  <header style={{ padding: '0px 3rem' }} className="relative w-full h-28 bg-gray-900 overflow-visible z-[2000]"> {/* keep dropdown above page content */}
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
        <div className="flex items-center pl-4 sm:pl-6 gap-4 md:gap-6">
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
          {/* Header breadcrumbs */}
          <div className="hidden md:block max-w-[40vw] truncate">
            <Breadcrumbs variant="header" />
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-x-6 lg:gap-x-8 pr-4 sm:pr-6 relative">
          <Link href="/" onMouseEnter={() => router.prefetch('/')} onFocus={() => router.prefetch('/')} className="text-white hover:text-amber-300 transition-colors duration-300 text-sm font-medium tracking-normal" style={{ fontSize: '16px', fontWeight: 500 }}>
            HOME
          </Link>
    
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsProductsOpen(!isProductsOpen)}
              className="flex items-center text-white hover:text-amber-300 transition-colors duration-300 text-sm font-medium tracking-normal"
              style={{ fontSize: '16px', fontWeight: 500 }}
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
                  <span className="flex-1 font-medium leading-tight" style={{ color: '#fff', fontSize: '16px' , padding: "0.7rem 1rem" }}>Box Culvert</span>
                </Link>
                <Link href="/products/drains" prefetch onClick={() => setIsProductsOpen(false)} className="flex w-full items-center rounded-md px-6 py-3 hover:bg-emerald-500 text-xs sm:text-sm">
                  <span className="flex-1 font-medium leading-tight" style={{ color: '#fff', fontSize: '16px' , padding: "0.7rem 1rem" }}>Drains</span>
                </Link>
                <Link href="/products/walls" prefetch onClick={() => setIsProductsOpen(false)} className="flex w-full items-center rounded-md px-6 py-3 hover:bg-emerald-500 text-xs sm:text-sm">
                  <span className="flex-1 font-medium leading-tight" style={{ color: '#fff', fontSize: '16px' , padding: "0.7rem 1rem" }}>Walls</span>
                </Link>
                {/* Other product links... */}
              </div>
            </div>
          </div>

          <Link href="/view-gallery" onMouseEnter={() => router.prefetch('/view-gallery')} onFocus={() => router.prefetch('/view-gallery')} className="text-white hover:text-amber-300 transition-colors duration-300 text-sm font-medium tracking-normal" style={{ fontSize: '16px', fontWeight: 500 }}>
            GALLERY
          </Link>
          <Link href="/view-projects" onMouseEnter={() => router.prefetch('/view-projects')} onFocus={() => router.prefetch('/view-projects')} className="text-white hover:text-amber-300 transition-colors duration-300 text-sm font-medium tracking-normal" style={{ fontSize: '16px', fontWeight: 500 }}>
            PROJECTS
          </Link>
          <Link href="/contacts" onMouseEnter={() => router.prefetch('/contacts')} onFocus={() => router.prefetch('/contacts')} className="text-white hover:text-amber-300 transition-colors duration-300 text-sm font-medium tracking-normal" style={{ fontSize: '16px', fontWeight: 500 }}>
            CONTACT
          </Link>
          <Link href="/certifications" onMouseEnter={() => router.prefetch('/certifications')} onFocus={() => router.prefetch('/certifications')} className="text-white hover:text-amber-300 transition-colors duration-300 text-sm font-medium tracking-normal uppercase" style={{ fontSize: '16px', fontWeight: 500 }}>
            CERTIFICATIONS
          </Link>
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
        <button onClick={() => setMobileOpen((v) => !v)} aria-expanded={mobileOpen} aria-controls="mobile-menu" className="md:hidden text-white p-2 mr-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {/* Mobile overlay and drawer */}
      <div className={`md:hidden fixed inset-0 ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'} z-[2100]`}> 
        <div onClick={() => setMobileOpen(false)} className={`absolute inset-0 bg-black/40 transition-opacity ${mobileOpen ? 'opacity-100' : 'opacity-0'}`} />
        <div id="mobile-menu" className={`absolute right-0 top-0 h-full w-72 max-w-[85vw] bg-emerald-700 text-white shadow-2xl border-l border-emerald-600 transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4 flex items-center justify-between border-b border-emerald-600">
            <span className="font-semibold tracking-wide">Menu</span>
            <button onClick={() => setMobileOpen(false)} className="p-2 rounded hover:bg-emerald-600/60" aria-label="Close menu">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M6.225 4.811a1 1 0 0 1 1.414 0L12 9.172l4.361-4.361a1 1 0 1 1 1.415 1.414L13.415 10.586l4.36 4.361a1 1 0 1 1-1.414 1.414L12 12l-4.361 4.361a1 1 0 1 1-1.414-1.414l4.36-4.361-4.36-4.361a1 1 0 0 1 0-1.414Z"/></svg>
            </button>
          </div>
          <div className="py-2">
            <Link href="/" onClick={() => setMobileOpen(false)} className="block px-5 py-3 hover:bg-emerald-600">Home</Link>
            <div className="mt-1 border-t border-emerald-600/60" />
            <div className="px-5 pt-3 pb-1 text-xs uppercase tracking-wider text-emerald-200/80">Products</div>
            <Link href="/products/box-culvert" onClick={() => setMobileOpen(false)} className="block px-5 py-3 hover:bg-emerald-600">Box Culvert</Link>
            <Link href="/products/drains" onClick={() => setMobileOpen(false)} className="block px-5 py-3 hover:bg-emerald-600">Drains</Link>
            <Link href="/products/walls" onClick={() => setMobileOpen(false)} className="block px-5 py-3 hover:bg-emerald-600">Walls</Link>
            <div className="mt-1 border-t border-emerald-600/60" />
            <Link href="/view-gallery" onClick={() => setMobileOpen(false)} className="block px-5 py-3 hover:bg-emerald-600">Gallery</Link>
            <Link href="/view-projects" onClick={() => setMobileOpen(false)} className="block px-5 py-3 hover:bg-emerald-600">Projects</Link>
            <Link href="/contacts" onClick={() => setMobileOpen(false)} className="block px-5 py-3 hover:bg-emerald-600">Contact</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;