/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest'

import { isNode, isRecord } from './sharedTypeguards'

describe('when checking shared runtime values', () => {
  it('should accept plain records and reject arrays', () => {
    expect(isRecord({ symbol: 'AAPL' })).toBe(true)
    expect(isRecord(['AAPL'])).toBe(false)
    expect(isRecord(null)).toBe(false)
  })

  it('should identify dom nodes', () => {
    const node = document.createElement('div')

    expect(isNode(node)).toBe(true)
    expect(isNode({})).toBe(false)
  })
})
