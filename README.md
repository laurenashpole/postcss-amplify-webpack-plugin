# postcss-amplify-webpack-plugin

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]

[build-badge]: https://travis-ci.org/laurenashpole/postcss-amplify-webpack-plugin.svg?branch=master
[build]: https://travis-ci.org/laurenashpole/postcss-amplify-webpack-plugin

[npm-badge]: http://img.shields.io/npm/v/postcss-amplify-webpack-plugin.svg?style=flat
[npm]: https://www.npmjs.com/package/postcss-amplify-webpack-plugin

A [Webpack](https://webpack.js.org/) plugin to generate a Google AMP optimized CSS file using [postcss-amplify](https://github.com/laurenashpole/postcss-amplify).

For every CSS file that is compiled through Webpack, this plugin uses postcss-amplify to filter out:

- Media queries for desktop breakpoints
- Non `-webkit-` vendor prefixes
- Specific class block names or other prefixes (for use with BEM or other namespacing methodologies)
- `!important` flags
- `-amp` classes or `i-amp` tags

and generate a new file with the format `FILENAME.amp.css`.

## Installation

### NPM

```
npm install postcss-amplify-webpack-plugin
```

### Yarn

```
yarn add postcss-amplify-webpack-plugin
```

## Usage

Add the plugin to your Webpack config:

```
const PostcssAmplifyWebpackPlugin = require('postcss-amplify-webpack-plugin');

module.exports = {
  ...
  plugins: [
    new PostcssAmplifyWebpackPlugin(options)
  ]
};
```

## Options

**options.maxBreakpoint** (string) To allow for larger mobile styling, media queries below this breakpoint will be preserved.

**options.excludedBlocks** (string or array) List of class blocks or prefixes to exclude. Do not include the `.`.

**options.outputPath** (string) Directory for the new files. This should be an absolute path and defaults to the setting for `output.path` in the Webpack config.

**options.excludedFiles** (RegExp or array) List of files to exclude. This option behaves the same as other Webpack `exclude` conditions.

## Issues

My Webpack configs tend to be on the simpler side so it's possible there are some build variations I haven't considered. If you run into any issues with the plugin or the underlying CSS parsing, please submit an [issue](https://github.com/laurenashpole/postcss-amplify-webpack-plugin/issues).

## License

[MIT](https://github.com/laurenashpole/postcss-amplify-webpack-plugin/blob/master/LICENSE)
