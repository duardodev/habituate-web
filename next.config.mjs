/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.jsdelivr.net',
      },
    ],
  },
  experimental: {
    instrumentationHook: true,
  },
};

export default nextConfig;
