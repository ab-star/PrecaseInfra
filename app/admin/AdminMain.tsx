"use client";
import React from 'react';
import { usePathname } from 'next/navigation';

export default function AdminMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname?.startsWith('/admin/login');
  if (isLogin) {
    return <main className="p-0 m-0 w-full max-w-none">{children}</main>;
  }
  return <main className="max-w-4xl mx-auto p-6">{children}</main>;
}
