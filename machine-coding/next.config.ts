import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
      }
    ]
  },
  allowedDevOrigins: ['192.168.146.156'],
  /* config options here */
};

export default nextConfig;
