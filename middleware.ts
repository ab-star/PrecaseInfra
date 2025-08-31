import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const SESSION_COOKIE = 'adminSession';
const PAGE_COOKIE = 'adminPage';
const ALLOWED_ADMIN_PAGES = ['/admin/gallery', '/admin/projects', '/admin/gallery-r2', '/admin/projects-r2', '/admin/contacts'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Normalize path to avoid trailing slash mismatches
  const path = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
  // Optionally enforce a canonical host for admin routes to keep URL stable across deployments
  const ADMIN_HOST = process.env.NEXT_PUBLIC_ADMIN_HOST || process.env.ADMIN_HOST;
  const ENFORCE_HOST = (process.env.ADMIN_ENFORCE_HOST || '').toLowerCase() === '1' || (process.env.ADMIN_ENFORCE_HOST || '').toLowerCase() === 'true';
  if (ADMIN_HOST && ENFORCE_HOST && path.startsWith('/admin')) {
    try {
      const target = new URL(ADMIN_HOST);
      if (target.host && req.nextUrl.host !== target.host) {
        const redirectURL = new URL(req.nextUrl.href);
        redirectURL.host = target.host;
        redirectURL.protocol = target.protocol;
        const res = NextResponse.redirect(redirectURL, 308);
        res.headers.set('Cache-Control', 'private, no-store, no-cache, must-revalidate');
        res.headers.set('Pragma', 'no-cache');
        res.headers.set('Vary', 'Cookie');
        return res;
      }
    } catch {
      // ignore invalid ADMIN_HOST
    }
  }
  const session = req.cookies.get(SESSION_COOKIE)?.value;
  const mode = (req.headers.get('sec-fetch-mode') || '').toLowerCase();
  const dest = (req.headers.get('sec-fetch-dest') || '').toLowerCase();
  const purpose = (req.headers.get('purpose') || req.headers.get('sec-purpose') || '').toLowerCase();
  const isNavDoc = mode === 'navigate' && dest === 'document';
  const isPrefetch = purpose === 'prefetch';
  // Note: we no longer use referer-based clearing to avoid accidental logout on soft navigations

  // Allow /admin/login always; clear session/page lock only on real navigations (avoid prefetch-triggered logout)
  if (path.startsWith('/admin/login')) {
    const res = NextResponse.next();
    // Only clear cookies when the user explicitly navigates to the login page
    if (isNavDoc && !isPrefetch) {
      if (session) {
        res.cookies.set({ name: SESSION_COOKIE, value: '', path: '/admin', maxAge: 0 });
        res.cookies.set({ name: SESSION_COOKIE, value: '', path: '/', maxAge: 0 });
      }
      res.cookies.set({ name: PAGE_COOKIE, value: '', path: '/admin', maxAge: 0 });
      res.cookies.set({ name: PAGE_COOKIE, value: '', path: '/', maxAge: 0 });
    }
    res.headers.set('Cache-Control', 'private, no-store, no-cache, must-revalidate');
    res.headers.set('Pragma', 'no-cache');
    res.headers.set('Vary', 'Cookie');
    return res;
  }

  // Only allow the specific admin pages when a session exists
  if (ALLOWED_ADMIN_PAGES.includes(path)) {
    if (!session) {
      const url = req.nextUrl.clone();
      url.pathname = '/admin/login';
      url.searchParams.set('next', path);
      const res = NextResponse.redirect(url);
      res.headers.set('Cache-Control', 'private, no-store, no-cache, must-revalidate');
      res.headers.set('Pragma', 'no-cache');
      res.headers.set('Vary', 'Cookie');
      return res;
    }
  // We previously "bound" a session to a single admin page to harden on Cloudflare.
  // To allow navigation across allowed admin pages without re-login, we now just memo the last page but don't enforce it.
  const res = NextResponse.next();
  res.cookies.set({ name: PAGE_COOKIE, value: path, path: '/admin', sameSite: 'lax' });
  res.headers.set('Cache-Control', 'private, no-store, no-cache, must-revalidate');
  res.headers.set('Pragma', 'no-cache');
  res.headers.set('Vary', 'Cookie');
  return res;
  }

  // Any other route (including other /admin pages): clear the session only on real document navigations
  // This prevents prefetch or data requests from logging users out unexpectedly.
  const leavingAdmin = !path.startsWith('/admin') || !ALLOWED_ADMIN_PAGES.includes(path) || path.startsWith('/admin/login');
  if (session && isNavDoc && !isPrefetch && leavingAdmin) {
    const res = NextResponse.next();
    res.cookies.set({ name: SESSION_COOKIE, value: '', path: '/admin', maxAge: 0 });
    res.cookies.set({ name: SESSION_COOKIE, value: '', path: '/', maxAge: 0 });
    res.cookies.set({ name: PAGE_COOKIE, value: '', path: '/admin', maxAge: 0 });
    res.cookies.set({ name: PAGE_COOKIE, value: '', path: '/', maxAge: 0 });
    res.headers.set('Cache-Control', 'private, no-store, no-cache, must-revalidate');
    res.headers.set('Pragma', 'no-cache');
    res.headers.set('Vary', 'Cookie');
    return res;
  }
  const res = NextResponse.next();
  res.headers.set('Cache-Control', 'private, no-store, no-cache, must-revalidate');
  res.headers.set('Pragma', 'no-cache');
  res.headers.set('Vary', 'Cookie');
  return res;
}

export const config = {
  matcher: [
    '/admin/:path*',
    // Apply to all non-asset, non-API routes to clear cookie when leaving /admin
    '/((?!_next|api|.*\\..*).*)',
  ],
};
