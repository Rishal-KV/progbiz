import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["gratisography.com","res.cloudinary.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  /* config options here */
};

export default nextConfig;
