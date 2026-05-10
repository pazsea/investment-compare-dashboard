import { describe, expect, it } from 'vitest'

import { getCompareChartData, getMarketCapChangePercentage } from './compareHistory'

describe('when building compare chart rows from market cap history', () => {
  it('should normalize each series to the first available day', () => {
    const rows = getCompareChartData({
      AAPL: [
        { symbol: 'AAPL', date: '2026-04-01', marketCap: 100 },
        { symbol: 'AAPL', date: '2026-04-08', marketCap: 110 },
      ],
      MSFT: [
        { symbol: 'MSFT', date: '2026-04-01', marketCap: 200 },
        { symbol: 'MSFT', date: '2026-04-08', marketCap: 180 },
      ],
    })

    expect(rows[0]).toMatchObject({
      AAPL: 100,
      MSFT: 100,
    })
    expect(rows[1]).toMatchObject({
      AAPL: 110,
      MSFT: 90,
    })
  })
})

describe('when summarizing monthly market cap change', () => {
  it('should calculate the percentage change across the available window', () => {
    expect(
      getMarketCapChangePercentage([
        { symbol: 'AAPL', date: '2026-04-01', marketCap: 100 },
        { symbol: 'AAPL', date: '2026-04-08', marketCap: 112 },
      ]),
    ).toBe(12)
  })
})
