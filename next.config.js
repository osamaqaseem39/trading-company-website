/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["server.wingzimpex.com"],
  },
  /* config options here */
};

module.exports = nextConfig; 