const postcss = require('postcss')

const plugin = require('./')

async function run (input, output, opts) {
  let result = await postcss([plugin(opts)]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

it('removes min-width media queries', async () => {
  await run(inputData.mq, outputData.mq, {})
})

it('preserves max-width media queries', async () => {
  await run(inputData.mqMax, outputData.mqMax, {})
})

it('preserves min-width media queries based on max breakpoint', async () => {
  await run(inputData.mqBreakpoint, outputData.mqBreakpoint, {
    maxBreakpoint: '768px'
  })
})

const inputData = {
  mq: `
    body {
      font-size: 14px;
    }

    @media (min-width: 768px) {
      body {
        font-size: 16px;
      }
    }
  `,
  mqMax: `
    body {
      font-size: 14px;
    }

    @media (max-width: 768px) {
      body {
        color: #000;
      }
    }
  `,
  mqBreakpoint: `
    body {
      font-size: 14px;
    }

    @media (min-width: 500px) {
      body {
        font-size: 16px;
      }
    }
  `
}

const outputData = {
  mq: `
    body {
      font-size: 14px;
    }
  `,
  mqMax: `
    body {
      font-size: 14px;
    }

    @media (max-width: 768px) {
      body {
        color: #000;
      }
    }
  `,
  mqBreakpoint: `
    body {
      font-size: 14px;
    }

    @media (min-width: 500px) {
      body {
        font-size: 16px;
      }
    }
  `
}
