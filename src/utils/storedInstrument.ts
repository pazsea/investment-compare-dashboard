import type { Instrument, InstrumentType } from '../types/instrument'

const instrumentTypes = new Set<InstrumentType>(['stock', 'fund', 'crypto', 'etf'])

export const isStoredInstrument = (value: unknown): value is Instrument => {
  if (!value || typeof value !== 'object') {
    return false
  }

  const instrument = value as Partial<Instrument>

  return (
    typeof instrument.symbol === 'string' &&
    typeof instrument.name === 'string' &&
    typeof instrument.type === 'string' &&
    instrumentTypes.has(instrument.type as InstrumentType)
  )
}
