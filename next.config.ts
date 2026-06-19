import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
 experimental: {
    optimizeCss: true, // Força a otimização correta do CSS nativo
  },
};

export default nextConfig;
