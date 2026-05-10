import { describe, expect, it } from 'vitest'

import type { Instrument } from '../types/instrument'
import {
  isCryptoInstrument,
  isEtfInstrument,
  isFundInstrument,
  isStockInstrument,
} from './typeguards'

const instruments: Record<Instrument['type'], Instrument> = {
  stock: {
    type: 'stock',
    symbol: 'AAPL',
    name: 'Apple Inc.',
  },
  fund: {
    type: 'fund',
    symbol: 'VTSAX',
    name: 'Vanguard Total Stock Market Index Fund Admiral Shares',
  },
  crypto: {
    type: 'crypto',
    symbol: 'BTCUSD',
    name: 'Bitcoin USD',
  },
  etf: {
    type: 'etf',
    symbol: 'VOO',
    name: 'Vanguard S&P 500 ETF',
  },
}

describe('when checking instrument types', () => {
  it('should identify stock instruments', () => {
    expect(isStockInstrument(instruments.stock)).toBe(true)
    expect(isStockInstrument(instruments.crypto)).toBe(false)
  })

  it('should identify fund instruments', () => {
    expect(isFundInstrument(instruments.fund)).toBe(true)
    expect(isFundInstrument(instruments.etf)).toBe(false)
  })

  it('should identify crypto instruments', () => {
    expect(isCryptoInstrument(instruments.crypto)).toBe(true)
    expect(isCryptoInstrument(instruments.stock)).toBe(false)
  })

  it('should identify etf instruments', () => {
    expect(isEtfInstrument(instruments.etf)).toBe(true)
    expect(isEtfInstrument(instruments.fund)).toBe(false)
  })
})
