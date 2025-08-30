'use client';

import { useEffect } from 'react';

// If NEXT_PUBLIC_ADMIN_HOST is set (e.g., https://site01-fe.pages.dev),
// and the current host differs, redirect to that host preserving path/query.
export default function AdminHostGate() {
  useEffect(() => {
    const target = process.env.NEXT_PUBLIC_ADMIN_HOST?.trim();
    if (!target) return;
    try {
      const t = new URL(target);
      if (t.host && window.location.host !== t.host) {
        const href = `${t.origin}${window.location.pathname}${window.location.search}${window.location.hash}`;
        window.location.replace(href);
      }
    } catch {
      // ignore invalid URL
    }
  }, []);
  return null;
}
