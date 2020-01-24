# postcss-unimportant

[PostCSS] plugin to remove !important rules.

[PostCSS]: https://github.com/postcss/postcss

```css
body {
  color: #000 !important;
  font-size: 16px;
}
```

```css
body {
  color: #000;
  font-size: 16px;
}
```

## Usage

Check your project for existing PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you already use PostCSS, add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-unimportant'),
    require('autoprefixer')
  ]
}
```

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

[official docs]: https://github.com/postcss/postcss#usage
