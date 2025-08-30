import React from 'react';
import AdminHostGate from './AdminHostGate';
import AdminAutoLogoutOnLeave from './AdminAutoLogoutOnLeave';
import AdminHeader from './AdminHeader';
import AdminMain from './AdminMain';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Portal - Infrastire',
  description: 'Infrastructure Management System',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
  <AdminHostGate />
  <AdminAutoLogoutOnLeave />
  <AdminHeader />
  <AdminMain>{children}</AdminMain>
    </div>
  );
}
