# postcss-exclude-blocks

[PostCSS] plugin to exclude specific CSS blocks or prefixes. Created with [BEM] or other namespacing methodologies in mind.

[PostCSS]: https://github.com/postcss/postcss
[BEM]: http://getbem.com/

```css
.content {
  font-size: 16px;
}

.sidebar {
  background: #f1f1f1;
}

.sidebar__heading {
  font-size: 24px;
}
```

```css
.content {
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
+   require('postcss-exclude-blocks')(options),
    require('autoprefixer')
  ]
}
```

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

[official docs]: https://github.com/postcss/postcss#usage

## Options

**options.exclude** (string or array) List of class block names or prefixes to exclude. Do not include the `.` at the beginning of the name.
