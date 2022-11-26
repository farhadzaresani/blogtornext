/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
        port: "4000",
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
