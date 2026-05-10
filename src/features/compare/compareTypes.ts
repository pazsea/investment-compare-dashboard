import type { Instrument } from '../../types/instrument'
import type { CompareMetric } from './comparePerformance'

export type CompareMetricEntry = {
  instrument: Instrument
  values: CompareMetric
}

export type CompareScenarioEntry = CompareMetricEntry & {
  endingValue: number
  gainLoss: number
}
