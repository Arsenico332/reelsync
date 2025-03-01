/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Se non utilizzi l'App Router, puoi disabilitarlo:
    experimental: {
      appDir: false,
    },
  };
  
  module.exports = nextConfig;
  // next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "script-src 'self' 'unsafe-eval' https://apis.google.com https://accounts.google.com; object-src 'none';"
          },
        ],
      },
    ];
  },
};


