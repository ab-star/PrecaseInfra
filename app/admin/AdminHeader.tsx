"use client";
import React from 'react';
import { usePathname } from 'next/navigation';

export default function AdminHeader() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin/login')) return null;
  return (
    <header className="bg-gray-800 text-white px-6 py-4 flex justify-between">
      <h1 style={{color: "white"}} className="font-semibold">Admin Portal</h1>
      {/* <nav className="space-x-4 text-sm">
        <a href="/admin/gallery" className="hover:underline">Gallery</a>
        <a href="/admin/projects" className="hover:underline">Projects</a>
        <a href="/admin/contacts" className="hover:underline">Contacts</a>
        <a href="/admin/login" className="hover:underline">Login</a>
      </nav> */}
    </header>
  );
}
