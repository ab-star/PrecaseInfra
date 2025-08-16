# 🔧 Cloudflare R2 Setup Guide

## Current Issue
Your R2 configuration is returning "Access Denied" errors, which indicates that the API token needs to be updated or recreated.

## Your Current Configuration
- **Account ID**: `b6e076d05a6dc18b42b30ad6fccda560`
- **Bucket Name**: `site01`
- **Public URL**: `https://site01.pub-ff6f7349f0ca4f698e9006f92b5c1c8a.r2.dev/`

## Steps to Fix the R2 Connection

### 1. Check Your Cloudflare R2 Dashboard
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **R2 Object Storage**
3. Verify that the bucket `site01` exists
4. If it doesn't exist, create it

### 2. Create a New API Token
1. In the R2 dashboard, go to **Manage R2 API tokens**
2. Click **Create API token**
3. Set the following permissions:
   - **Object Read**: ✅ Enabled
   - **Object Write**: ✅ Enabled
   - **Bucket List**: ✅ Enabled (optional but helpful)
4. **Scope**: Apply to all buckets or specifically to `site01`
5. Click **Create API token**

### 3. Update Your Credentials
After creating the new token, you'll get:
- **Access Key ID**: (starts with a string like `d9168e92...`)
- **Secret Access Key**: (a longer string like `a8f3040c...`)

Update these in your `lib/r2Storage.ts` file:

```typescript
const R2_CONFIG = {
  accountId: 'b6e076d05a6dc18b42b30ad6fccda560', // Keep this
  accessKeyId: 'YOUR_NEW_ACCESS_KEY_ID',      // Update this
  secretAccessKey: 'YOUR_NEW_SECRET_ACCESS_KEY', // Update this
  bucketName: 'site01',
  region: 'auto',
  publicBaseUrl: 'https://site01.pub-ff6f7349f0ca4f698e9006f92b5c1c8a.r2.dev',
};
```

### 4. Test the Connection
Run the test script to verify everything works:
```bash
node test-r2-simple.js
```

### 5. Enable Public Access (Optional)
If you want your images to be publicly accessible:
1. In the R2 dashboard, select your bucket `site01`
2. Go to **Settings** > **Public access**
3. Enable public access if needed

## Common Issues & Solutions

### Issue: "NoSuchBucket" Error
- **Solution**: Create the bucket `site01` in your R2 dashboard

### Issue: "InvalidAccessKeyId" Error  
- **Solution**: Generate a new API token and update the `accessKeyId`

### Issue: "SignatureDoesNotMatch" Error
- **Solution**: Update the `secretAccessKey` with the new token

### Issue: "AccessDenied" Error
- **Solution**: Ensure your API token has "Object Read" and "Object Write" permissions

## Testing Your Setup

Once you've updated the credentials, test with:

1. **Simple test**: `node test-r2-simple.js`
2. **Start the app**: `npm run dev`
3. **Test upload**: Go to `http://localhost:3000/admin/gallery-r2`

## Current Status
- ✅ Public URL structure is correct
- ✅ Account ID is valid  
- ✅ Bucket name is configured
- ❌ API credentials need to be updated

## Demo Mode
If you can't fix the credentials immediately, the app will work in demo mode where:
- Images are stored locally in browser
- Upload simulation works
- You can test the interface

But for production use, you'll need working R2 credentials.

## Support
If you continue having issues:
1. Double-check the bucket name spelling
2. Verify the account ID in Cloudflare dashboard
3. Make sure R2 is enabled in your Cloudflare account
4. Try creating a completely new API token
