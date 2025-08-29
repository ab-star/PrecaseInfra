This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Building for Cloudflare Pages

This project is configured to deploy on Cloudflare Pages using `@cloudflare/next-on-pages`.

Build output command:

```bash
npm run build
```

This generates a `.vercel/output` directory. The `wrangler.toml` sets:

```
pages_build_output_dir = ".vercel/output/static"
```

If you need SSR / Edge Functions, ensure `next-on-pages` is installed (already in devDependencies) and keep the build script as `next-on-pages build`. For pure static export you could instead use `next build && next export` and set `pages_build_output_dir` to `out`.

If Cloudflare build reports `.vercel/output/static` not found, verify the build finished successfully and that `@cloudflare/next-on-pages` version matches your Next.js version.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment & Cloudflare Setup

Required environment inputs by feature:

- R2 public base (used to render images/videos)
	- NEXT_PUBLIC_R2_BASE or R2_PUBLIC_BASE_URL
- Admin fallback login (Edge-safe)
	- ADMIN_EMAIL, ADMIN_PASSWORD
- Optional Firebase (only if using Firestore login path)
	- NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET, NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID, NEXT_PUBLIC_FIREBASE_APP_ID
- Legacy AWS SDK R2 flows (only for Node runtime/local tools)
	- R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_REGION (default auto)

Local dev:

1) Copy .env.example to .env.local and fill values you need (at minimum set NEXT_PUBLIC_R2_BASE).
2) Run npm run dev and visit /api/r2-upload (GET) for a readiness status.

Cloudflare Pages:

1) Set Environment Variables (Project > Settings > Environment variables)
	 - NEXT_PUBLIC_R2_BASE or R2_PUBLIC_BASE_URL
	 - ADMIN_EMAIL, ADMIN_PASSWORD
	 - (Optional) Firebase NEXT_PUBLIC_* if using Firestore auth path
2) Bind R2 bucket (Project > Settings > Functions > R2 bindings)
	 - Name: R2_BUCKET (or R2), Bucket: your-bucket
3) Build uses @cloudflare/next-on-pages with nodejs_compat (see next-on-pages.config.js)
4) Verify /api/r2-upload (GET) returns { ready: true } after deploy

Notes:
- The Edge upload route (/api/r2-upload) requires an R2 binding; it does not use AWS keys.
- The legacy AWS SDK utilities in lib/r2Storage.ts are for local/Node-only flows and should not be used on Edge.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
