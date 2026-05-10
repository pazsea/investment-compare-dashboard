import { describe, expect, it } from 'vitest'

import {
  inferInstrumentType,
  isInstrument,
  isInstrumentProfile,
  mapProfileToInstrumentProfile,
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

describe('when mapping FMP profile results', () => {
  it('should create domain profiles when required fields exist', () => {
    expect(
      mapProfileToInstrumentProfile({
        symbol: 'AAPL',
        companyName: 'Apple Inc.',
        exchange: 'NASDAQ',
        sector: 'Technology',
      }),
    ).toEqual({
      symbol: 'AAPL',
      name: 'Apple Inc.',
      currency: undefined,
      exchange: 'NASDAQ',
      industry: undefined,
      website: undefined,
      description: undefined,
      ceo: undefined,
      sector: 'Technology',
      country: undefined,
      fullTimeEmployees: undefined,
      city: undefined,
      state: undefined,
      image: undefined,
      isEtf: undefined,
      isFund: undefined,
      marketCap: undefined,
      volume: undefined,
      price: undefined,
      change: undefined,
      changesPercentage: undefined,
    })
  })

  it('should skip incomplete profile payloads', () => {
    expect(isInstrumentProfile(mapProfileToInstrumentProfile({ symbol: 'AAPL' }))).toBe(false)
  })
})
