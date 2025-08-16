// Simple test to check if the bucket 'site01' exists in your R2 account
const AWS = require('aws-sdk');

const R2_CONFIG = {
  accountId: 'b6e076d05a6dc18b42b30ad6fccda560',
  accessKeyId: 'd9168e92e60ec834d0f1416c4fb898ea',
  secretAccessKey: 'a8f3040cdb0ceaad3bbee870d63f526efca7ed241794541dca4c83597a62f7ea',
  bucketName: 'site01',
  region: 'auto',
};

const s3Client = new AWS.S3({
  endpoint: `https://${R2_CONFIG.accountId}.r2.cloudflarestorage.com`,
  accessKeyId: R2_CONFIG.accessKeyId,
  secretAccessKey: R2_CONFIG.secretAccessKey,
  region: R2_CONFIG.region,
  signatureVersion: 'v4',
});

async function checkAndCreateBucket() {
  console.log('🔍 Checking if bucket exists...');
  console.log(`Bucket: ${R2_CONFIG.bucketName}`);
  console.log(`Account: ${R2_CONFIG.accountId}`);
  
  try {
    // Try to access the bucket
    await s3Client.headBucket({ Bucket: R2_CONFIG.bucketName }).promise();
    console.log('✅ Bucket exists and is accessible!');
    return true;
  } catch (error) {
    console.log('❌ Bucket check failed:', error.code);
    
    if (error.code === 'NotFound' || error.code === 'NoSuchBucket') {
      console.log('🔧 Trying to create bucket...');
      
      try {
        await s3Client.createBucket({ 
          Bucket: R2_CONFIG.bucketName 
        }).promise();
        console.log('✅ Bucket created successfully!');
        return true;
      } catch (createError) {
        console.log('❌ Failed to create bucket:', createError.code, createError.message);
        console.log('\n📋 Manual steps required:');
        console.log('1. Go to Cloudflare Dashboard > R2 Object Storage');
        console.log(`2. Create a bucket named: ${R2_CONFIG.bucketName}`);
        console.log('3. Make sure your API token has R2 permissions');
        return false;
      }
    } else {
      console.log('❌ Access error:', error.message);
      console.log('\n📋 Possible issues:');
      console.log('1. Check your API credentials');
      console.log('2. Verify R2 token permissions');
      console.log('3. Make sure R2 is enabled in your Cloudflare account');
      return false;
    }
  }
}

async function testUpload() {
  console.log('\n🧪 Testing upload functionality...');
  
  try {
    const testContent = 'Hello from R2 test!';
    const testKey = `test/upload-test-${Date.now()}.txt`;
    
    await s3Client.putObject({
      Bucket: R2_CONFIG.bucketName,
      Key: testKey,
      Body: testContent,
      ContentType: 'text/plain'
    }).promise();
    
    console.log('✅ Upload test successful!');
    
    // Clean up test file
    await s3Client.deleteObject({
      Bucket: R2_CONFIG.bucketName,
      Key: testKey
    }).promise();
    
    console.log('✅ Cleanup successful!');
    return true;
  } catch (error) {
    console.log('❌ Upload test failed:', error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 R2 Storage Setup Test\n');
  
  const bucketReady = await checkAndCreateBucket();
  
  if (bucketReady) {
    const uploadWorks = await testUpload();
    
    if (uploadWorks) {
      console.log('\n🎉 All tests passed! Your R2 setup is working correctly.');
      console.log('\n📱 You can now use the admin interface:');
      console.log('1. Start the dev server: npm run dev');
      console.log('2. Go to: http://localhost:3000/admin/gallery');
      console.log('3. Login with: admin@infrastire.com / admin123');
      console.log('4. Upload images - they will be stored in R2!');
    } else {
      console.log('\n⚠️  Bucket exists but uploads are not working.');
    }
  } else {
    console.log('\n⚠️  Please create the bucket manually and try again.');
  }
}

main().catch(console.error);
