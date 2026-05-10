import { describe, expect, it } from 'vitest'

import {
  inferInstrumentType,
  isInstrument,
  isInstrumentQuote,
  mapQuoteToInstrumentQuote,
  mapSearchResultToInstrument,
} from './fmpMappers'

describe('when inferring instrument types from FMP data', () => {
  it('should infer known instrument categories', () => {
    expect(inferInstrumentType('BTCUSD', 'Bitcoin USD')).toBe('crypto')
    expect(inferInstrumentType('VOO', 'Vanguard S&P 500 ETF')).toBe('etf')
    expect(inferInstrumentType('VTSAX', 'Vanguard Total Stock Market Index Fund')).toBe('fund')
    expect(inferInstrumentType('AAPL', 'Apple Inc.')).toBe('stock')
  })
})

describe('when mapping FMP search results', () => {
  it('should create domain instruments when required fields exist', () => {
    expect(
      mapSearchResultToInstrument({
        symbol: 'NVDA',
        name: 'NVIDIA Corporation',
        currency: 'USD',
        stockExchange: 'NASDAQ',
      }),
    ).toEqual({
      type: 'stock',
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      currency: 'USD',
      exchange: 'NASDAQ',
    })
  })

  it('should skip incomplete results', () => {
    expect(isInstrument(mapSearchResultToInstrument({ symbol: 'AAPL' }))).toBe(false)
  })
})

describe('when mapping FMP quote results', () => {
  it('should create domain quotes when required fields exist', () => {
    expect(
      mapQuoteToInstrumentQuote({
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 293.32,
        changePercentage: 2.05,
      }),
    ).toEqual({
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 293.32,
      change: 0,
      changesPercentage: 2.05,
      currency: undefined,
      exchange: undefined,
    })
  })

  it('should skip incomplete quotes', () => {
    expect(isInstrumentQuote(mapQuoteToInstrumentQuote({ symbol: 'AAPL', name: 'Apple Inc.' }))).toBe(false)
  })
})
