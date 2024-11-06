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
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  distDir: 'docs',
};

export default nextConfig;
