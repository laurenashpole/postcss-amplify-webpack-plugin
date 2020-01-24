const postcss = require('postcss')

const plugin = require('./')

async function run (input, output, opts) {
  let result = await postcss([plugin(opts)]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

it('removes vendor prefixes', async () => {
  await run(inputData.prefixes, outputData.prefixes, {})
})

it('preserves excluded vendor prefixes', async () => {
  await run(inputData.prefixesExcluded, outputData.prefixesExcluded, {
    exclude: '-webkit-'
  })
})

it('preserves multiple excluded vendor prefixes', async () => {
  await run(inputData.prefixesMultiExcluded, outputData.prefixesMultiExcluded, {
    exclude: ['-webkit-', '-moz-']
  })
})

it('returns root if all vendor prefixes are excluded', async () => {
  await run(inputData.prefixesAllExcluded, outputData.prefixesAllExcluded, {
    exclude: ['-webkit-', '-moz-', '-o-', '-ms-']
  })
})

const inputData = {
  prefixes: `
    div {
      -webkit-transition: all 4s ease;
      -moz-transition: all 4s ease;
      -ms-transition: all 4s ease;
      -o-transition: all 4s ease;
      transition: all 4s ease;
    }
  `,
  prefixesExcluded: `
    div {
      -webkit-transition: all 4s ease;
      -moz-transition: all 4s ease;
      -ms-transition: all 4s ease;
      -o-transition: all 4s ease;
      transition: all 4s ease;
    }
  `,
  prefixesMultiExcluded: `
    div {
      -webkit-transition: all 4s ease;
      -moz-transition: all 4s ease;
      -ms-transition: all 4s ease;
      -o-transition: all 4s ease;
      transition: all 4s ease;
    }
  `,
  prefixesAllExcluded: `
    div {
      -webkit-transition: all 4s ease;
      -moz-transition: all 4s ease;
      -ms-transition: all 4s ease;
      -o-transition: all 4s ease;
      transition: all 4s ease;
    }
  `
}

const outputData = {
  prefixes: `
    div {
      transition: all 4s ease;
    }
  `,
  prefixesExcluded: `
    div {
      -webkit-transition: all 4s ease;
      transition: all 4s ease;
    }
  `,
  prefixesMultiExcluded: `
    div {
      -webkit-transition: all 4s ease;
      -moz-transition: all 4s ease;
      transition: all 4s ease;
    }
  `,
  prefixesAllExcluded: `
    div {
      -webkit-transition: all 4s ease;
      -moz-transition: all 4s ease;
      -ms-transition: all 4s ease;
      -o-transition: all 4s ease;
      transition: all 4s ease;
    }
  `
}
