/** @type {import('next').NextConfig} */
const { withGluestackUI } = require('@gluestack/ui-next-adapter');

const nextConfig = {
  reactStrictMode: true,
  // transpilePackages: ["@gluestack-ui/themed"],
  images: {
    domains: ['127.0.0.1'],
  },
};

module.exports = withGluestackUI(nextConfig);
