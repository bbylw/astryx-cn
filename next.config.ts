import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  experimental: {
    // Astryx v0.7.14 起包根不再带 'use client'，webpack 下需此选项避免根导入打包全部客户端组件
    optimizePackageImports: ["@astryxdesign/core"],
  },
};

export default nextConfig;
