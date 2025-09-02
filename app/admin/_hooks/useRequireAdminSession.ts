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
      // backoff retries to avoid race with cookie write
      const delays = [150, 300, 600];
      for (const d of delays) {
        await new Promise(r => setTimeout(r, d));
        const again = await check();
        if (again || cancelled) return;
      }
      if (!cancelled) {
        const next = encodeURIComponent(window.location.pathname);
        router.replace(`/admin/login?next=${next}`);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);
}
