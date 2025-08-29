import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

// Edge-only runtime: use Cloudflare R2 bindings (no Node/AWS SDK)
export const runtime = 'edge';

// Minimal type for an R2 bucket binding (sufficient for .put)
type CfR2Bucket = {
  put: (
    key: string,
    value: ArrayBuffer | ReadableStream | Blob | string,
    options?: {
      httpMetadata?: { contentType?: string } | Headers;
      customMetadata?: Record<string, string>;
    }
  ) => Promise<unknown>;
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const prefix = (formData.get('prefix') as string) || 'uploads';
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const key = `${prefix}/${Date.now()}_${safeName}`;
    // Use Cloudflare binding
    const env = getRequestContext().env as Record<string, unknown> | undefined;
    const r2 = (env?.['R2_BUCKET'] || env?.['R2']) as CfR2Bucket | undefined;
    if (!r2 || typeof r2.put !== 'function') {
      return NextResponse.json(
        {
          error: 'R2 binding missing',
          hint:
            'Bind an R2 bucket as R2_BUCKET (or R2) in Cloudflare Pages project settings and functions config.',
        },
        { status: 501 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    await r2.put(key, arrayBuffer, {
      httpMetadata: { contentType: file.type || 'application/octet-stream' },
      customMetadata: { uploadedBy: 'api' },
    });

    const publicBase = `${
      (env?.['R2_PUBLIC_BASE_URL'] as string) ||
      (env?.['NEXT_PUBLIC_R2_BASE'] as string) ||
      (process.env.NEXT_PUBLIC_R2_BASE as string | undefined) ||
      (process.env.R2_PUBLIC_BASE_URL as string | undefined) ||
      ''
    }`.replace(/\/$/, '');
    const url = publicBase ? `${publicBase}/${key}` : key;
    return NextResponse.json({ key, url, runtime: 'edge' });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Upload failed';
    // Log server-side for debugging during development
    console.error('[r2-upload] POST error:', e);
    const body: Record<string, unknown> = { error: msg };
    if (process.env.NODE_ENV !== 'production') {
      body.details = {
        hasCfBinding: (() => {
          try {
            const env = getRequestContext().env as Record<string, unknown> | undefined;
            return !!(env?.['R2_BUCKET'] || env?.['R2']);
          } catch {
            return false;
          }
        })(),
        hasPublicBase: !!(
          (process.env.NEXT_PUBLIC_R2_BASE || process.env.R2_PUBLIC_BASE_URL) ||
          (() => {
            try {
              const env = getRequestContext().env as Record<string, unknown> | undefined;
              return env?.['R2_PUBLIC_BASE_URL'] || env?.['NEXT_PUBLIC_R2_BASE'];
            } catch {
              return undefined;
            }
          })()
        ),
      };
    }
    return NextResponse.json(body, { status: 500 });
  }
}

export async function GET() {
  // Readiness probe: returns safe booleans to help diagnose config in dev
  try {
    const isProd = process.env.NODE_ENV === 'production';
    const env = getRequestContext().env as Record<string, unknown> | undefined;
    const payload = {
      runtime: 'edge',
      nodeEnv: process.env.NODE_ENV,
      ready: !!(env?.['R2_BUCKET'] || env?.['R2']),
      hasBinding: !!(env?.['R2_BUCKET'] || env?.['R2']),
      hasPublicBase: !!(env?.['R2_PUBLIC_BASE_URL'] || env?.['NEXT_PUBLIC_R2_BASE'] || process.env.NEXT_PUBLIC_R2_BASE || process.env.R2_PUBLIC_BASE_URL),
    };
    // In production, only return minimal status
    return NextResponse.json(isProd ? { runtime: 'edge', ready: payload.ready } : payload);
  } catch (e) {
    console.error('[r2-upload] GET error:', e);
    return NextResponse.json({ runtime: 'edge', ready: false }, { status: 500 });
  }
}
