import type { Instrument, InstrumentQuote } from '../types/instrument'

export const mockInstruments: Instrument[] = [
  {
    type: 'stock',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    currency: 'USD',
    exchange: 'NASDAQ',
    sector: 'Technology',
  },
  {
    type: 'stock',
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    currency: 'USD',
    exchange: 'NASDAQ',
    sector: 'Technology',
  },
  {
    type: 'stock',
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    currency: 'USD',
    exchange: 'NYSE',
    sector: 'Financial Services',
  },
  {
    type: 'etf',
    symbol: 'VOO',
    name: 'Vanguard S&P 500 ETF',
    currency: 'USD',
    exchange: 'NYSE Arca',
    category: 'Large Blend',
  },
  {
    type: 'fund',
    symbol: 'VTSAX',
    name: 'Vanguard Total Stock Market Index Fund Admiral Shares',
    currency: 'USD',
    exchange: 'NASDAQ',
    category: 'Large Blend',
  },
  {
    type: 'crypto',
    symbol: 'BTCUSD',
    name: 'Bitcoin USD',
    currency: 'USD',
    exchange: 'CCC',
  },
]

export const mockQuotes: InstrumentQuote[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 293.32,
    change: 5.88,
    changesPercentage: 2.05,
    currency: 'USD',
    exchange: 'NASDAQ',
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 483.16,
    change: 3.42,
    changesPercentage: 0.71,
    currency: 'USD',
    exchange: 'NASDAQ',
  },
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    price: 289.94,
    change: -1.18,
    changesPercentage: -0.41,
    currency: 'USD',
    exchange: 'NYSE',
  },
  {
    symbol: 'VOO',
    name: 'Vanguard S&P 500 ETF',
    price: 588.12,
    change: 2.27,
    changesPercentage: 0.39,
    currency: 'USD',
    exchange: 'NYSE Arca',
  },
  {
    symbol: 'BTCUSD',
    name: 'Bitcoin USD',
    price: 91145.36,
    change: 1240.82,
    changesPercentage: 1.38,
    currency: 'USD',
    exchange: 'CCC',
  },
]

export const searchMockInstruments = (query: string) => {
  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) {
    return []
  }

  return mockInstruments.filter((instrument) => {
    return (
      instrument.symbol.toLowerCase().includes(normalizedQuery) ||
      instrument.name.toLowerCase().includes(normalizedQuery)
    )
  })
}

export const findMockQuote = (symbol: string) => {
  const normalizedSymbol = symbol.trim().toUpperCase()

  return mockQuotes.find((quote) => quote.symbol === normalizedSymbol)
}

export const findMockInstrument = (symbol: string) => {
  const normalizedSymbol = symbol.trim().toUpperCase()

  return mockInstruments.find((instrument) => instrument.symbol === normalizedSymbol)
}
