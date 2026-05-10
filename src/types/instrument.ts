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

export type InstrumentProfile = {
  symbol: string
  name: string
  currency?: string
  exchange?: string
  industry?: string
  website?: string
  description?: string
  ceo?: string
  sector?: string
  country?: string
  fullTimeEmployees?: string
  city?: string
  state?: string
  image?: string
  defaultImage?: boolean
  isEtf?: boolean
  isFund?: boolean
  marketCap?: number
  volume?: number
  price?: number
  change?: number
  changesPercentage?: number
}

export type InstrumentMarketCapPoint = {
  symbol: string
  date: string
  marketCap: number
}
