import { describe, expect, it } from 'vitest'

import { mockInstruments, mockProfiles } from '../../mocks/instruments'
import {
  formatWatchlistChange,
  formatWatchlistPrice,
  getInstrumentFocusLabel,
} from './watchlistPresentation'

describe('when formatting watchlist prices', () => {
  it('should show a fallback when quote data is missing', () => {
    expect(formatWatchlistPrice()).toBe('Kurs saknas')
  })

  it('should format known quote values', () => {
    expect(formatWatchlistPrice(mockProfiles[0])).toContain('293')
  })
})

describe('when formatting watchlist changes', () => {
  it('should show a fallback when change data is missing', () => {
    expect(formatWatchlistChange()).toBe('Förändring saknas')
  })

  it('should include both absolute and percentage change', () => {
    expect(formatWatchlistChange(mockProfiles[0])).toContain('(')
  })
})

describe('when choosing a watchlist focus label', () => {
  it('should prefer sector category crypto and fallback labels in order', () => {
    expect(getInstrumentFocusLabel(mockInstruments[0])).toBe('Technology')
    expect(getInstrumentFocusLabel(mockInstruments[3])).toBe('Large Blend')
    expect(getInstrumentFocusLabel(mockInstruments[5])).toBe('Digital tillgång')
    expect(
      getInstrumentFocusLabel({
        type: 'stock',
        symbol: 'TEST',
        name: 'Test Corp',
      }),
    ).toBe('Bred exponering')
  })
})
