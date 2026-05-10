import { describe, expect, it } from 'vitest'

import {
  isFmpQuoteResponse,
  isFmpSearchInstrumentResponse,
  parseFmpQuoteResponse,
  parseFmpSearchResponse,
} from './fmpGuards'

describe('when validating FMP search responses', () => {
  it('should accept valid search response items', () => {
    expect(
      isFmpSearchInstrumentResponse({
        symbol: 'AAPL',
        name: 'Apple Inc.',
        currency: 'USD',
        exchange: 'NASDAQ',
      }),
    ).toBe(true)
  })

  it('should reject malformed search response items', () => {
    expect(isFmpSearchInstrumentResponse({ symbol: 123, name: 'Apple Inc.' })).toBe(false)
    expect(parseFmpSearchResponse([{ symbol: 'AAPL', name: 'Apple Inc.' }, null])).toHaveLength(1)
  })
})

describe('when validating FMP quote responses', () => {
  it('should accept valid quote response items', () => {
    expect(
      isFmpQuoteResponse({
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 293.32,
        change: 5.88,
      }),
    ).toBe(true)
  })

  it('should reject malformed quote response items', () => {
    expect(isFmpQuoteResponse({ symbol: 'AAPL', price: '293.32' })).toBe(false)
    expect(parseFmpQuoteResponse([{ symbol: 'AAPL', name: 'Apple Inc.', price: 293.32 }, []])).toHaveLength(1)
  })
})
