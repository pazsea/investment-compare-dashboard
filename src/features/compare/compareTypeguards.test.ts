import { describe, expect, it } from 'vitest'

import { isCompareRange } from './compareTypeguards'

describe('when validating compare ranges', () => {
  it('should accept supported compare ranges', () => {
    expect(isCompareRange('1D')).toBe(true)
    expect(isCompareRange('5Y')).toBe(true)
  })

  it('should reject unsupported compare ranges', () => {
    expect(isCompareRange('3M')).toBe(false)
    expect(isCompareRange('')).toBe(false)
  })
})
