import type { Instrument, InstrumentMarketCapPoint, InstrumentProfile } from '../types/instrument'

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

export const mockProfiles: InstrumentProfile[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 293.32,
    change: 5.88,
    changesPercentage: 2.05,
    currency: 'USD',
    exchange: 'NASDAQ',
    sector: 'Technology',
    industry: 'Consumer Electronics',
    description: 'Apple Inc. utvecklar konsumentteknik med fokus pa hardvara, tjanster och ekosystem.',
    website: 'https://www.apple.com',
    country: 'US',
    city: 'Cupertino',
    state: 'CA',
    defaultImage: false,
    marketCap: 3_900_351_299_800,
    volume: 36_725_325,
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 483.16,
    change: 3.42,
    changesPercentage: 0.71,
    currency: 'USD',
    exchange: 'NASDAQ',
    sector: 'Technology',
    industry: 'Software - Infrastructure',
    description: 'Microsoft Corporation levererar molnplattformar, produktivitetsverktyg och foretagsmjukvara globalt.',
    website: 'https://www.microsoft.com',
    country: 'US',
    city: 'Redmond',
    state: 'WA',
    defaultImage: false,
    marketCap: 3_120_000_000_000,
    volume: 18_442_000,
  },
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    price: 289.94,
    change: -1.18,
    changesPercentage: -0.41,
    currency: 'USD',
    exchange: 'NYSE',
    sector: 'Financial Services',
    industry: 'Banks - Diversified',
    description: 'JPMorgan Chase & Co. ar en global bankkoncern med fokus pa konsumentbank, investment banking och kapitalforvaltning.',
    website: 'https://www.jpmorganchase.com',
    country: 'US',
    city: 'New York',
    state: 'NY',
    defaultImage: false,
    marketCap: 809_480_399_378,
    volume: 9_355_147,
  },
  {
    symbol: 'VOO',
    name: 'Vanguard S&P 500 ETF',
    price: 588.12,
    change: 2.27,
    changesPercentage: 0.39,
    currency: 'USD',
    exchange: 'NYSE Arca',
    isEtf: true,
    description: 'Vanguard S&P 500 ETF ger bred exponering mot stora amerikanska bolag genom ett indexnara upplagg.',
    website: 'https://investor.vanguard.com',
    country: 'US',
    defaultImage: false,
    marketCap: 620_000_000_000,
    volume: 4_120_000,
  },
  {
    symbol: 'VTSAX',
    name: 'Vanguard Total Stock Market Index Fund Admiral Shares',
    price: 139.46,
    change: 0.24,
    changesPercentage: 0.17,
    currency: 'USD',
    exchange: 'NASDAQ',
    isFund: true,
    description: 'Vanguard Total Stock Market Index Fund Admiral Shares erbjuder bred amerikansk aktieexponering i fondformat.',
    website: 'https://investor.vanguard.com',
    country: 'US',
    defaultImage: false,
    marketCap: 1_500_000_000_000,
    volume: 0,
  },
  {
    symbol: 'BTCUSD',
    name: 'Bitcoin USD',
    price: 91145.36,
    change: 1240.82,
    changesPercentage: 1.38,
    currency: 'USD',
    exchange: 'CCC',
    description: 'Bitcoin USD visar den mest handlade prisreferensen for bitcoin mot amerikanska dollar.',
    website: 'https://bitcoin.org',
    defaultImage: false,
    marketCap: 1_800_000_000_000,
    volume: 28_400_000_000,
  },
]

const MOCK_HISTORY_DAY_COUNT = 6
const MOCK_HISTORY_DAY_STEP = 5
const MOCK_HISTORY_SWING = 0.035

const buildMockMarketCapHistory = (profile: InstrumentProfile): InstrumentMarketCapPoint[] => {
  const currentMarketCap = profile.marketCap ?? 1_000_000_000
  const symbolHash = profile.symbol.split('').reduce((total, character) => total + character.charCodeAt(0), 0)

  return Array.from({ length: MOCK_HISTORY_DAY_COUNT }, (_value, index) => {
    const dayOffset = (MOCK_HISTORY_DAY_COUNT - index - 1) * MOCK_HISTORY_DAY_STEP
    const date = new Date('2026-05-10T00:00:00.000Z')
    date.setUTCDate(date.getUTCDate() - dayOffset)

    const wave = Math.sin(index + symbolHash / 20) * currentMarketCap * MOCK_HISTORY_SWING
    const marketCap = Math.round(currentMarketCap - wave)

    return {
      symbol: profile.symbol,
      date: date.toISOString().slice(0, 10),
      marketCap,
    }
  })
}

export const mockMarketCapHistory = Object.fromEntries(
  mockProfiles.map((profile) => [profile.symbol, buildMockMarketCapHistory(profile)]),
) satisfies Record<string, InstrumentMarketCapPoint[]>

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

export const findMockProfile = (symbol: string) => {
  const normalizedSymbol = symbol.trim().toUpperCase()

  return mockProfiles.find((profile) => profile.symbol === normalizedSymbol)
}

export const findMockMarketCapHistory = (symbol: string) => {
  const normalizedSymbol = symbol.trim().toUpperCase()

  return mockMarketCapHistory[normalizedSymbol] ?? []
}

export const findMockInstrument = (symbol: string) => {
  const normalizedSymbol = symbol.trim().toUpperCase()

  return mockInstruments.find((instrument) => instrument.symbol === normalizedSymbol)
}
