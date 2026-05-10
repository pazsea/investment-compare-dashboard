import type { MouseEvent } from 'react'

import type { Instrument } from '../../types/instrument'
import type { CompareMetricEntry } from './compareTypes'

export type Props = {
  metrics: CompareMetricEntry[]
  onRemoveFromCompare: (event: MouseEvent<HTMLButtonElement>) => void
  selectedInstruments: Instrument[]
}
