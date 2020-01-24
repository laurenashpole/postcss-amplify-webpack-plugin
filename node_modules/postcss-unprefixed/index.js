const postcss = require('postcss')

module.exports = postcss.plugin('postcss-unprefixed', (opts = {}) => {
  let prefixes = ['-moz-', '-o-', '-ms-', '-webkit-']

  if (opts.exclude) {
    let exclude = Array.isArray(opts.exclude) ? opts.exclude : [opts.exclude]
    prefixes = prefixes.filter(prefix => !exclude.includes(prefix))
  }

  return root => {
    if (!prefixes.length) return

    root.walkDecls(RegExp(`^${ prefixes.join('|') }`), decl => {
      decl.remove()
    })
  }
})
