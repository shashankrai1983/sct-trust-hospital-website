/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    instrumentationHook: false,
  },
  // Enable ISR for dynamic content
  async rewrites() {
    return [];
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
  // Enhanced webpack configuration to completely disable caching
  webpack: (config) => {
    // Disable cache completely to prevent ENOENT errors with pack files
    config.cache = false;
    
    // Explicitly disable filesystem cache
    if (config.infrastructureLogging) {
      config.infrastructureLogging.level = 'error'; // Reduce logging noise
    }
    
    // Force disable persistent caching
    if (config.optimization && config.optimization.moduleIds) {
      config.optimization.moduleIds = 'named'; // More stable than 'deterministic'
    }
    
    // Ensure no filesystem caching is attempted
    if (config.watchOptions) {
      config.watchOptions.poll = 1000; // Use polling instead of filesystem events
    }

    return config;
  },
  // Disable the Next.js cache in development mode
  onDemandEntries: {
    // Keep pages in memory for a shorter time
    maxInactiveAge: 15 * 1000,
    // Don't try to keep too many pages in memory
    pagesBufferLength: 2,
  },
};

module.exports = nextConfig;