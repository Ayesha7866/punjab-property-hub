import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hostinger Node.js apps inject output: "standalone". Do not set output: "export".
  poweredByHeader: false,
  cacheComponents: true,
  partialPrefetching: true,
  allowedDevOrigins: ["*.trycloudflare.com"],
  experimental: {
    serverActions: {
      bodySizeLimit: "80mb",
      allowedOrigins: ["*.trycloudflare.com"],
    },
  },
  // Keep turbopack.root so a parent papermaker postcss config cannot leak in.
  // Do not add CSS loader rules: Hostinger's Next build turned `globals.css` into
  // `globals.css.css` and crashed Turbopack.
  turbopack: {
    root: path.join(__dirname),
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};

export default nextConfig;
