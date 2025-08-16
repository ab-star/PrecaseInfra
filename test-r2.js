// Test script to verify Cloudflare R2 connection
// Run this with: node test-r2.js

const AWS = require('aws-sdk');

// Cloudflare R2 configuration
const R2_CONFIG = {
  accountId: 'b6e076d05a6dc18b42b30ad6fccda560',
  accessKeyId: 'd9168e92e60ec834d0f1416c4fb898ea',
  secretAccessKey: 'a8f3040cdb0ceaad3bbee870d63f526efca7ed241794541dca4c83597a62f7ea',
  bucketName: 'infrastire-gallery',
  region: 'auto',
};

// Configure AWS SDK for Cloudflare R2
const s3Client = new AWS.S3({
  endpoint: `https://${R2_CONFIG.accountId}.r2.cloudflarestorage.com`,
  accessKeyId: R2_CONFIG.accessKeyId,
  secretAccessKey: R2_CONFIG.secretAccessKey,
  region: R2_CONFIG.region,
  signatureVersion: 'v4',
});

async function testR2Connection() {
  console.log('Testing Cloudflare R2 connection...');
  console.log('Account ID:', R2_CONFIG.accountId);
  console.log('Bucket:', R2_CONFIG.bucketName);
  console.log('Endpoint:', `https://${R2_CONFIG.accountId}.r2.cloudflarestorage.com`);
  
  try {
    // Test 1: List buckets
    console.log('\n1. Testing bucket access...');
    const buckets = await s3Client.listBuckets().promise();
    console.log('✅ Successfully connected to R2');
    console.log('Available buckets:', buckets.Buckets.map(b => b.Name));
    
    // Test 2: Check if our bucket exists
    const bucketExists = buckets.Buckets.some(b => b.Name === R2_CONFIG.bucketName);
    if (bucketExists) {
      console.log(`✅ Bucket "${R2_CONFIG.bucketName}" exists`);
    } else {
      console.log(`⚠️  Bucket "${R2_CONFIG.bucketName}" not found`);
      console.log('Available buckets:', buckets.Buckets.map(b => b.Name).join(', '));
      
      // Try to create the bucket
      console.log('\n2. Attempting to create bucket...');
      try {
        await s3Client.createBucket({ Bucket: R2_CONFIG.bucketName }).promise();
        console.log(`✅ Successfully created bucket "${R2_CONFIG.bucketName}"`);
      } catch (createError) {
        console.log('❌ Failed to create bucket:', createError.message);
      }
    }
    
    // Test 3: List objects in the bucket
    console.log('\n3. Testing bucket contents...');
    try {
      const objects = await s3Client.listObjectsV2({ Bucket: R2_CONFIG.bucketName }).promise();
      console.log(`✅ Successfully accessed bucket contents`);
      console.log(`Objects in bucket: ${objects.Contents ? objects.Contents.length : 0}`);
      
      if (objects.Contents && objects.Contents.length > 0) {
        console.log('Recent objects:');
        objects.Contents.slice(0, 5).forEach(obj => {
          console.log(`  - ${obj.Key} (${obj.Size} bytes, ${obj.LastModified})`);
        });
      }
    } catch (listError) {
      console.log('⚠️  Could not list bucket contents:', listError.message);
    }
    
  } catch (error) {
    console.log('❌ R2 connection failed:', error.message);
    console.log('Error details:', error);
    
    if (error.code === 'InvalidAccessKeyId') {
      console.log('\n💡 Tips:');
      console.log('- Check that your Access Key ID is correct');
      console.log('- Ensure the token has not expired');
    } else if (error.code === 'SignatureDoesNotMatch') {
      console.log('\n💡 Tips:');
      console.log('- Check that your Secret Access Key is correct');
      console.log('- Ensure there are no extra spaces in the credentials');
    } else if (error.code === 'InvalidToken') {
      console.log('\n💡 Tips:');
      console.log('- The API token may have expired');
      console.log('- Generate a new token from Cloudflare R2 dashboard');
    }
  }
}

// Generate a test upload URL
function generateTestUploadUrl() {
  const fileName = `test_${Date.now()}.txt`;
  const key = `gallery/${fileName}`;
  
  const params = {
    Bucket: R2_CONFIG.bucketName,
    Key: key,
    Expires: 60 * 5, // 5 minutes
    ContentType: 'text/plain',
  };
  
  try {
    const url = s3Client.getSignedUrl('putObject', params);
    console.log('\n4. Generated test upload URL:');
    console.log('URL:', url);
    console.log('You can test this URL with curl:');
    console.log(`curl -X PUT "${url}" -H "Content-Type: text/plain" -d "Hello from R2 test"`);
  } catch (error) {
    console.log('❌ Failed to generate upload URL:', error.message);
  }
}

async function main() {
  await testR2Connection();
  generateTestUploadUrl();
  
  console.log('\n📋 Summary:');
  console.log('- If the connection test passed, your R2 credentials are working');
  console.log('- The gallery and projects upload should work correctly');
  console.log('- You can now use the admin interface at http://localhost:3000/admin/gallery-r2');
  console.log('- Demo credentials: admin@infrastire.com / admin123');
}

main().catch(console.error);
