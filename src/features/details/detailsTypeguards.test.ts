import { describe, expect, it } from 'vitest'

import { isDetailsLocationState } from './detailsTypeguards'

describe('when checking details page router state', () => {
  it('should accept valid instrument state', () => {
    expect(
      isDetailsLocationState({
        instrument: {
          type: 'stock',
          symbol: 'AAPL',
          name: 'Apple Inc.',
        },
      }),
    ).toBe(true)
  })

  it('should reject malformed router state', () => {
    expect(isDetailsLocationState({ instrument: { symbol: 'AAPL' } })).toBe(false)
    expect(isDetailsLocationState('AAPL')).toBe(false)
  })
})
