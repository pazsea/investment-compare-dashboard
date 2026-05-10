export type FmpSearchInstrumentResponse = {
  symbol?: string
  name?: string
  currency?: string
  exchange?: string
  exchangeShortName?: string
  exchangeFullName?: string
  stockExchange?: string
}

export type FmpProfileResponse = {
  symbol?: string
  price?: number
  marketCap?: number
  companyName?: string
  currency?: string
  exchangeFullName?: string
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
  isEtf?: boolean
  isFund?: boolean
  volume?: number
  change?: number
  changePercentage?: number
}
