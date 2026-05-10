import { describe, expect, it } from 'vitest'

import { isStoredInstrument } from './storedInstrument'

describe('when checking persisted instrument values', () => {
  it('should accept valid stored instruments', () => {
    expect(
      isStoredInstrument({
        type: 'stock',
        symbol: 'AAPL',
        name: 'Apple Inc.',
      }),
    ).toBe(true)
  })

  it('should reject malformed stored values', () => {
    expect(isStoredInstrument({ type: 'bond', symbol: 'BND', name: 'Bond Fund' })).toBe(false)
    expect(isStoredInstrument({ symbol: 'AAPL' })).toBe(false)
    expect(isStoredInstrument(null)).toBe(false)
  })
})
