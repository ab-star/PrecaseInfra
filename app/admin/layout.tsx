import React from 'react';
import AdminHostGate from './AdminHostGate';
import AdminAuthGate from './AdminAuthGate';
import AdminHeader from './AdminHeader';
import AdminMain from './AdminMain';
import type { Metadata } from 'next';
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata: Metadata = {
  title: 'Admin Portal - Infrastire',
  description: 'Infrastructure Management System',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <AdminHostGate />
        <AdminAuthGate />
        <AdminHeader />
        <AdminMain>{children}</AdminMain>
      </div>
    </AuthProvider>
  );
}
