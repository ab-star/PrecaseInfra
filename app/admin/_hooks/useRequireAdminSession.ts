'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Verifies the httpOnly admin session cookie via API on each mount.
// If missing/invalid, redirects to /admin/login with ?next= current path.
export function useRequireAdminSession() {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    const check = async () => {
      try {
        const res = await fetch('/api/admin-session', {
          method: 'GET',
          cache: 'no-store',
          credentials: 'include',
        });
        if (res.ok) return true;
      } catch {}
      return false;
    };

    (async () => {
      const ok = await check();
      if (ok || cancelled) return;
      // brief retry to avoid race with cookie write
      await new Promise(r => setTimeout(r, 200));
      const ok2 = await check();
      if (!ok2 && !cancelled) {
        const next = encodeURIComponent(window.location.pathname);
        router.replace(`/admin/login?next=${next}`);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);
}
