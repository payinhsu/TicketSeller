const webpack = require('webpack');

const { NODE_ENV } = process.env;
const env = require('./server/config');

module.exports = {
  webpack: (config, { dev }) => {
    config.plugins.push(
      new webpack.ContextReplacementPlugin(
        /moment[\/\\]locale$/,
        /zh-tw/,
      ),
      new webpack.DefinePlugin({
        'process.env.CLIENT_HOST': JSON.stringify(env[NODE_ENV].CLIENT_HOST),
      }),
    );
    return config;
  },
};
