import type { Instrument } from '../../types/instrument'

export type CompareRange = '1D' | '1W' | '1M' | '1Y' | '5Y'

export type CompareMetric = {
  dividendYield: number
  marketCap: number
  peRatio: number
  returnPercent: number
  volatility: number
  volume: number
}

export type CompareSeriesPoint = {
  label: string
  values: Record<string, number>
}

const rangeLabels: Record<CompareRange, string[]> = {
  '1D': ['Öppning', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', 'Stängning'],
  '1W': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  '1M': ['W1', 'W2', 'W3', 'W4'],
  '1Y': ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'],
  '5Y': ['Y1', 'Y2', 'Y3', 'Y4', 'Y5'],
}

const rangeMomentum: Record<CompareRange, number> = {
  '1D': 2.8,
  '1W': 6.4,
  '1M': 12.5,
  '1Y': 26.5,
  '5Y': 72,
}

const hashSymbol = (symbol: string) => {
  return symbol.split('').reduce((total, character) => total + character.charCodeAt(0), 0)
}

const getSeriesValue = (symbol: string, pointIndex: number, totalPoints: number, range: CompareRange) => {
  const hash = hashSymbol(symbol)
  const amplitude = (hash % 9) + 4
  const direction = hash % 2 === 0 ? 1 : -1
  const slope = rangeMomentum[range] / Math.max(totalPoints - 1, 1)
  const wave = Math.sin(pointIndex + hash / 20) * amplitude

  return Number((100 + pointIndex * slope * direction + wave).toFixed(2))
}

export const getCompareChartData = (instruments: Instrument[], range: CompareRange): CompareSeriesPoint[] => {
  const labels = rangeLabels[range]

  return labels.map((label, pointIndex) => {
    const values = instruments.reduce<Record<string, number>>((currentValues, instrument) => {
      return {
        ...currentValues,
        [instrument.symbol]: getSeriesValue(instrument.symbol, pointIndex, labels.length, range),
      }
    }, {})

    return {
      label,
      values,
    }
  })
}

const getMetricBase = (symbol: string) => {
  return hashSymbol(symbol) % 100
}

export const getCompareMetrics = (instrument: Instrument, range: CompareRange): CompareMetric => {
  const metricBase = getMetricBase(instrument.symbol)
  const direction = metricBase % 2 === 0 ? 1 : -1

  return {
    returnPercent: Number((direction * (rangeMomentum[range] * 0.55 + metricBase / 10)).toFixed(2)),
    volatility: Number((12 + (metricBase % 11) * 1.8).toFixed(1)),
    marketCap: Number((45 + metricBase * 2.3).toFixed(1)),
    peRatio: Number((14 + (metricBase % 15) * 1.2).toFixed(1)),
    dividendYield: Number(((metricBase % 7) * 0.45).toFixed(2)),
    volume: Math.round(1_200_000 + metricBase * 185_000),
  }
}
