// Configuration for @cloudflare/next-on-pages so Cloudflare Pages allows Node runtime routes
// without requiring CLI flags in the build command.
// Docs: https://github.com/cloudflare/next-on-pages

const config = {
  // Enable Node.js compatibility for Functions generated from Next.js routes
  compatibilityFlags: ["nodejs_compat"],
};

export default config;
