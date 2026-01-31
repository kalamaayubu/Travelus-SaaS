import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // @ts-expect-error - ignore property check for ESLint in config
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
