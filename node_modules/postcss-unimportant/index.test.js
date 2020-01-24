const postcss = require('postcss')

const plugin = require('./')

async function run (input, output) {
  let result = await postcss([plugin()]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

it('removes vendor prefixes', async () => {
  await run(inputData.important, outputData.important)
})

const inputData = {
  important: `
    body {
      color: #000 !important;
      font-size: 16px;
    }
  `
}

const outputData = {
  important: `
    body {
      color: #000;
      font-size: 16px;
    }
  `
}
