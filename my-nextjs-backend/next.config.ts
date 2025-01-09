import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    PORT: process.env.PORT, // Default to 3000 if not set
  },
};

export default nextConfig;
