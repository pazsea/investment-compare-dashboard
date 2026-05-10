import type { Instrument, InstrumentProfile } from '../../types/instrument'
import { getInstrumentDetailsPath } from '../../utils/instrumentRoutes'

export const formatWatchlistPrice = (profile?: InstrumentProfile) => {
  if (!profile || profile.price === undefined) {
    return 'Kurs saknas'
  }

  const currency = profile.currency ?? 'USD'

  try {
    return new Intl.NumberFormat('sv-SE', {
      currency,
      style: 'currency',
    }).format(profile.price)
  } catch {
    return `${profile.price.toFixed(2)} ${currency}`
  }
}

export const formatWatchlistChange = (profile?: InstrumentProfile) => {
  if (!profile || profile.change === undefined || profile.changesPercentage === undefined) {
    return 'Förändring saknas'
  }

  const prefix = profile.change > 0 ? '+' : ''

  return `${prefix}${profile.change.toFixed(2)} (${prefix}${profile.changesPercentage.toFixed(2)}%)`
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

export { getInstrumentDetailsPath }
