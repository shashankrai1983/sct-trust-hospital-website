/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    instrumentationHook: false,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
    ],
  },
  // Enhanced webpack configuration for Netlify deployment
  webpack: (config) => {
    // Disable cache for cleaner builds
    config.cache = false;
    
    // Optimize for production
    if (config.infrastructureLogging) {
      config.infrastructureLogging.level = 'error';
    }
    
    return config;
  },
};

module.exports = nextConfig;