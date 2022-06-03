// @ts-check
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const path = require('path');

const meliApiUrl = process.env.MELI_API_URL;

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  env: {
    MELI_API_URL: process.env.MELI_API_URL,
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    domains: ['localhost', 'http2.mlstatic.com', meliApiUrl],
    minimumCacheTTL: 60,
  },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    mode: 'production',
    runtimeCaching,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  reactStrictMode: true,
  swcMinify: true,
});

module.exports = nextConfig;
