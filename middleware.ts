import { NextRequest, NextResponse } from 'next/server';

// Basic cookie name for admin session
const SESSION_COOKIE = 'adminSession';
const PUBLIC_ADMIN_PATHS = ['/admin/login'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith('/admin')) {
    const isPublic = PUBLIC_ADMIN_PATHS.some(p => pathname === p || pathname.startsWith(p + '/'));
    const hasSession = req.cookies.get(SESSION_COOKIE)?.value;
    if (!isPublic && !hasSession) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = '/admin/login';
      loginUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (pathname === '/admin/login' && hasSession) {
      const res = NextResponse.next();
      res.cookies.delete(SESSION_COOKIE);
      return res;
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ['/admin/:path*'] };
