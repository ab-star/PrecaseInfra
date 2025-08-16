// Comprehensive R2 connection test
const AWS = require('aws-sdk');

const R2_CONFIG = {
  accountId: 'b6e076d05a6dc18b42b30ad6fccda560',
  accessKeyId: 'd9168e92e60ec834d0f1416c4fb898ea',
  secretAccessKey: 'a8f3040cdb0ceaad3bbee870d63f526efca7ed241794541dca4c83597a62f7ea',
  bucketName: 'site01',
  region: 'auto',
  publicBaseUrl: 'https://site01.pub-ff6f7349f0ca4f698e9006f92b5c1c8a.r2.dev',
};

console.log('🔧 R2 Connection Diagnostics');
console.log('============================');
console.log('Account ID:', R2_CONFIG.accountId);
console.log('Bucket Name:', R2_CONFIG.bucketName);
console.log('Public Base URL:', R2_CONFIG.publicBaseUrl);
console.log('API Endpoint:', `https://${R2_CONFIG.accountId}.r2.cloudflarestorage.com`);

// Configure AWS SDK for Cloudflare R2
const s3Client = new AWS.S3({
  endpoint: `https://${R2_CONFIG.accountId}.r2.cloudflarestorage.com`,
  accessKeyId: R2_CONFIG.accessKeyId,
  secretAccessKey: R2_CONFIG.secretAccessKey,
  region: R2_CONFIG.region,
  signatureVersion: 'v4',
  s3ForcePathStyle: false,
});

async function testConnections() {
  console.log('\n1️⃣ Testing API Connection...');
  
  try {
    // Test 1: List buckets to verify API access
    console.log('   → Listing buckets...');
    const buckets = await s3Client.listBuckets().promise();
    console.log('   ✅ API connection successful');
    console.log('   📦 Available buckets:', buckets.Buckets.map(b => b.Name).join(', '));
    
    const bucketExists = buckets.Buckets.some(b => b.Name === R2_CONFIG.bucketName);
    if (!bucketExists) {
      console.log(`   ❌ Bucket "${R2_CONFIG.bucketName}" not found!`);
      return false;
    }
    
    // Test 2: Check bucket access
    console.log('\n2️⃣ Testing Bucket Access...');
    console.log('   → Checking bucket permissions...');
    await s3Client.headBucket({ Bucket: R2_CONFIG.bucketName }).promise();
    console.log('   ✅ Bucket access successful');
    
    // Test 3: List objects in bucket
    console.log('\n3️⃣ Testing Object Listing...');
    console.log('   → Listing objects in bucket...');
    const objects = await s3Client.listObjectsV2({ 
      Bucket: R2_CONFIG.bucketName,
      MaxKeys: 5 
    }).promise();
    console.log(`   ✅ Found ${objects.Contents ? objects.Contents.length : 0} objects`);
    
    if (objects.Contents && objects.Contents.length > 0) {
      console.log('   📁 Recent objects:');
      objects.Contents.forEach(obj => {
        const publicUrl = `${R2_CONFIG.publicBaseUrl}/${obj.Key}`;
        console.log(`      - ${obj.Key} → ${publicUrl}`);
      });
    }
    
    // Test 4: Upload test
    console.log('\n4️⃣ Testing Upload...');
    const testKey = `test/diagnostic-${Date.now()}.txt`;
    const testContent = 'R2 diagnostic test file';
    
    console.log('   → Uploading test file...');
    await s3Client.putObject({
      Bucket: R2_CONFIG.bucketName,
      Key: testKey,
      Body: testContent,
      ContentType: 'text/plain'
    }).promise();
    console.log('   ✅ Upload successful');
    
    const testPublicUrl = `${R2_CONFIG.publicBaseUrl}/${testKey}`;
    console.log(`   🌐 Public URL: ${testPublicUrl}`);
    
    // Test 5: Delete test file
    console.log('\n5️⃣ Testing Delete...');
    console.log('   → Deleting test file...');
    await s3Client.deleteObject({
      Bucket: R2_CONFIG.bucketName,
      Key: testKey
    }).promise();
    console.log('   ✅ Delete successful');
    
    return true;
    
  } catch (error) {
    console.log('\n❌ Test Failed:', error.code || 'Unknown error');
    console.log('   Error message:', error.message);
    
    if (error.code === 'AccessDenied') {
      console.log('\n💡 Troubleshooting Tips:');
      console.log('   - Check your R2 API token permissions');
      console.log('   - Ensure the token has Object Read/Write permissions');
      console.log('   - Verify the bucket exists in your R2 dashboard');
    } else if (error.code === 'NoSuchBucket') {
      console.log('\n💡 Troubleshooting Tips:');
      console.log(`   - Create bucket "${R2_CONFIG.bucketName}" in Cloudflare R2 dashboard`);
      console.log('   - Check bucket name spelling');
    } else if (error.code === 'InvalidAccessKeyId') {
      console.log('\n💡 Troubleshooting Tips:');
      console.log('   - Verify your Access Key ID is correct');
      console.log('   - Check if the API token has expired');
    } else if (error.code === 'SignatureDoesNotMatch') {
      console.log('\n💡 Troubleshooting Tips:');
      console.log('   - Verify your Secret Access Key is correct');
      console.log('   - Check for extra spaces or characters in credentials');
    }
    
    return false;
  }
}

async function testPublicURL() {
  console.log('\n6️⃣ Testing Public URL Access...');
  
  try {
    const fetch = require('node-fetch');
    
    // Test the base URL
    console.log('   → Testing base URL access...');
    const baseResponse = await fetch(R2_CONFIG.publicBaseUrl);
    console.log(`   📊 Base URL Status: ${baseResponse.status} ${baseResponse.statusText}`);
    
    if (baseResponse.status === 200) {
      console.log('   ✅ Public URL is accessible');
    } else if (baseResponse.status === 403) {
      console.log('   ⚠️  Public URL returns 403 - this might be normal for empty buckets');
    } else {
      console.log('   ❌ Public URL not accessible');
    }
    
  } catch (error) {
    console.log('   ❌ Public URL test failed:', error.message);
    console.log('\n💡 Note: Public URL might not be browsable if no custom domain is set');
  }
}

async function main() {
  const apiWorking = await testConnections();
  await testPublicURL();
  
  console.log('\n🏁 Summary');
  console.log('==========');
  
  if (apiWorking) {
    console.log('✅ R2 API connection is working correctly');
    console.log('✅ Upload/delete operations are functional');
    console.log('✅ Your admin interface should work properly');
    console.log('\n🚀 Next steps:');
    console.log('1. Start your dev server: npm run dev');
    console.log('2. Go to: http://localhost:3000/admin/gallery-r2');
    console.log('3. Login and test image uploads');
  } else {
    console.log('❌ R2 API connection has issues');
    console.log('🔧 Please resolve the connection issues before proceeding');
  }
}

main().catch(console.error);
