'use client';

import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminAuthGate() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';
  const logoutOnUnmountRef = useRef(false);
  const hasRedirectedRef = useRef(false);

  useEffect(() => {
    if (loading) return;

    // Not authenticated and not on login page → redirect to login
    if (!user && !isLoginPage) {
      if (!hasRedirectedRef.current) {
        hasRedirectedRef.current = true;
        router.replace('/admin/login');
      }
      return;
    }

    // Mark that we should logout when this component unmounts
    // (leaving the /admin section or page refresh/reload)
    logoutOnUnmountRef.current = !!user;
  }, [user, loading, isLoginPage, router]);

  // Force logout when unmounting (leaving /admin, page refresh, reload, browser/tab close)
  // In-memory persistence means all auth data is lost on page unload anyway,
  // but we explicitly call logout to ensure Firebase state is cleaned up
  useEffect(() => {
    return () => {
      if (logoutOnUnmountRef.current && user) {
        logout().catch(() => {
          // Ignore errors on unmount - auth will be lost anyway on page reload
        });
      }
    };
  }, [user, logout]);

  // Don't render blocking UI - just redirect in background
  return null;
}
