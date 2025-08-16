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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
