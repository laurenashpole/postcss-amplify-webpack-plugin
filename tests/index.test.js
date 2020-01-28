const path = require('path');
const { compile } = require('./helpers/compile');
const distPath = path.resolve(__dirname, 'dist');

describe('postcss-amplify-webpack-plugin', () => {
  it('writes new CSS files', () => {
    return compile().then(memfs => {
      const cssExists = memfs.existsSync(path.join(distPath, 'file1.amp.css'));
      return expect(cssExists).toBe(true);
    });
  });

  it('ignores non-CSS files', () => {
    return compile().then(memfs => {
      const cssExists = memfs.existsSync(path.join(distPath, 'file1.amp.css'));
      const jsExists = memfs.existsSync(path.join(distPath, 'file1.amp.js'));
      return expect(cssExists).toBe(true) && expect(jsExists).toBe(false);
    });
  });

  it('ignores excluded files', () => {
    return compile({ excludedFiles: /file2.*\.css/ }).then(memfs => {
      const cssExists = memfs.existsSync(path.join(distPath, 'file1.amp.css'));
      const exclExists = memfs.existsSync(path.join(distPath, 'file2.amp.css'));
      return expect(cssExists).toBe(true) && expect(exclExists).toBe(false);
    });
  });

  it('writes new files to output path if defined', () => {
    return compile({ outputPath: 'lib' }).then(memfs => {
      const cssExists = memfs.existsSync(
        path.join(path.resolve(__dirname, 'lib'), 'file1.amp.css')
      );
      return expect(cssExists).toBe(false);
    });
  });
});
