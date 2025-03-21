import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'picsum.photos',
      'dummyjson.com',
      'robohash.org',
      "randomuser.me"
    ],
  },
};

export default nextConfig;
