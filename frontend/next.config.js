/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

module.exports = {
  reactStrictMode: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  i18n,
  typescript: {
    ignoreBuildErrors: true,
  },
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  assetPrefix: BASE_PREFIX_FOR_APP,
  async rewrites() {
    return [
      {
        /** ASSET PREFIX */
        source: `${BASE_PREFIX_FOR_APP}/_next/:path*`,
        destination: "/_next/:path*",
      },
    ];
  },
};
