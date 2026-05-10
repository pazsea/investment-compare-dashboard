import type { Instrument } from '../../types/instrument'

export type Props = {
  chartData: Array<Record<string, number | string>>
  selectedInstruments: Instrument[]
}
