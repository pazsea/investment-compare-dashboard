import type { Instrument } from '../types/instrument'

export const getInstrumentTypeLabel = (type: Instrument['type']) => {
  switch (type) {
    case 'stock':
      return 'Aktie'
    case 'fund':
      return 'Fond'
    case 'crypto':
      return 'Krypto'
    case 'etf':
      return 'ETF'
  }
}

export const getCurrencyLabel = (currency?: string) => {
  return currency ?? 'Valuta saknas'
}

export const getExchangeLabel = (exchange?: string) => {
  return exchange ?? 'Marknad saknas'
}
