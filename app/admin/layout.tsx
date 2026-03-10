
import React from 'react';
import type { Metadata } from 'next';
import AdminNavbar from './components/AdminNavBar';

export const metadata: Metadata = {
  title: 'Admin Portal - Infrastire',
  description: 'Infrastructure Management System',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
      return (<div className="min-h-screen bg-gray-100 text-gray-900">
        <AdminNavbar></AdminNavbar>
        {children}
      </div>)
}
