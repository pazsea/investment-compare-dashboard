import type { Instrument, InstrumentQuote } from '../types/instrument'
import type { FmpQuoteResponse, FmpSearchInstrumentResponse } from './fmpTypes'

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

export const mapQuoteToInstrumentQuote = (
  quote: FmpQuoteResponse,
): InstrumentQuote | undefined => {
  if (!quote.symbol || !quote.name || quote.price === undefined) {
    return undefined
  }

  return {
    symbol: quote.symbol,
    name: quote.name,
    price: quote.price,
    change: quote.change ?? 0,
    changesPercentage: quote.changesPercentage ?? quote.changePercentage ?? 0,
    currency: quote.currency,
    exchange: quote.exchange,
  }
}

export const isInstrument = (instrument: Instrument | undefined): instrument is Instrument => {
  return Boolean(instrument)
}

export const isInstrumentQuote = (
  quote: InstrumentQuote | undefined,
): quote is InstrumentQuote => {
  return Boolean(quote)
}
