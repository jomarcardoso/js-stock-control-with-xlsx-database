/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  output: 'export',
  basePath: '/js-stock-control-with-xlsx-database',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  distDir: 'out',
};

export default nextConfig;
