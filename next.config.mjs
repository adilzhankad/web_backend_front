/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Ловим все запросы, начинающиеся с /api/
        destination: 'http://localhost:3000/:path*', // И перенаправляем их на бэкенд (убирая /api)
      },
    ];
  },
};

export default nextConfig;