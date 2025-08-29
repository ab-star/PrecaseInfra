import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const SESSION_COOKIE = 'adminSession';
const PAGE_COOKIE = 'adminPage';
const ALLOWED_ADMIN_PAGES = ['/admin/gallery', '/admin/projects', '/admin/gallery-r2', '/admin/projects-r2'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Normalize path to avoid trailing slash mismatches
  const path = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
  const session = req.cookies.get(SESSION_COOKIE)?.value;

  // Allow /admin/login always; clear any lingering session and page lock
  if (path.startsWith('/admin/login')) {
    const res = NextResponse.next();
    if (session) {
      res.cookies.set({ name: SESSION_COOKIE, value: '', path: '/admin', maxAge: 0 });
      res.cookies.set({ name: SESSION_COOKIE, value: '', path: '/', maxAge: 0 });
    }
    res.cookies.set({ name: PAGE_COOKIE, value: '', path: '/admin', maxAge: 0 });
    res.cookies.set({ name: PAGE_COOKIE, value: '', path: '/', maxAge: 0 });
    return res;
  }

  // Only allow the specific admin upload pages when a session exists
  if (ALLOWED_ADMIN_PAGES.includes(path)) {
    if (!session) {
      const url = req.nextUrl.clone();
      url.pathname = '/admin/login';
      url.searchParams.set('next', path);
      return NextResponse.redirect(url);
    }
    const bound = req.cookies.get(PAGE_COOKIE)?.value;
    // First entry after login: bind the session to this specific page
    if (!bound) {
      const res = NextResponse.next();
      res.cookies.set({ name: PAGE_COOKIE, value: path, path: '/admin', sameSite: 'lax' });
      return res;
    }
    // If trying to access a different admin page than the one bound, force re-login
    if (bound !== path) {
      const url = req.nextUrl.clone();
      url.pathname = '/admin/login';
      url.searchParams.set('next', path);
      const res = NextResponse.redirect(url);
  res.cookies.set({ name: SESSION_COOKIE, value: '', path: '/admin', maxAge: 0 });
  res.cookies.set({ name: SESSION_COOKIE, value: '', path: '/', maxAge: 0 });
  res.cookies.set({ name: PAGE_COOKIE, value: '', path: '/admin', maxAge: 0 });
  res.cookies.set({ name: PAGE_COOKIE, value: '', path: '/', maxAge: 0 });
      return res;
    }
    return NextResponse.next();
  }

  // Any other route (including other /admin pages): clear the session so revisiting allowed pages requires login again
  if (session) {
    const res = NextResponse.next();
    res.cookies.set({ name: SESSION_COOKIE, value: '', path: '/admin', maxAge: 0 });
    res.cookies.set({ name: SESSION_COOKIE, value: '', path: '/', maxAge: 0 });
    res.cookies.set({ name: PAGE_COOKIE, value: '', path: '/admin', maxAge: 0 });
    res.cookies.set({ name: PAGE_COOKIE, value: '', path: '/', maxAge: 0 });
    return res;
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    // Apply to all non-asset, non-API routes to clear cookie when leaving /admin
    '/((?!_next|api|.*\\..*).*)',
  ],
};
