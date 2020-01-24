const postcss = require('postcss')

module.exports = postcss.plugin('postcss-exclude-blocks', (opts = {}) => {
  let exclude = []

  if (opts.exclude) {
    exclude = Array.isArray(opts.exclude) ? opts.exclude : [opts.exclude]
  }

  return root => {
    if (!exclude.length) return

    root.walkRules(RegExp(`^.(${ exclude.join('|') })`), rule => {
      rule.remove()
    })
  }
})
