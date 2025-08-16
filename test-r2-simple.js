// Simple R2 token validation test
const AWS = require('aws-sdk');

const R2_CONFIG = {
  accountId: 'b6e076d05a6dc18b42b30ad6fccda560',
  accessKeyId: 'df424608a779b129c967a770fbe97d7f',
  secretAccessKey: '752aa64b2958802af432596aeeef27ea4e496d3ed826e994825a9c1e1bdadc09',
  bucketName: 'site01',
  region: 'auto',
};

console.log('🔐 R2 Token Validation Test');
console.log('===========================');

// Test different endpoints and configurations
const configs = [
  {
    name: 'Standard R2 API',
    endpoint: `https://${R2_CONFIG.accountId}.r2.cloudflarestorage.com`,
    s3ForcePathStyle: false
  },
  {
    name: 'Path-style R2 API',
    endpoint: `https://${R2_CONFIG.accountId}.r2.cloudflarestorage.com`,
    s3ForcePathStyle: true
  }
];

async function testConfig(config) {
  console.log(`\n📡 Testing: ${config.name}`);
  console.log(`   Endpoint: ${config.endpoint}`);
  console.log(`   Path style: ${config.s3ForcePathStyle}`);
  
  const s3Client = new AWS.S3({
    endpoint: config.endpoint,
    accessKeyId: R2_CONFIG.accessKeyId,
    secretAccessKey: R2_CONFIG.secretAccessKey,
    region: R2_CONFIG.region,
    signatureVersion: 'v4',
    s3ForcePathStyle: config.s3ForcePathStyle,
  });

  try {
    // Test 1: List buckets (most basic test)
    console.log('   → Testing listBuckets...');
    const buckets = await s3Client.listBuckets().promise();
    console.log('   ✅ Success! Found buckets:', buckets.Buckets.map(b => b.Name).join(', '));
    
    // Test 2: Check specific bucket
    const targetBucket = buckets.Buckets.find(b => b.Name === R2_CONFIG.bucketName);
    if (targetBucket) {
      console.log(`   ✅ Found target bucket: ${R2_CONFIG.bucketName}`);
      
      // Test 3: Head bucket
      console.log('   → Testing headBucket...');
      await s3Client.headBucket({ Bucket: R2_CONFIG.bucketName }).promise();
      console.log('   ✅ Bucket access confirmed');
      
      return true;
    } else {
      console.log(`   ❌ Target bucket "${R2_CONFIG.bucketName}" not found`);
      console.log('   Available buckets:', buckets.Buckets.map(b => b.Name).join(', '));
      return false;
    }
    
  } catch (error) {
    console.log(`   ❌ Failed: ${error.code} - ${error.message}`);
    return false;
  }
}

async function checkCredentials() {
  console.log('\n🔑 Credential Information:');
  console.log('   Account ID:', R2_CONFIG.accountId);
  console.log('   Access Key ID:', R2_CONFIG.accessKeyId.substring(0, 8) + '...');
  console.log('   Secret Key:', R2_CONFIG.secretAccessKey.substring(0, 8) + '...');
  console.log('   Target Bucket:', R2_CONFIG.bucketName);
}

async function main() {
  checkCredentials();
  
  let success = false;
  for (const config of configs) {
    const result = await testConfig(config);
    if (result) {
      success = true;
      break;
    }
  }
  
  console.log('\n🏁 Final Result:');
  if (success) {
    console.log('✅ Connection successful with at least one configuration');
    console.log('💡 Your R2 setup should work properly');
  } else {
    console.log('❌ All connection attempts failed');
    console.log('\n🔧 Possible issues:');
    console.log('1. API Token might not have the right permissions');
    console.log('2. Bucket might not exist or be in a different account');
    console.log('3. Token might have expired');
    console.log('4. Account ID might be incorrect');
    console.log('\n📋 To fix:');
    console.log('1. Go to Cloudflare Dashboard > R2 Object Storage');
    console.log('2. Create a new API token with "Object Read and Write" permissions');
    console.log('3. Make sure the bucket "site01" exists');
    console.log('4. Update the credentials in your code');
  }
}

main().catch(console.error);
