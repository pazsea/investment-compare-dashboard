import type { InstrumentMarketCapPoint } from '../../types/instrument'

export type CompareHistoryMap = Record<string, InstrumentMarketCapPoint[]>

export type CompareChartRow = Record<string, number | string>

const BASE_CHART_INDEX_VALUE = 100

const formatChartDateLabel = (value: string) => {
  const date = new Date(`${value}T00:00:00.000Z`)

  return new Intl.DateTimeFormat('sv-SE', {
    day: 'numeric',
    month: 'short',
  }).format(date)
}

const getNormalizedMarketCapValue = (
  point: InstrumentMarketCapPoint,
  firstPoint: InstrumentMarketCapPoint | undefined,
) => {
  if (!firstPoint || firstPoint.marketCap === 0) {
    return BASE_CHART_INDEX_VALUE
  }

  return Number(((point.marketCap / firstPoint.marketCap) * BASE_CHART_INDEX_VALUE).toFixed(2))
}

export const getCompareChartData = (historyBySymbol: CompareHistoryMap): CompareChartRow[] => {
  const datedRows = new Map<string, CompareChartRow>()

  Object.entries(historyBySymbol).forEach(([symbol, points]) => {
    const firstPoint = points[0]

    points.forEach((point) => {
      const currentRow = datedRows.get(point.date) ?? {
        label: formatChartDateLabel(point.date),
      }

      currentRow[symbol] = getNormalizedMarketCapValue(point, firstPoint)
      datedRows.set(point.date, currentRow)
    })
  })

  return Array.from(datedRows.entries())
    .sort(([leftDate], [rightDate]) => leftDate.localeCompare(rightDate))
    .map((entry) => entry[1])
}

export const getMarketCapChangePercentage = (points: InstrumentMarketCapPoint[]) => {
  const firstPoint = points[0]
  const lastPoint = points.at(-1)

  if (!firstPoint || !lastPoint || firstPoint.marketCap === 0) {
    return undefined
  }

  return Number((((lastPoint.marketCap - firstPoint.marketCap) / firstPoint.marketCap) * 100).toFixed(2))
}
