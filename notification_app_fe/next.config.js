/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep Turbopack root explicit to avoid workspace root inference warnings
  turbopack: {
    root: '.',
  },
  async rewrites() {
    return [
      {
        source: '/api/evaluation-service/:path*',
        destination: 'http://20.207.122.201/evaluation-service/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
