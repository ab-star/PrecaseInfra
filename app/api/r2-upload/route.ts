import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Use Node runtime to access AWS SDK in server context
export const runtime = 'nodejs';

function getR2Client() {
  const accessKeyId = process.env.R2_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY;
  const accountId = process.env.R2_ACCOUNT_ID;
  const customEndpoint = process.env.R2_ENDPOINT; // e.g., https://<accountid>.r2.cloudflarestorage.com or custom domain
  if (!accessKeyId || !secretAccessKey) {
    throw new Error('Missing R2 credentials (R2_ACCESS_KEY_ID/R2_SECRET_ACCESS_KEY)');
  }
  const endpoint = customEndpoint || (accountId ? `https://${accountId}.r2.cloudflarestorage.com` : undefined);
  return new S3Client({
    region: 'auto',
    endpoint,
    credentials: { accessKeyId, secretAccessKey },
    forcePathStyle: true,
  });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const prefix = (formData.get('prefix') as string) || 'uploads';
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bucket = process.env.R2_BUCKET || process.env.R2_BUCKET_NAME;
    if (!bucket) {
      return NextResponse.json({ error: 'Missing R2_BUCKET/R2_BUCKET_NAME env' }, { status: 500 });
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const key = `${prefix}/${Date.now()}_${safeName}`;
    const arrayBuffer = await file.arrayBuffer();
    const body = Buffer.from(arrayBuffer);

    const client = getR2Client();
    const put = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: file.type || 'application/octet-stream',
      CacheControl: 'public, max-age=31536000, immutable',
    });
  await client.send(put);

    const publicBase = (process.env.NEXT_PUBLIC_R2_BASE || process.env.R2_PUBLIC_BASE_URL || '').replace(/\/$/, '');
    const url = publicBase ? `${publicBase}/${key}` : key;
    return NextResponse.json({ key, url });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Upload failed';
    // Log server-side for debugging during development
    console.error('[r2-upload] POST error:', e);
    const body: Record<string, unknown> = { error: msg };
    if (process.env.NODE_ENV !== 'production') {
      body.details = {
        hasBucket: !!(process.env.R2_BUCKET || process.env.R2_BUCKET_NAME),
        hasAK: !!(process.env.R2_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID),
        hasSK: !!(process.env.R2_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY),
        hasEndpointOrAccount: !!(process.env.R2_ENDPOINT || process.env.R2_ACCOUNT_ID),
        hasPublicBase: !!(process.env.NEXT_PUBLIC_R2_BASE || process.env.R2_PUBLIC_BASE_URL),
      };
    }
    return NextResponse.json(body, { status: 500 });
  }
}

export async function GET() {
  // Readiness probe: returns safe booleans to help diagnose config in dev
  try {
    const isProd = process.env.NODE_ENV === 'production';
    const payload = {
      runtime: 'nodejs',
      nodeEnv: process.env.NODE_ENV,
  ready: !!((process.env.R2_BUCKET || process.env.R2_BUCKET_NAME) && (process.env.R2_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID) && (process.env.R2_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY) && (process.env.R2_ENDPOINT || process.env.R2_ACCOUNT_ID)),
  hasBucket: !!(process.env.R2_BUCKET || process.env.R2_BUCKET_NAME),
      hasAK: !!(process.env.R2_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID),
      hasSK: !!(process.env.R2_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY),
      hasEndpointOrAccount: !!(process.env.R2_ENDPOINT || process.env.R2_ACCOUNT_ID),
      hasPublicBase: !!(process.env.NEXT_PUBLIC_R2_BASE || process.env.R2_PUBLIC_BASE_URL),
    };
    // In production, only return minimal status
    return NextResponse.json(isProd ? { runtime: 'nodejs', ready: payload.ready } : payload);
  } catch (e) {
    console.error('[r2-upload] GET error:', e);
    return NextResponse.json({ runtime: 'nodejs', ready: false }, { status: 500 });
  }
}
