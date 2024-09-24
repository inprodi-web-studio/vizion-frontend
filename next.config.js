/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  modularizeImports: {
    '@phosphor-icons/react': {
      transform: '@phosphor-icons/react/{{member}}',
    },
  },
};

module.exports = nextConfig;
