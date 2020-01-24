const postcss = require('postcss')
const postcssExcludeBlocks = require('postcss-exclude-blocks')
const postcssMobileOnlyMqs = require('postcss-mobile-only-mqs')
const postcssRemoveAmpStyling = require('postcss-remove-amp-styling')
const postcssUnimportant = require('postcss-unimportant')
const postcssUnprefixed = require('postcss-unprefixed')

module.exports = postcss.plugin('postcss-amplify', (opts = {}) => {
  return root => {
    return postcss([
      postcssExcludeBlocks({
        exclude: opts.excludedBlocks || []
      }),
      postcssMobileOnlyMqs({
        maxBreakpoint: opts.maxBreakpoint || '0px'
      }),
      postcssRemoveAmpStyling(),
      postcssUnimportant(),
      postcssUnprefixed({
        exclude: '-webkit-'
      })
    ]).process(root, { from: undefined })
  }
})
