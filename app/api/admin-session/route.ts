import { NextResponse } from 'next/server';
export const runtime = 'edge';

export async function GET(request: Request) {
  // In Edge runtime, cookies are available via headers
  const cookie = request.headers.get('cookie') || '';
  const has = /(?:^|;\s*)adminSession=/.test(cookie);
  if (!has) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}
