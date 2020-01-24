const postcss = require('postcss')

const plugin = require('./')

async function run (input, output, opts) {
  let result = await postcss([plugin(opts)]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

it('optimizes for AMP', async () => {
  await run(inputData.amp, outputData.amp, { excludedBlocks: ['sidebar'] })
})

const inputData = {
  amp: `
    body {
      font-size: 14px;
    }

    @media (min-width: 768px) {
      body {
        font-size: 16px;
      }
    }

    .heading {
      color: #000 !important;
    }

    .menu {
      -webkit-transition: all 0.5s ease;
      -moz-transition: all 0.5s ease;
      -ms-transition: all 0.5s ease;
      -o-transition: all 0.5s ease;
      transition: all 0.5s ease;
    }

    .-amp-image {
      width: 300px;
    }

    .sidebar {
      background: #f1f1f1;
    }
  `
}

const outputData = {
  amp: `
    body {
      font-size: 14px;
    }

    .heading {
      color: #000;
    }

    .menu {
      -webkit-transition: all 0.5s ease;
      transition: all 0.5s ease;
    }
  `
}
