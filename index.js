const path = require('path');
const postcss = require('postcss');
const postcssAmplify = require('postcss-amplify');

class PostcssAmplifyWebpackPlugin {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      'PostcssAmplifyWebpackPlugin',
      (compilation, callback) => {
        compilation.chunks.forEach(chunk => {
          chunk.files.forEach(filename => {
            let outputPath = compilation.options.output.path;

            if (!filename.endsWith('.css')) {
              return callback();
            }

            if (this.isExcluded(`${outputPath}/${filename}`)) {
              return callback();
            }

            const ampFilename = this.getAmpFilename(filename);

            outputPath = path.join(
              path.relative(
                compilation.options.context,
                this.options.outputPath || outputPath
              ),
              ampFilename
            );

            postcss([
              postcssAmplify({
                excludedBlocks: this.options.excludedBlocks || [],
                maxBreakpoint: this.options.maxBreakpoint || '0px'
              })
            ])
              .process(compilation.assets[filename].source(), {
                from: undefined
              })
              .then(result => {
                compilation.assets[outputPath] = {
                  source: () => {
                    return result.css;
                  },
                  size: () => {
                    return result.css.length;
                  }
                };

                callback();
              });
          });
        });
      }
    );
  }

  getAmpFilename(filename) {
    return filename.replace(/\.css$/, '.amp.css');
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
