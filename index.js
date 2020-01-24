const fs = require('fs');
const postcss = require('postcss');
const postcssAmplify = require('postcss-amplify');

class PostcssAmplifyWebpackPlugin {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.assetEmitted.tapAsync(
      'PostcssAmplifyWebpackPlugin',
      (file, content, callback) => {
        if (!file.endsWith('.css')) {
          return callback();
        }

        if (this.isExcluded(file)) {
          return callback();
        }

        const outputPath =
          this.options.outputPath || compiler.options.output.path;
        const ampFilename = this.getAmpFilename(file);

        postcss([
          postcssAmplify({
            excludedBlocks: this.options.excludedBlocks || [],
            maxBreakpoint: this.options.maxBreakpoint || '0px'
          })
        ])
          .process(content.toString(), { from: undefined })
          .then(result => {
            // todo: create file if doesn't exist
            fs.writeFileSync(`${outputPath}/${ampFilename}`, result.css);
            callback();
          });
      }
    );
  }

  getAmpFilename(file) {
    const filename = file.match(/(?<=(\/|\n))(.*)(?=\.css)/)[0];
    return `${filename}.amp.css`;
  }

  isExcluded(file) {
    if (!this.options.excludedFiles) {
      return false;
    }

    const excludedFiles = Array.isArray(this.options.excludedFiles)
      ? this.options.excludedFiles
      : [this.options.excludedFiles];
    return excludedFiles.filter(excludedFile => file.match(excludedFile))
      .length;
  }
}

module.exports = PostcssAmplifyWebpackPlugin;
