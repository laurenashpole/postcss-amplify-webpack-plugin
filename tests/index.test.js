const path = require('path');
const { compile } = require('./helpers/compile');
const { cssOutput } = require('./fixtures/cssOutput');
const distPath = path.resolve(__dirname, 'dist');
const plugin = require('../');

describe('General', () => {
  it('can be instantiated with options', () => {
    const pluginInstance = new plugin({
      outputPath: 'lib',
      maxBreakpoint: '768px'
    });
    expect(pluginInstance.options.outputPath).toBe('lib');
    expect(pluginInstance.options.maxBreakpoint).toBe('768px');
  });
});

describe('Write files', () => {
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

  it('ignores excluded files string', () => {
    return compile({ excludedFiles: /file2.*\.css/ }).then(memfs => {
      const cssExists = memfs.existsSync(path.join(distPath, 'file1.amp.css'));
      const exclExists = memfs.existsSync(path.join(distPath, 'file2.amp.css'));
      return expect(cssExists).toBe(true) && expect(exclExists).toBe(false);
    });
  });

  it('ignores excluded files array', () => {
    return compile({ excludedFiles: [/file2.*\.css/, /file3.*\.css/] }).then(
      memfs => {
        const cssExists = memfs.existsSync(
          path.join(distPath, 'file1.amp.css')
        );
        const exclExists = memfs.existsSync(
          path.join(distPath, 'file2.amp.css')
        );
        const exclMoreExists = memfs.existsSync(
          path.join(distPath, 'file3.amp.css')
        );
        return (
          expect(cssExists).toBe(true) &&
          expect(exclExists).toBe(false) &&
          expect(exclMoreExists).toBe(false)
        );
      }
    );
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

describe('Optimize CSS', () => {
  it('runs postcss-amplify', () => {
    return compile().then(memfs => {
      const output = memfs.readFileSync(path.join(distPath, 'file1.amp.css'));
      return expect(output.toString()).toEqual(cssOutput.basic);
    });
  });

  it('respects maxBreakpoint option', () => {
    return compile({ maxBreakpoint: '1024px' }).then(memfs => {
      const output = memfs.readFileSync(path.join(distPath, 'file1.amp.css'));
      return expect(output.toString()).toEqual(cssOutput.maxBreakpoint);
    });
  });

  it('respects excludedBlocks option', () => {
    return compile({ excludedBlocks: 'sidebar' }).then(memfs => {
      const output = memfs.readFileSync(path.join(distPath, 'file1.amp.css'));
      return expect(output.toString()).toEqual(cssOutput.excludedBlocks);
    });
  });
});
