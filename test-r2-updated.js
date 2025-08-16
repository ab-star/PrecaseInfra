// Test the updated R2 configuration with your specific base URL
const AWS = require('aws-sdk');

const R2_CONFIG = {
  accountId: 'b6e076d05a6dc18b42b30ad6fccda560',
  accessKeyId: 'd9168e92e60ec834d0f1416c4fb898ea',
  secretAccessKey: 'a8f3040cdb0ceaad3bbee870d63f526efca7ed241794541dca4c83597a62f7ea',
  bucketName: 'site01',
  region: 'auto',
  publicBaseUrl: 'https://pub-ff6f7349f0ca4f698e9006f92b5c1c8a.r2.dev',
};

const s3Client = new AWS.S3({
  endpoint: `https://${R2_CONFIG.accountId}.r2.cloudflarestorage.com`,
  accessKeyId: R2_CONFIG.accessKeyId,
  secretAccessKey: R2_CONFIG.secretAccessKey,
  region: R2_CONFIG.region,
  signatureVersion: 'v4',
  s3ForcePathStyle: false,
});

async function testUpdatedConfig() {
  console.log('🧪 Testing updated R2 configuration...');
  console.log(`✓ Bucket: ${R2_CONFIG.bucketName}`);
  console.log(`✓ Public Base URL: ${R2_CONFIG.publicBaseUrl}`);
  
  try {
    // Test upload with new URL generation
    const testKey = `test/url-test-${Date.now()}.txt`;
    const testContent = 'Testing updated R2 URL configuration';
    
    console.log('\n📤 Uploading test file...');
    await s3Client.putObject({
      Bucket: R2_CONFIG.bucketName,
      Key: testKey,
      Body: testContent,
      ContentType: 'text/plain'
    }).promise();
    
    // Generate the public URL using the new base URL
    const publicUrl = `${R2_CONFIG.publicBaseUrl}/${testKey}`;
    console.log('✅ Upload successful!');
    console.log(`✅ Public URL: ${publicUrl}`);
    
    // Clean up
    await s3Client.deleteObject({
      Bucket: R2_CONFIG.bucketName,
      Key: testKey
    }).promise();
    
    console.log('✅ Cleanup successful!');
    
    console.log('\n🎉 Configuration updated successfully!');
    console.log('\n📋 Summary:');
    console.log(`- Files will be uploaded to: ${R2_CONFIG.bucketName} bucket`);
    console.log(`- Public URLs will use: ${R2_CONFIG.publicBaseUrl}`);
    console.log('- Gallery images: /gallery/[filename]');
    console.log('- Project images: /projects/[filename]');
    
    console.log('\n🚀 Ready to use! Start the admin interface:');
    console.log('1. npm run dev');
    console.log('2. http://localhost:3000/admin/login');
    console.log('3. Login: admin@infrastire.com / admin123');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testUpdatedConfig();
