import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["server.wingzimpex.com"],
  },
  /* config options here */
};

export default nextConfig;
