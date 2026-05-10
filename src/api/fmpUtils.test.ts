import { describe, expect, it } from 'vitest'

import { mergeSearchResults } from './fmpUtils'

describe('when merging FMP search responses', () => {
  it('should keep unique symbols with later results replacing earlier duplicates', () => {
    const results = mergeSearchResults(
      [{ symbol: 'AAPL', name: 'Apple Inc.' }],
      [
        { symbol: 'AAPL', name: 'Apple' },
        { symbol: 'MSFT', name: 'Microsoft Corporation' },
      ],
    )

    expect(results).toEqual([
      { symbol: 'AAPL', name: 'Apple' },
      { symbol: 'MSFT', name: 'Microsoft Corporation' },
    ])
  })
})
