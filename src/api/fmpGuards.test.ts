import { describe, expect, it } from 'vitest'

import {
  isFmpProfileResponse,
  isFmpSearchInstrumentResponse,
  parseFmpProfileResponse,
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

describe('when validating FMP profile responses', () => {
  it('should accept valid profile response items', () => {
    expect(
      isFmpProfileResponse({
        symbol: 'AAPL',
        companyName: 'Apple Inc.',
        exchange: 'NASDAQ',
        isEtf: false,
      }),
    ).toBe(true)
  })

  it('should accept nullable profile fields from FMP', () => {
    expect(
      isFmpProfileResponse({
        symbol: 'NOBA.ST',
        companyName: 'NOBA Bank Group AB',
        exchange: 'STO',
        state: null,
        isEtf: false,
        isFund: false,
      }),
    ).toBe(true)
  })

  it('should reject malformed profile response items', () => {
    expect(isFmpProfileResponse({ symbol: 'AAPL', companyName: 12 })).toBe(false)
    expect(
      parseFmpProfileResponse([{ symbol: 'AAPL', companyName: 'Apple Inc.' }, null]),
    ).toHaveLength(1)
  })
})
