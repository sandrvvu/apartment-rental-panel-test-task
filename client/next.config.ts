import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
      domains: ['res.cloudinary.com'], 
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'avalonbay-avalon-communities-prod.cdn.arcpublishing.com',
          port: '', // Leave empty unless a specific port is used
          pathname: '/resizer/**', // Or a more specific path if needed, but '/resizer/**' often works for CDNs
        },
      ],
    },
  };
  
  module.exports = nextConfig;
