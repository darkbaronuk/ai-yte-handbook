/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // PGlite dùng WASM/worker — không bundle bằng webpack
    serverComponentsExternalPackages: ["@electric-sql/pglite"],
  },
};

export default nextConfig;
