import type { Instrument, InstrumentMarketCapPoint, InstrumentProfile } from '../types/instrument'
import type {
  FmpHistoricalMarketCapResponse,
  FmpProfileResponse,
  FmpSearchInstrumentResponse,
} from './fmpTypes'

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
    currency: profile.currency ?? undefined,
    exchange: profile.exchange ?? profile.exchangeFullName ?? undefined,
    industry: profile.industry ?? undefined,
    website: profile.website ?? undefined,
    description: profile.description ?? undefined,
    ceo: profile.ceo ?? undefined,
    sector: profile.sector ?? undefined,
    country: profile.country ?? undefined,
    fullTimeEmployees: profile.fullTimeEmployees ?? undefined,
    city: profile.city ?? undefined,
    state: profile.state ?? undefined,
    image: profile.image ?? undefined,
    defaultImage: profile.defaultImage ?? undefined,
    isEtf: profile.isEtf ?? undefined,
    isFund: profile.isFund ?? undefined,
    marketCap: profile.marketCap ?? undefined,
    volume: profile.volume ?? undefined,
    price: profile.price ?? undefined,
    change: profile.change ?? undefined,
    changesPercentage: profile.changePercentage ?? undefined,
  }
}

export const mapHistoricalMarketCapToPoint = (
  point: FmpHistoricalMarketCapResponse,
): InstrumentMarketCapPoint | undefined => {
  if (!point.symbol || !point.date || point.marketCap === null || point.marketCap === undefined) {
    return undefined
  }

  return {
    symbol: point.symbol,
    date: point.date,
    marketCap: point.marketCap,
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

export const isInstrumentMarketCapPoint = (
  point: InstrumentMarketCapPoint | undefined,
): point is InstrumentMarketCapPoint => {
  return Boolean(point)
}
