type NullableString = string | null
type NullableNumber = number | null
type NullableBoolean = boolean | null

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
  symbol?: NullableString
  price?: NullableNumber
  marketCap?: NullableNumber
  companyName?: NullableString
  currency?: NullableString
  exchangeFullName?: NullableString
  exchange?: NullableString
  industry?: NullableString
  website?: NullableString
  description?: NullableString
  ceo?: NullableString
  sector?: NullableString
  country?: NullableString
  fullTimeEmployees?: NullableString
  city?: NullableString
  state?: NullableString
  image?: NullableString
  isEtf?: NullableBoolean
  isFund?: NullableBoolean
  volume?: NullableNumber
  change?: NullableNumber
  changePercentage?: NullableNumber
}
