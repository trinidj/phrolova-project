import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    qualities: [100, 75]
  }
};

export default nextConfig;
