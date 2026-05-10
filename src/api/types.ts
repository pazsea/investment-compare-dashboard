import type { Instrument } from '../types/instrument'

export type { Instrument, InstrumentQuote } from '../types/instrument'

export type SearchResult = {
  results: Instrument[]
  total: number
}
