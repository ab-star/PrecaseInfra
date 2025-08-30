'use client';

import { useEffect } from 'react';

export default function AdminAutoLogoutOnLeave() {
  useEffect(() => {
    let sent = false;

    const send = () => {
      if (sent) return;
      sent = true;
      try {
        const blob = new Blob([JSON.stringify({})], { type: 'application/json' });
        if (!navigator.sendBeacon || !navigator.sendBeacon('/api/admin-logout', blob)) {
          // Fallback: fire-and-forget fetch
          fetch('/api/admin-logout', { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' }, body: '{}' }).catch(() => {});
        }
      } catch {
        // ignore
      }
    };

    const onPageHide = () => send();
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') send();
    };
    const onClick = (e: MouseEvent) => {
      // Capture clicks on links that navigate away from /admin
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a) return;
      if (a.target && a.target !== '_self') return; // new tab or other targets
      try {
        const url = new URL(a.href, window.location.href);
        if (url.origin === window.location.origin) {
          if (!url.pathname.startsWith('/admin')) {
            send();
          }
        } else {
          // Leaving origin entirely
          send();
        }
      } catch {
        // if parsing fails, attempt to send anyway
        send();
      }
    };

    window.addEventListener('pagehide', onPageHide);
    document.addEventListener('visibilitychange', onVisibility);
    document.addEventListener('click', onClick, { capture: true });
    return () => {
      window.removeEventListener('pagehide', onPageHide);
      document.removeEventListener('visibilitychange', onVisibility);
      document.removeEventListener('click', onClick, { capture: true } as EventListenerOptions);
    };
  }, []);

  return null;
}
