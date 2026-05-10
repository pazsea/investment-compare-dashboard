import type { Instrument, InstrumentQuote } from '../../types/instrument'

export const formatWatchlistPrice = (quote?: InstrumentQuote) => {
  if (!quote) {
    return 'Kurs saknas'
  }

  const currency = quote.currency ?? 'USD'

  try {
    return new Intl.NumberFormat('sv-SE', {
      currency,
      style: 'currency',
    }).format(quote.price)
  } catch {
    return `${quote.price.toFixed(2)} ${currency}`
  }
}

export const formatWatchlistChange = (quote?: InstrumentQuote) => {
  if (!quote) {
    return 'Förändring saknas'
  }

  const prefix = quote.change > 0 ? '+' : ''

  return `${prefix}${quote.change.toFixed(2)} (${prefix}${quote.changesPercentage.toFixed(2)}%)`
}

export const getInstrumentFocusLabel = (instrument: Instrument) => {
  if ('sector' in instrument && instrument.sector) {
    return instrument.sector
  }

  if ('category' in instrument && instrument.category) {
    return instrument.category
  }

  if (instrument.type === 'crypto') {
    return 'Digital tillgång'
  }

  return 'Bred exponering'
}

export const getInstrumentDetailsPath = (symbol: string) => {
  return `/instrument/${encodeURIComponent(symbol)}`
}
