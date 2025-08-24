import { NextRequest, NextResponse } from 'next/server';
export const runtime = 'nodejs';
import { validateUser } from '../../../lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
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
      path: '/admin',
      maxAge: 60 * 60, // 1 hour
      sameSite: 'lax',
    });
    return res;
  } catch (e) {
    console.error('Login API error', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
