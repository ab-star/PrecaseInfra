import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Portal - Infrastire',
  description: 'Infrastructure Management System',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-gray-800 text-white px-6 py-4 flex justify-between">
        <h1 className="font-semibold">Admin Portal</h1>
        <nav className="space-x-4 text-sm">
          <a href="/admin/gallery" className="hover:underline">Gallery</a>
          <a href="/admin/projects" className="hover:underline">Projects</a>
          <a href="/admin/login" className="hover:underline">Login</a>
        </nav>
      </header>
      <main className="max-w-4xl mx-auto p-6">{children}</main>
    </div>
  );
}
