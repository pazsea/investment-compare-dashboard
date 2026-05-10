import type { Instrument, InstrumentProfile } from '../../types/instrument'
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

const seriesLabels = ['Öppning', '10:00', '11:30', '13:00', '14:30', 'Stängning']

const hashSymbol = (symbol: string) => {
  return symbol.split('').reduce((total, character) => total + character.charCodeAt(0), 0)
}

export const getDetailsSeries = (profile: InstrumentProfile): DetailsSeriesPoint[] => {
  const hash = hashSymbol(profile.symbol)
  const currentPrice = profile.price ?? 0
  const change = profile.change ?? 0
  const basePrice = currentPrice - change
  const drift = change / Math.max(seriesLabels.length - 1, 1)

  return seriesLabels.map((label, index) => {
    const wave =
      Math.sin(index + hash / 15) * Math.max(Math.abs(change) * 0.16, currentPrice * 0.0035)
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
      label: 'Sektor',
      value: instrument.sector ?? 'Verksamhetsdrivet bolag',
    }
  }

  if (isEtfInstrument(instrument) || isFundInstrument(instrument)) {
    return {
      label: 'Kategori',
      value: instrument.category ?? 'Bred marknadsexponering',
    }
  }

  if (isCryptoInstrument(instrument)) {
    return {
      label: 'Nätverk',
      value: 'Digital tillgångsmarknad',
    }
  }

  return {
    label: 'Fokus',
    value: 'Marknadsexponering',
  }
}

export const getInstrumentNarrative = (instrument: Instrument) => {
  if (isStockInstrument(instrument)) {
    return `${instrument.name} presenteras här som en bolagseksponering med fokus på prisrörelse, handelsplats och sektorkontext för jämförelseflöden.`
  }

  if (isEtfInstrument(instrument)) {
    return `${instrument.name} ger diversifierad exponering som är användbar när enskilda innehav ska jämföras mot en indexnära allokering.`
  }

  if (isFundInstrument(instrument)) {
    return `${instrument.name} visas som ett samlat fondinnehav så att diversifierade placeringar kan jämföras mot aktier eller ETF-alternativ.`
  }

  return `${instrument.name} behandlas som en digital tillgång med löpande handel och högre kortsiktig volatilitet.`
}

export const getTrendLabel = (profile: InstrumentProfile) => {
  if ((profile.changesPercentage ?? 0) >= 1) {
    return 'Positiv handelsdag'
  }

  if ((profile.changesPercentage ?? 0) <= -1) {
    return 'Negativ handelsdag'
  }

  return 'Sidledes handelsdag'
}
