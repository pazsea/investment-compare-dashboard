import { describe, expect, it } from 'vitest'

import { mockInstruments } from '../mocks/instruments'
import {
  canUseLiveQuoteForInstrument,
  canUseLiveQuoteForSymbol,
} from './fmpAvailability'

describe('when checking if a symbol can use the live quote endpoint', () => {
  it('should reject common premium-only symbol patterns', () => {
    expect(canUseLiveQuoteForSymbol('SAVE.ST')).toBe(false)
    expect(canUseLiveQuoteForSymbol('VTSAX')).toBe(false)
  })

  it('should allow common free-plan friendly symbols', () => {
    expect(canUseLiveQuoteForSymbol('AAPL')).toBe(true)
    expect(canUseLiveQuoteForSymbol('BTCUSD')).toBe(true)
  })
})

describe('when checking if an instrument can use the live quote endpoint', () => {
  it('should reject funds and unsupported exchanges', () => {
    expect(canUseLiveQuoteForInstrument(mockInstruments[4])).toBe(false)
    expect(
      canUseLiveQuoteForInstrument({
        ...mockInstruments[0],
        exchange: 'Stockholm',
      }),
    ).toBe(false)
  })

  it('should allow supported US instruments and crypto', () => {
    expect(canUseLiveQuoteForInstrument(mockInstruments[0])).toBe(true)
    expect(canUseLiveQuoteForInstrument(mockInstruments[5])).toBe(true)
  })
})
