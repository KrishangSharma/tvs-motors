import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["cdn.sanity.io"], // Allow Sanity image URLs
  },
};

export default nextConfig;
