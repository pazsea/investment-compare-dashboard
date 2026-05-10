import type { MouseEvent } from 'react'

import type { Instrument } from '../../types/instrument'
import type { CompareRange } from './comparePerformance'

export type Props = {
  chartData: Array<Record<string, number | string>>
  onRangeChange: (event: MouseEvent<HTMLButtonElement>) => void
  range: CompareRange
  selectedInstruments: Instrument[]
}
