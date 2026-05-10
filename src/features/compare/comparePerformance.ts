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

const BASE_CHART_INDEX_VALUE = 100
const SERIES_AMPLITUDE_VARIANTS = 9
const SERIES_AMPLITUDE_OFFSET = 4
const SYMBOL_WAVE_DIVISOR = 20
const METRIC_BASE_VARIANTS = 100
const RETURN_MOMENTUM_WEIGHT = 0.55
const RETURN_BASE_DIVISOR = 10
const VOLATILITY_BASE_PERCENT = 12
const VOLATILITY_VARIANTS = 11
const VOLATILITY_STEP_PERCENT = 1.8
const MARKET_CAP_BASE_BILLIONS = 45
const MARKET_CAP_STEP_BILLIONS = 2.3
const PE_RATIO_BASE = 14
const PE_RATIO_VARIANTS = 15
const PE_RATIO_STEP = 1.2
const DIVIDEND_YIELD_VARIANTS = 7
const DIVIDEND_YIELD_STEP_PERCENT = 0.45
const BASE_DAILY_VOLUME = 1_200_000
const VOLUME_STEP = 185_000

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
  const amplitude = (hash % SERIES_AMPLITUDE_VARIANTS) + SERIES_AMPLITUDE_OFFSET
  const direction = hash % 2 === 0 ? 1 : -1
  const slope = rangeMomentum[range] / Math.max(totalPoints - 1, 1)
  const wave = Math.sin(pointIndex + hash / SYMBOL_WAVE_DIVISOR) * amplitude

  return Number((BASE_CHART_INDEX_VALUE + pointIndex * slope * direction + wave).toFixed(2))
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
  return hashSymbol(symbol) % METRIC_BASE_VARIANTS
}

export const getCompareMetrics = (instrument: Instrument, range: CompareRange): CompareMetric => {
  const metricBase = getMetricBase(instrument.symbol)
  const direction = metricBase % 2 === 0 ? 1 : -1

  return {
    returnPercent: Number(
      (
        direction *
        (rangeMomentum[range] * RETURN_MOMENTUM_WEIGHT + metricBase / RETURN_BASE_DIVISOR)
      ).toFixed(2),
    ),
    volatility: Number(
      (
        VOLATILITY_BASE_PERCENT +
        (metricBase % VOLATILITY_VARIANTS) * VOLATILITY_STEP_PERCENT
      ).toFixed(1),
    ),
    marketCap: Number(
      (MARKET_CAP_BASE_BILLIONS + metricBase * MARKET_CAP_STEP_BILLIONS).toFixed(1),
    ),
    peRatio: Number((PE_RATIO_BASE + (metricBase % PE_RATIO_VARIANTS) * PE_RATIO_STEP).toFixed(1)),
    dividendYield: Number(
      ((metricBase % DIVIDEND_YIELD_VARIANTS) * DIVIDEND_YIELD_STEP_PERCENT).toFixed(2),
    ),
    volume: Math.round(BASE_DAILY_VOLUME + metricBase * VOLUME_STEP),
  }
}
