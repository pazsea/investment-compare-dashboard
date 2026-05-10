export type FmpSearchInstrumentResponse = {
  symbol?: string
  name?: string
  currency?: string
  exchange?: string
  exchangeShortName?: string
  exchangeFullName?: string
  stockExchange?: string
}

export type FmpQuoteResponse = {
  symbol?: string
  name?: string
  price?: number
  change?: number
  changePercentage?: number
  changesPercentage?: number
  currency?: string
  exchange?: string
}
