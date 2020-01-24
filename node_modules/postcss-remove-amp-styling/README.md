# postcss-remove-amp-styling

[PostCSS] plugin to remove invalid Google AMP styling.

[PostCSS]: https://github.com/postcss/postcss

```css
.menu {
  font-size: 14px;
}

.-amp-menu {
  font-size: 16px;
}
```

```css
.menu {
  font-size: 14px;
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
+   require('postcss-remove-amp-styling'),
    require('autoprefixer')
  ]
}
```

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

[official docs]: https://github.com/postcss/postcss#usage
