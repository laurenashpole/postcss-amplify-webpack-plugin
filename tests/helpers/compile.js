const webpack = require('webpack');
const MemoryFileSystem = require('memory-fs');
const { getConfig } = require('./config.js');

exports.compile = function(pluginOptions = {}) {
  return new Promise((resolve, reject) => {
    const fs = new MemoryFileSystem();
    const compiler = webpack(getConfig(pluginOptions));
    compiler.outputFileSystem = fs;

    compiler.run(error => {
      if (error) {
        return reject(error);
      }

      return resolve(fs);
    });
  });
};
