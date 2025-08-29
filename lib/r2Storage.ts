// Cloudflare R2 configuration and utilities
import AWS from 'aws-sdk';

// Configuration is read from environment variables. Do NOT hard-code secrets.
// These vars are used only by legacy AWS-SDK based flows (admin/gallery-r2, projects-r2).
// Preferred production path uses the Edge binding via /api/r2-upload.
const R2_CONFIG = {
  accountId: process.env.R2_ACCOUNT_ID || '',
  accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  bucketName: process.env.R2_BUCKET_NAME || 'site01',
  region: process.env.R2_REGION || 'auto',
  publicBaseUrl: process.env.R2_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_R2_BASE || '',
};

// Lazily create an AWS S3 client for R2 when required.
function createS3Client() {
  if (!R2_CONFIG.accountId || !R2_CONFIG.accessKeyId || !R2_CONFIG.secretAccessKey) {
    throw new Error(
      'Missing R2 env vars. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY (and R2_BUCKET_NAME).'
    );
  }
  return new AWS.S3({
    endpoint: `https://${R2_CONFIG.accountId}.r2.cloudflarestorage.com`,
    accessKeyId: R2_CONFIG.accessKeyId,
    secretAccessKey: R2_CONFIG.secretAccessKey,
    region: R2_CONFIG.region,
    signatureVersion: 'v4',
    s3ForcePathStyle: false,
  });
}

export interface UploadResult {
  url: string;
  key: string;
  success: boolean;
}

export interface ImageMetadata {
  title: string;
  description?: string;
  category?: string;
  featured?: boolean;
}

export interface ProjectData {
  title: string;
  description: string;
  category: string;
  location?: string;
  client?: string;
  startDate?: string;
  endDate?: string;
  status: 'Planning' | 'In Progress' | 'Completed' | 'On Hold';
  features: string[];
  budget?: number;
}

// Test R2 connection
export const testR2Connection = async (): Promise<boolean> => {
  try {
  const s3 = createS3Client();
  await s3.headBucket({ Bucket: R2_CONFIG.bucketName }).promise();
    console.log('✓ R2 connection successful');
    return true;
  } catch (error) {
    console.error('R2 connection failed:', error);
    console.warn('⚠️ R2 API credentials may need to be updated. Running in demo mode.');
    return false;
  }
};

// Upload single image to R2
export const uploadImageToR2 = async (
  file: File,
  folder: 'gallery' | 'projects' = 'gallery'
): Promise<UploadResult> => {
  try {
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const key = `${folder}/${fileName}`;

  const uploadParams = {
      Bucket: R2_CONFIG.bucketName,
      Key: key,
      Body: file,
      ContentType: file.type,
      CacheControl: 'max-age=31536000',
    };

  const s3 = createS3Client();
  await s3.upload(uploadParams).promise();
    
    // Generate public URL - bucket name already included in base URL
  const base = (R2_CONFIG.publicBaseUrl || '').replace(/\/$/, '');
  const publicUrl = base ? `${base}/${key}` : key;

    return {
      url: publicUrl,
      key: key,
      success: true,
    };
  } catch (error) {
    console.error('Error uploading to R2:', error);
    
    if (error && typeof error === 'object') {
      const awsError = error as { code?: string; message?: string };
      
      if (awsError.code === 'AccessDenied') {
        console.warn('🔐 Access denied. API credentials may need to be updated.');
        throw new Error('R2 Access denied. Please check your API token permissions in Cloudflare dashboard.');
      } else if (awsError.code === 'NoSuchBucket') {
        throw new Error(`Bucket '${R2_CONFIG.bucketName}' does not exist. Please create it in your R2 dashboard.`);
      } else if (awsError.code === 'InvalidAccessKeyId') {
        throw new Error('Invalid access key. Please check your R2 API token.');
      } else if (awsError.code === 'SignatureDoesNotMatch') {
        throw new Error('Invalid secret key. Please check your R2 API token.');
      }
    }
    
    throw new Error(`Failed to upload file: ${error}`);
  }
};

// Upload multiple images to R2
export const uploadMultipleImagesToR2 = async (
  files: File[],
  folder: 'gallery' | 'projects' = 'gallery'
): Promise<UploadResult[]> => {
  try {
    const uploadPromises = files.map(file => uploadImageToR2(file, folder));
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error('Error uploading multiple files to R2:', error);
    throw error;
  }
};

// Delete image from R2
export const deleteImageFromR2 = async (key: string): Promise<boolean> => {
  try {
  const s3 = createS3Client();
  await s3.deleteObject({
      Bucket: R2_CONFIG.bucketName,
      Key: key,
    }).promise();
    
    return true;
  } catch (error) {
    console.error('Error deleting from R2:', error);
    return false;
  }
};

// Export configuration for reference
export const getR2Config = () => ({
  bucketName: R2_CONFIG.bucketName,
  accountId: R2_CONFIG.accountId,
  endpoint: `https://${R2_CONFIG.accountId}.r2.cloudflarestorage.com`,
  publicBaseUrl: R2_CONFIG.publicBaseUrl,
});
