const withTM = require("next-transpile-modules")([
  "@xyflow/system",
]);

const nextConfig = {
  reactStrictMode: false,
};

module.exports = withTM(nextConfig);