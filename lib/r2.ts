import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const accountId = process.env.R2_ACCOUNT_ID!;
const accessKeyId = process.env.R2_ACCESS_KEY_ID!;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY!;
const bucket = process.env.R2_BUCKET_NAME || 'site01';
const publicBase = process.env.R2_PUBLIC_BASE_URL || '';

export const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId, secretAccessKey },
});

export async function uploadToR2(file: File | Blob, key: string, contentType?: string): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  await r2Client.send(new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: Buffer.from(arrayBuffer),
    ContentType: contentType || (file instanceof File ? file.type : undefined),
  }));
  if (!publicBase) return key;
  return `${publicBase.replace(/\/$/, '')}/${encodeURIComponent(key)}`;
}

export async function deleteFromR2(key: string): Promise<void> {
  await r2Client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
}

export function r2PublicUrl(key: string): string {
  if (!publicBase) return key;
  return `${publicBase.replace(/\/$/, '')}/${encodeURIComponent(key)}`;
}

export interface R2UploadResult { key: string; url: string; }
