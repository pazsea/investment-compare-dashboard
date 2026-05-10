import { compareRangeOptions } from './compareConstants'
import type { CompareRange } from './comparePerformance'

const compareRangeSet = new Set<string>(compareRangeOptions)

export const isCompareRange = (value: string): value is CompareRange => {
  return compareRangeSet.has(value)
}
