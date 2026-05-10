import type { Instrument } from '../../types/instrument'

export type SearchHistoryItem = {
  name: string
  symbol: string
  type: Instrument['type']
}
