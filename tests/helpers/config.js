const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const plugin = require('../../');

exports.getConfig = function(pluginOptions = {}) {
  return {
    entry: {
      file1: '../fixtures/file1.js',
      file2: '../fixtures/file2.js'
    },
    context: __dirname,
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, '../dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        }
      ]
    },
    plugins: [new MiniCssExtractPlugin(), new plugin(pluginOptions)]
  };
};
