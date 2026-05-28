/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Support image loading from unsplash
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/academy/plans.html',
        destination: '/pricing',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
