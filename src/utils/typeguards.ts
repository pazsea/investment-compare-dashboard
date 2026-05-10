import type {
  CryptoInstrument,
  EtfInstrument,
  FundInstrument,
  Instrument,
  StockInstrument,
} from '../types/instrument'

export const isStockInstrument = (instrument: Instrument): instrument is StockInstrument =>
  instrument.type === 'stock'

export const isFundInstrument = (instrument: Instrument): instrument is FundInstrument =>
  instrument.type === 'fund'

export const isCryptoInstrument = (instrument: Instrument): instrument is CryptoInstrument =>
  instrument.type === 'crypto'

export const isEtfInstrument = (instrument: Instrument): instrument is EtfInstrument =>
  instrument.type === 'etf'
