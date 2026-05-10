import type { CompareRange } from './comparePerformance'

export const DEFAULT_COMPARE_RANGE: CompareRange = '1M'
export const DEFAULT_INVESTMENT_AMOUNT = '10000'

export const compareRangeOptions: CompareRange[] = ['1D', '1W', '1M', '1Y', '5Y']

export const compareChartColors = [
  'var(--compare-line-1, #2563EB)',
  'var(--compare-line-2, #059669)',
  'var(--compare-line-3, #D97706)',
  'var(--compare-line-4, #DC2626)',
]

export const COMPARE_CHART_MARGIN = {
  top: 8,
  right: 12,
  left: 0,
  bottom: 8,
}
