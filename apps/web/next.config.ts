import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: process.cwd().replace(/\/apps\/web$/, ""),
  },
  transpilePackages: ["@acento/content", "@acento/design-system", "@acento/shared", "@acento/ui"],
};

export default nextConfig;
