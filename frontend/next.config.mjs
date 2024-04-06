/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
  env: {
    PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
