import { NextResponse } from 'next/server';
export const runtime = 'edge';

export async function GET(request: Request) {
  // In Edge runtime, cookies are available via headers
  const cookie = request.headers.get('cookie') || '';
  const has = /(?:^|;\s*)adminSession=/.test(cookie);
  const res = NextResponse.json({ ok: !!has }, { status: has ? 200 : 401 });
  res.headers.set('Cache-Control', 'private, no-store, no-cache, must-revalidate');
  res.headers.set('Pragma', 'no-cache');
  res.headers.set('Vary', 'Cookie');
  return res;
}
