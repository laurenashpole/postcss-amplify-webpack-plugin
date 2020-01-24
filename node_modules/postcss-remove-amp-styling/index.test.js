const postcss = require('postcss')

const plugin = require('./')

async function run (input, output) {
  let result = await postcss([plugin()]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

it('removes -amp- classes', async () => {
  await run(inputData.amp, outputData.amp)
})

it('removes -i-amp- tags', async () => {
  await run(inputData.ampI, outputData.ampI)
})

const inputData = {
  amp: `
    body {
      font-size: 16px;
    }

    .-amp-body {
      color: #000;
      font-size: 16px;
    }
  `,
  ampI: `
    body {
      font-size: 16px;
    }

    -i-amp {
      color: #000;
      font-size: 16px;
    }
  `
}

const outputData = {
  amp: `
    body {
      font-size: 16px;
    }
  `,
  ampI: `
    body {
      font-size: 16px;
    }
  `
}
