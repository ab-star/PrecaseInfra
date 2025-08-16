// Cloudflare R2 configuration and utilities
import AWS from 'aws-sdk';

// Important: You need to create a bucket named 'site01' in your Cloudflare R2 dashboard
// OR change the bucketName below to match an existing bucket

// Cloudflare R2 configuration
const R2_CONFIG = {
  accountId: 'b6e076d05a6dc18b42b30ad6fccda560',
  accessKeyId: 'df424608a779b129c967a770fbe97d7f',
  secretAccessKey: '752aa64b2958802af432596aeeef27ea4e496d3ed826e994825a9c1e1bdadc09',
  bucketName: 'site01', // IMPORTANT: Create this bucket in your R2 dashboard first!
  region: 'auto',
  publicBaseUrl: 'https://site01.pub-ff6f7349f0ca4f698e9006f92b5c1c8a.r2.dev', // Your specific R2 public base URL with bucket
};

// Configure AWS SDK for Cloudflare R2
const s3Client = new AWS.S3({
  endpoint: `https://${R2_CONFIG.accountId}.r2.cloudflarestorage.com`, // Correct API endpoint
  accessKeyId: R2_CONFIG.accessKeyId,
  secretAccessKey: R2_CONFIG.secretAccessKey,
  region: R2_CONFIG.region,
  signatureVersion: 'v4',
  s3ForcePathStyle: false,
});

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
    await s3Client.headBucket({ Bucket: R2_CONFIG.bucketName }).promise();
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

    await s3Client.upload(uploadParams).promise();
    
    // Generate public URL - bucket name already included in base URL
    const publicUrl = `${R2_CONFIG.publicBaseUrl}/${key}`;

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
    await s3Client.deleteObject({
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
