import { describe, expect, it } from 'vitest'

import {
  formatRoundedChartTick,
  getRoundedChartDomainMax,
  getRoundedChartDomainMin,
} from './chartPresentation'

describe('when formatting chart ticks', () => {
  it('should round values to whole numbers', () => {
    expect(formatRoundedChartTick(134.98)).toBe('135')
    expect(formatRoundedChartTick(134.12)).toBe('134')
  })
})

describe('when calculating rounded chart domains', () => {
  it('should floor the minimum and ceil the maximum', () => {
    expect(getRoundedChartDomainMin(134.98)).toBe(134)
    expect(getRoundedChartDomainMax(134.02)).toBe(135)
  })
})
