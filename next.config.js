/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true,
  useFileSystemPublicRoutes: false,
  i18n,
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
}

module.exports = nextConfig
