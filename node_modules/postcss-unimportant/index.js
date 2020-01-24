const postcss = require('postcss')

module.exports = postcss.plugin('postcss-unimportant', () => {
  return root => {
    root.walkDecls(decl => {
      decl.important = false
    })
  }
})
