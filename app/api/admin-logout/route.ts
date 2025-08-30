import { NextResponse } from 'next/server';
export const runtime = 'edge';

export async function POST() {
  const res = NextResponse.json({ ok: true });
  // Clear both path scopes in case the cookie was set at '/'
  res.cookies.set({ name: 'adminSession', value: '', path: '/admin', maxAge: 0 });
  res.cookies.set({ name: 'adminSession', value: '', path: '/', maxAge: 0 });
  // Clear page-binding too
  res.cookies.set({ name: 'adminPage', value: '', path: '/admin', maxAge: 0 });
  res.cookies.set({ name: 'adminPage', value: '', path: '/', maxAge: 0 });
  res.headers.set('Cache-Control', 'private, no-store, no-cache, must-revalidate');
  res.headers.set('Pragma', 'no-cache');
  res.headers.set('Vary', 'Cookie');
  return res;
}
