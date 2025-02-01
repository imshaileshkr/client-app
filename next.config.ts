import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    'backend_api_endpoint': process.env.BACKEND_API_ENDPOINT,
  }
};

export default nextConfig;
