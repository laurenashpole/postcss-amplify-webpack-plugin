const postcss = require('postcss')

const plugin = require('./')

async function run (input, output, opts) {
  let result = await postcss([plugin(opts)]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

it('removes excluded block', async () => {
  await run(inputData.block, outputData.block, {
    exclude: 'widget'
  })
})

it('removes multiple excluded blocks', async () => {
  await run(inputData.multiBlocks, outputData.multiBlocks, {
    exclude: ['widget', 'sidebar']
  })
})

it('only removes excluded blocks based on prefix', async () => {
  await run(inputData.prefixBlocks, outputData.prefixBlocks, {
    exclude: 'widget'
  })
})

it('returns root if no blocks are excluded', async () => {
  await run(inputData.noBlocks, outputData.noBlocks, {})
})

const inputData = {
  block: `
    .content {
      font-size: 16px;
    }

    .sidebar {
      background: #f1f1f1;
    }

    .widget {
      width: 200px;
    }

    .widget__heading {
      font-size: 24px;
    }
  `,
  multiBlocks: `
    .content {
      font-size: 16px;
    }

    .sidebar {
      background: #f1f1f1;
    }

    .widget {
      width: 200px;
    }

    .widget__heading {
      font-size: 24px;
    }
  `,
  prefixBlocks: `
    .content {
      font-size: 16px;
    }

    .sidebar {
      background: #f1f1f1;
    }

    .sidebar-widget {
      color: #000
    }

    .widget {
      width: 200px;
    }

    .widget__heading {
      font-size: 24px;
    }
  `,
  noBlocks: `
    .content {
      font-size: 16px;
    }

    .sidebar {
      background: #f1f1f1;
    }
  `
}

const outputData = {
  block: `
    .content {
      font-size: 16px;
    }

    .sidebar {
      background: #f1f1f1;
    }
  `,
  multiBlocks: `
    .content {
      font-size: 16px;
    }
  `,
  prefixBlocks: `
    .content {
      font-size: 16px;
    }

    .sidebar {
      background: #f1f1f1;
    }

    .sidebar-widget {
      color: #000
    }
  `,
  noBlocks: `
    .content {
      font-size: 16px;
    }

    .sidebar {
      background: #f1f1f1;
    }
  `
}
