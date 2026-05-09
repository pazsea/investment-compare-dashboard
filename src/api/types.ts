export interface Instrument {
  symbol: string
  name: string
  type: string
  exchange: string
}

export interface InstrumentDetails extends Instrument {
  description: string
  currency: string
  price: number
  changesPercentage: number
}

export interface SearchResult {
  results: Instrument[]
  total: number
}
