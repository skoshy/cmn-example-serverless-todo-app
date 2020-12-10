/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const webpack = require("webpack");

const isDev = process.env.NODE_ENV === "development";
const isSourceMapsEnabled = !!process.env.ENABLE_SOURCEMAPS;

const buildEnv = (keys) => keys.reduce((acc, key) => ({ ...acc, [key]: process.env[key] }), {});

const withAll = (config) => {
  let builtUpConfig = config;

  if (isSourceMapsEnabled) {
    const withSourceMaps = require("@zeit/next-source-maps")();
    builtUpConfig = withSourceMaps(builtUpConfig);
  }

  return builtUpConfig;
};

module.exports = withAll({
  // Public (client-side) env vars go here
  // Do NOT put private env vars in this `env` key. Put them in `serverRuntimeConfig` instead
  env: buildEnv([
    'SITE_NAME',
    'SUPABASE_API_URL',
    'SUPABASE_CLIENT_KEY',
  ]),
  // Private (server-side only) env vars go here
  serverRuntimeConfig: buildEnv([
    'SUPABASE_SERVICE_KEY',
  ]),

  // see https://github.com/netlify/next-on-netlify#1-set-nextjs-target-to-serverless
  // might need to be changed if binaries are need (e.g. something like Prisma)
  target: "serverless",

  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 2,
    localIdentName: "[local]___[hash:base64:5]",
  },

  pageExtensions: ["js", "jsx", "ts", "tsx"],

  trailingSlash: !isDev,

  webpack(config) {
    // needed to allow for root imports
    config.resolve.modules.push(path.resolve("./"));

    // webpack should ignore all the auto-generated css definition files
    config.plugins.push(new webpack.WatchIgnorePlugin([/s?[ac]ss\.d\.ts$/]));

    return config;
  },
});
