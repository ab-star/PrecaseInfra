import { NextRequest, NextResponse } from 'next/server';
export const runtime = 'edge';
import { validateUser } from '../../../lib/auth';

export async function POST(req: NextRequest) {
  try {
  const { email, password, next } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }
    const user = await validateUser(email, password);
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  const res = NextResponse.json({ user: { email: user.email } });
    // Set a short-lived session cookie (ephemeral). Extend/secure as needed.
    res.cookies.set({
      name: 'adminSession',
      value: '1',
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60, // 1 hour
      sameSite: 'lax',
    });
    // If a next path points to an allowed admin page, bind it immediately.
    if (typeof next === 'string' && next.startsWith('/admin/')) {
      // Normalize trailing slash for consistency with middleware
      const bound = next.endsWith('/') ? next.slice(0, -1) : next;
      res.cookies.set({ name: 'adminPage', value: bound, path: '/admin', sameSite: 'lax' });
    }
  res.headers.set('Cache-Control', 'private, no-store, no-cache, must-revalidate');
  res.headers.set('Pragma', 'no-cache');
  res.headers.set('Vary', 'Cookie');
    return res;
  } catch (e) {
    console.error('Login API error', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
