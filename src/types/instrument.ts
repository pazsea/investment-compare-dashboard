export type InstrumentType = 'stock' | 'fund' | 'crypto' | 'etf'

export type BaseInstrument = {
  symbol: string
  name: string
  currency?: string
  exchange?: string
}

export type StockInstrument = BaseInstrument & {
  type: 'stock'
  sector?: string
}

export type FundInstrument = BaseInstrument & {
  type: 'fund'
  category?: string
}

export type CryptoInstrument = BaseInstrument & {
  type: 'crypto'
}

export type EtfInstrument = BaseInstrument & {
  type: 'etf'
  category?: string
}

export type Instrument = StockInstrument | FundInstrument | CryptoInstrument | EtfInstrument

export type InstrumentQuote = {
  symbol: string
  name: string
  price: number
  change: number
  changesPercentage: number
  currency?: string
  exchange?: string
}
