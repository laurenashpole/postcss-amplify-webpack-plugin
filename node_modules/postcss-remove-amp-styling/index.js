const postcss = require('postcss')

module.exports = postcss.plugin('postcss-remove-amp-styling', () => {
  return root => {
    root.walkRules(/^(\.-amp|-i-amp)/, rule => {
      rule.remove()
    })
  }
})
