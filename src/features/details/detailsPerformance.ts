import type { Instrument, InstrumentQuote } from '../../types/instrument'
import {
  isCryptoInstrument,
  isEtfInstrument,
  isFundInstrument,
  isStockInstrument,
} from '../../utils/typeguards'

export type DetailsSeriesPoint = {
  label: string
  price: number
}

const seriesLabels = ['Open', '10:00', '11:30', '13:00', '14:30', 'Close']

const hashSymbol = (symbol: string) => {
  return symbol.split('').reduce((total, character) => total + character.charCodeAt(0), 0)
}

export const getDetailsSeries = (quote: InstrumentQuote): DetailsSeriesPoint[] => {
  const hash = hashSymbol(quote.symbol)
  const basePrice = quote.price - quote.change
  const drift = quote.change / Math.max(seriesLabels.length - 1, 1)

  return seriesLabels.map((label, index) => {
    const wave = Math.sin(index + hash / 15) * Math.max(Math.abs(quote.change) * 0.16, quote.price * 0.0035)
    const price = basePrice + drift * index + wave

    return {
      label,
      price: Number(price.toFixed(2)),
    }
  })
}

export const getInstrumentFocus = (instrument: Instrument) => {
  if (isStockInstrument(instrument)) {
    return {
      label: 'Sector',
      value: instrument.sector ?? 'Diversified operating business',
    }
  }

  if (isEtfInstrument(instrument) || isFundInstrument(instrument)) {
    return {
      label: 'Category',
      value: instrument.category ?? 'Broad market exposure',
    }
  }

  if (isCryptoInstrument(instrument)) {
    return {
      label: 'Network',
      value: 'Digital asset market',
    }
  }

  return {
    label: 'Focus',
    value: 'Market exposure',
  }
}

export const getInstrumentNarrative = (instrument: Instrument) => {
  if (isStockInstrument(instrument)) {
    return `${instrument.name} is presented here as an operating company exposure with emphasis on price movement, market venue, and sector context for comparison workflows.`
  }

  if (isEtfInstrument(instrument)) {
    return `${instrument.name} gives diversified exposure that is useful when benchmarking single-name positions against an index-style allocation.`
  }

  if (isFundInstrument(instrument)) {
    return `${instrument.name} is shown as a pooled vehicle so investors can compare diversified holdings against direct equity or ETF alternatives.`
  }

  return `${instrument.name} is treated as a digital asset instrument with continuous market trading and heightened short-term volatility.`
}

export const getTrendLabel = (quote: InstrumentQuote) => {
  if (quote.changesPercentage >= 1) {
    return 'Positive session'
  }

  if (quote.changesPercentage <= -1) {
    return 'Negative session'
  }

  return 'Range bound session'
}
