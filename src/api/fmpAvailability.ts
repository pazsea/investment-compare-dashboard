import type { Instrument } from '../types/instrument'

const FREE_QUOTE_EXCHANGES = new Set(['AMEX', 'CBOE', 'CCC', 'NASDAQ', 'NYSE', 'NYSE Arca'])

const MUTUAL_FUND_SYMBOL_LENGTH = 5
const MUTUAL_FUND_SYMBOL_SUFFIX = 'X'

export const canUseLiveQuoteForSymbol = (symbol: string) => {
  const normalizedSymbol = symbol.trim().toUpperCase()

  if (!normalizedSymbol) {
    return false
  }

  if (normalizedSymbol.includes('.')) {
    return false
  }

  if (
    normalizedSymbol.length === MUTUAL_FUND_SYMBOL_LENGTH &&
    normalizedSymbol.endsWith(MUTUAL_FUND_SYMBOL_SUFFIX)
  ) {
    return false
  }

  return true
}

export const canUseLiveQuoteForInstrument = (instrument: Instrument) => {
  if (!canUseLiveQuoteForSymbol(instrument.symbol)) {
    return false
  }

  if (instrument.type === 'fund') {
    return false
  }

  if (instrument.type === 'crypto') {
    return true
  }

  return instrument.exchange ? FREE_QUOTE_EXCHANGES.has(instrument.exchange) : true
}
