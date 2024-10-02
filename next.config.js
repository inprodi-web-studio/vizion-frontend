/** @type {import("next").NextConfig} */

const withTM = require("next-transpile-modules")([
  // "@xyflow/react",
  "@xyflow/system",
]);

const nextConfig = {
  reactStrictMode: false,
  // modularizeImports: {
  //   "@phosphor-icons/react": {
  //     transform: "@phosphor-icons/react/{{member}}",
  //   },
  // },
};

module.exports = withTM(nextConfig);
