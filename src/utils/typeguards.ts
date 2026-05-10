import type {
  CryptoInstrument,
  EtfInstrument,
  FundInstrument,
  Instrument,
  InstrumentType,
  StockInstrument,
} from '../types/instrument'

const instrumentTypes = new Set<string>(['stock', 'fund', 'crypto', 'etf'])

export const isStockInstrument = (instrument: Instrument): instrument is StockInstrument =>
  instrument.type === 'stock'

export const isFundInstrument = (instrument: Instrument): instrument is FundInstrument =>
  instrument.type === 'fund'

export const isCryptoInstrument = (instrument: Instrument): instrument is CryptoInstrument =>
  instrument.type === 'crypto'

export const isEtfInstrument = (instrument: Instrument): instrument is EtfInstrument =>
  instrument.type === 'etf'

export const isInstrumentType = (value: unknown): value is InstrumentType =>
  typeof value === 'string' && instrumentTypes.has(value)
