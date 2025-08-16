// Direct bucket test for R2
const AWS = require('aws-sdk');

const R2_CONFIG = {
  accountId: 'b6e076d05a6dc18b42b30ad6fccda560',
  accessKeyId: 'df424608a779b129c967a770fbe97d7f',
  secretAccessKey: '752aa64b2958802af432596aeeef27ea4e496d3ed826e994825a9c1e1bdadc09',
  bucketName: 'site01',
  region: 'auto',
};

console.log('🧪 Direct R2 Bucket Test');
console.log('========================');
console.log('Bucket:', R2_CONFIG.bucketName);
console.log('Account:', R2_CONFIG.accountId);

// Try different AWS SDK configurations
const configs = [
  {
    name: 'Config 1: Standard',
    config: {
      endpoint: `https://${R2_CONFIG.accountId}.r2.cloudflarestorage.com`,
      accessKeyId: R2_CONFIG.accessKeyId,
      secretAccessKey: R2_CONFIG.secretAccessKey,
      region: R2_CONFIG.region,
      signatureVersion: 'v4',
      s3ForcePathStyle: false,
    }
  },
  {
    name: 'Config 2: Path Style',
    config: {
      endpoint: `https://${R2_CONFIG.accountId}.r2.cloudflarestorage.com`,
      accessKeyId: R2_CONFIG.accessKeyId,
      secretAccessKey: R2_CONFIG.secretAccessKey,
      region: R2_CONFIG.region,
      signatureVersion: 'v4',
      s3ForcePathStyle: true,
    }
  },
  {
    name: 'Config 3: us-east-1',
    config: {
      endpoint: `https://${R2_CONFIG.accountId}.r2.cloudflarestorage.com`,
      accessKeyId: R2_CONFIG.accessKeyId,
      secretAccessKey: R2_CONFIG.secretAccessKey,
      region: 'us-east-1',
      signatureVersion: 'v4',
      s3ForcePathStyle: false,
    }
  }
];

async function testConfig(configInfo) {
  console.log(`\n📡 ${configInfo.name}`);
  
  const s3 = new AWS.S3(configInfo.config);
  
  try {
    // Test 1: Try to access the specific bucket directly
    console.log('   → Testing headBucket (direct bucket access)...');
    await s3.headBucket({ Bucket: R2_CONFIG.bucketName }).promise();
    console.log('   ✅ Direct bucket access successful!');
    
    // Test 2: Try to list objects in the bucket
    console.log('   → Testing listObjectsV2...');
    const result = await s3.listObjectsV2({ 
      Bucket: R2_CONFIG.bucketName,
      MaxKeys: 1 
    }).promise();
    console.log(`   ✅ List objects successful! Found ${result.Contents ? result.Contents.length : 0} objects`);
    
    return true;
    
  } catch (error) {
    console.log(`   ❌ Failed: ${error.code} - ${error.message}`);
    return false;
  }
}

async function testUpload() {
  console.log('\n🔄 Testing Upload...');
  
  // Use the first config for upload test
  const s3 = new AWS.S3(configs[0].config);
  
  try {
    const testKey = `test/upload-${Date.now()}.txt`;
    const testContent = 'Hello R2!';
    
    console.log('   → Uploading test file...');
    await s3.putObject({
      Bucket: R2_CONFIG.bucketName,
      Key: testKey,
      Body: testContent,
      ContentType: 'text/plain'
    }).promise();
    
    console.log('   ✅ Upload successful!');
    console.log(`   📄 File: ${testKey}`);
    
    // Test public URL
    const publicUrl = `https://site01.pub-ff6f7349f0ca4f698e9006f92b5c1c8a.r2.dev/${testKey}`;
    console.log(`   🌐 Public URL: ${publicUrl}`);
    
    // Clean up
    console.log('   → Cleaning up test file...');
    await s3.deleteObject({
      Bucket: R2_CONFIG.bucketName,
      Key: testKey
    }).promise();
    console.log('   ✅ Cleanup successful!');
    
    return true;
    
  } catch (error) {
    console.log(`   ❌ Upload failed: ${error.code} - ${error.message}`);
    return false;
  }
}

async function main() {
  let success = false;
  
  for (const config of configs) {
    const result = await testConfig(config);
    if (result) {
      success = true;
      break;
    }
  }
  
  if (success) {
    await testUpload();
    console.log('\n🎉 SUCCESS! Your R2 setup is working correctly!');
    console.log('\n📱 Next steps:');
    console.log('1. Start your dev server: npm run dev');
    console.log('2. Go to: http://localhost:3000/admin/gallery-r2');
    console.log('3. Login with: admin@infrastire.com / admin123');
    console.log('4. Upload images - they will be stored in R2!');
  } else {
    console.log('\n❌ All tests failed. Possible issues:');
    console.log('1. Bucket "site01" might not exist');
    console.log('2. API token might not have bucket-specific permissions');
    console.log('3. Token might need a few minutes to propagate');
    console.log('\n🔧 Try:');
    console.log('1. Wait 2-3 minutes for token to activate');
    console.log('2. Check that bucket "site01" exists in R2 dashboard');
    console.log('3. Verify token has "Object Read", "Object Write" permissions');
  }
}

main().catch(console.error);
