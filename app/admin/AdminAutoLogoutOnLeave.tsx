'use client';

import { useEffect } from 'react';

export default function AdminAutoLogoutOnLeave() {
  useEffect(() => {
    // Do not install logout listeners on the login page to avoid clearing
    // the session right after a successful login navigation.
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin/login')) {
      return;
    }

    let sent = false;
    let armed = false;

  // Arm pagehide after a short delay (longer if arriving from login) to avoid firing immediately post-login
  const fromLogin = typeof document !== 'undefined' && /\/admin\/login\b/.test(document.referrer || '');
  const delay = fromLogin ? 3000 : 1200;
  const armTimer = setTimeout(() => {
      armed = true;
  }, delay);

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

    const onClick = (e: MouseEvent) => {
      // Capture clicks on links that navigate away from /admin
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a) return;
      if (a.target && a.target !== '_self') return; // new tab or other targets
      try {
        const url = new URL(a.href, window.location.href);
        if (url.origin === window.location.origin) {
          // Leaving admin section OR explicitly going to /admin/login should log out
          if (!url.pathname.startsWith('/admin') || url.pathname.startsWith('/admin/login')) {
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

    const onPopState = () => {
      // Back/forward navigation that results in leaving admin should log out.
      if (!armed) return;
      const p = window.location.pathname;
      if (!p.startsWith('/admin') || p.startsWith('/admin/login')) {
        send();
      }
    };

    document.addEventListener('click', onClick, { capture: true });
    window.addEventListener('popstate', onPopState);
    return () => {
      clearTimeout(armTimer);
      document.removeEventListener('click', onClick, { capture: true } as EventListenerOptions);
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  return null;
}
