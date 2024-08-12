/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    // Add custom webpack configurations if needed
    return config;
  },
};

export default nextConfig;
