/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest'

import {
  isSearchHistoryItem,
  isSearchInteractionTarget,
} from './globalSearchTypeguards'

describe('when checking saved global search items', () => {
  it('should accept valid recent search items', () => {
    expect(
      isSearchHistoryItem({
        symbol: 'AAPL',
        name: 'Apple Inc.',
        type: 'stock',
      }),
    ).toBe(true)
  })

  it('should reject malformed recent search items', () => {
    expect(isSearchHistoryItem({ symbol: 'AAPL', name: 'Apple Inc.', type: 'bond' })).toBe(false)
    expect(isSearchHistoryItem({ symbol: 'AAPL' })).toBe(false)
  })
})

describe('when checking global search interaction targets', () => {
  it('should accept dom nodes and reject plain objects', () => {
    expect(isSearchInteractionTarget(document.createElement('button'))).toBe(true)
    expect(isSearchInteractionTarget({})).toBe(false)
  })
})
