import { NextRequest, NextResponse } from 'next/server';
import { uploadToR2 } from '../../../lib/r2';
import { promises as fs } from 'fs';
import path from 'path';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const requiredEnv = ['R2_ACCOUNT_ID','R2_ACCESS_KEY_ID','R2_SECRET_ACCESS_KEY','R2_BUCKET_NAME'];
    const missing = requiredEnv.filter(k => !process.env[k]);
    const formData = await req.formData();
    const file = formData.get('file');
    const prefix = (formData.get('prefix') as string) || 'uploads';
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    const key = `${prefix}/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g,'_')}`;
    if (missing.length === 0) {
      // R2 path
      const url = await uploadToR2(file, key, file.type);
      return NextResponse.json({ key, url, storage: 'r2' });
    }
    // Fallback: write to local /public/uploads (dev only)
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });
    const arrayBuffer = await file.arrayBuffer();
    const filePath = path.join(uploadsDir, key.split('/').pop() || 'file');
    await fs.writeFile(filePath, Buffer.from(arrayBuffer));
    const url = `/uploads/${path.basename(filePath)}`;
    return NextResponse.json({ key, url, storage: 'local', warning: 'R2 not configured; using local public/uploads fallback' });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Upload failed';
    console.error('R2 upload error', e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
