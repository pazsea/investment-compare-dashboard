import type { Instrument, InstrumentProfile } from '../types/instrument'
import type { FmpProfileResponse, FmpSearchInstrumentResponse } from './fmpTypes'

export const inferInstrumentType = (symbol: string, name: string): Instrument['type'] => {
  const normalizedSymbol = symbol.toUpperCase()
  const normalizedName = name.toLowerCase()

  if (normalizedSymbol.endsWith('USD') && !normalizedSymbol.includes('.')) {
    return 'crypto'
  }

  if (normalizedName.includes(' etf') || normalizedName.includes('exchange traded fund')) {
    return 'etf'
  }

  if (normalizedName.includes('fund')) {
    return 'fund'
  }

  return 'stock'
}

export const mapSearchResultToInstrument = (
  result: FmpSearchInstrumentResponse,
): Instrument | undefined => {
  if (!result.symbol || !result.name) {
    return undefined
  }

  const exchange =
    result.exchange ?? result.exchangeShortName ?? result.exchangeFullName ?? result.stockExchange

  return {
    type: inferInstrumentType(result.symbol, result.name),
    symbol: result.symbol,
    name: result.name,
    currency: result.currency,
    exchange,
  }
}

export const mapProfileToInstrumentProfile = (
  profile: FmpProfileResponse,
): InstrumentProfile | undefined => {
  if (!profile.symbol || !profile.companyName) {
    return undefined
  }

  return {
    symbol: profile.symbol,
    name: profile.companyName,
    currency: profile.currency,
    exchange: profile.exchange ?? profile.exchangeFullName,
    industry: profile.industry,
    website: profile.website,
    description: profile.description,
    ceo: profile.ceo,
    sector: profile.sector,
    country: profile.country,
    fullTimeEmployees: profile.fullTimeEmployees,
    city: profile.city,
    state: profile.state,
    image: profile.image,
    isEtf: profile.isEtf,
    isFund: profile.isFund,
    marketCap: profile.marketCap,
    volume: profile.volume,
    price: profile.price,
    change: profile.change,
    changesPercentage: profile.changePercentage,
  }
}

export const isInstrument = (instrument: Instrument | undefined): instrument is Instrument => {
  return Boolean(instrument)
}

export const isInstrumentProfile = (
  profile: InstrumentProfile | undefined,
): profile is InstrumentProfile => {
  return Boolean(profile)
}
