import { NextRequest, NextResponse } from 'next/server';

// Edge runtime
export const runtime = 'edge';

// For security, in production move signing server-side using proper HMAC (currently minimal)
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const prefix = (formData.get('prefix') as string) || 'uploads';
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    const key = `${prefix}/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g,'_')}`;
    const publicBase = (process.env.R2_PUBLIC_BASE_URL || '').replace(/\/$/, '');
    // This simplified edge handler does not stream to R2 directly (needs R2 binding in Pages project for full impl)
    // Placeholder until R2 binding is configured: reject so client can fallback or implement direct upload strategy.
    return NextResponse.json({ error: 'Direct R2 edge upload not yet configured (needs R2 binding)' }, { status: 501, headers: { 'X-Upload-Key': key, 'X-R2-Public-Base': publicBase } });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Upload failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
