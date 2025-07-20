
import React from "react";
import Link from "next/link";
import Image from "next/image";

const MainHeader = () => (
  <header style={{padding: "0px 2rem"}} className="bg-white py-8 px-8 md:px-24 lg:px-40 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 w-full shadow-xl border-b border-gray-200">
    <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
      <div className="flex items-center gap-3 mb-2">
        <Image style={{height: "5rem", width: "5rems"}} src="/brandIcon.jpeg" alt="Company Logo" width={48} height={48} className="rounded-full shadow-lg" />
      </div>
    </div>
    <nav className="hidden md:flex gap-x-10 pt-4 w-full justify-end">
      <Link
        href="/"
        className="text-gray-900 hover:text-amber-600 transition-colors text-lg font-semibold px-3 py-2 rounded-md"
      >
        HOME
      </Link>
      <Link
        href="/aboutus"
        className="text-gray-900 hover:text-amber-600 transition-colors text-lg font-semibold px-3 py-2 rounded-md"
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

export default MainHeader;
