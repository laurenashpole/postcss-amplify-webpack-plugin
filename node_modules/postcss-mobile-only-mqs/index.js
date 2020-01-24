const postcss = require('postcss')
const mediaQuery = require('css-mediaquery')

module.exports = postcss.plugin('postcss-mobile-only-mqs', (opts = {}) => {
  let mediaQueryOpts = {
    type: 'screen',
    width: opts.maxBreakpoint || '0px'
  }

  return root => {
    root.walkAtRules('media', rule => {
      if (!mediaQuery.match(rule.params, mediaQueryOpts)) {
        rule.remove()
      }
    })
  }
})
