import { useCallback, useMemo, useState } from 'react'
import type { ChangeEvent, MouseEvent } from 'react'

import { useCompareSelection } from '../../hooks/useCompareSelection'
import {
  DEFAULT_COMPARE_RANGE,
  DEFAULT_INVESTMENT_AMOUNT,
} from './compareConstants'
import { isCompareRange } from './compareTypeguards'
import {
  getCompareChartData,
  getCompareMetrics,
  type CompareRange,
} from './comparePerformance'
import { createCompareColumns } from './compareTable'
import type { CompareMetricEntry, CompareScenarioEntry } from './compareTypes'

export const useComparePage = () => {
  const { clearCompare, removeFromCompare, selectedInstruments } = useCompareSelection()
  const [range, setRange] = useState<CompareRange>(DEFAULT_COMPARE_RANGE)
  const [investmentAmount, setInvestmentAmount] = useState(DEFAULT_INVESTMENT_AMOUNT)
  const selectedCount = selectedInstruments.length
  const chartData = useMemo(() => {
    return getCompareChartData(selectedInstruments, range).map((point) => ({
      label: point.label,
      ...point.values,
    }))
  }, [range, selectedInstruments])
  const metrics = useMemo<CompareMetricEntry[]>(() => {
    return selectedInstruments.map((instrument) => ({
      instrument,
      values: getCompareMetrics(instrument, range),
    }))
  }, [range, selectedInstruments])
  const startingAmount = useMemo(() => {
    const normalizedAmount = Number.parseInt(investmentAmount, 10)

    return Number.isFinite(normalizedAmount) && normalizedAmount > 0
      ? normalizedAmount
      : Number.parseInt(DEFAULT_INVESTMENT_AMOUNT, 10)
  }, [investmentAmount])
  const scenarios = useMemo<CompareScenarioEntry[]>(() => {
    return metrics.map((entry) => {
      const endingValue = startingAmount * (1 + entry.values.returnPercent / 100)

      return {
        ...entry,
        endingValue,
        gainLoss: endingValue - startingAmount,
      }
    })
  }, [metrics, startingAmount])

  const handleClearCompare = useCallback(() => {
    clearCompare()
  }, [clearCompare])

  const handleAmountChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInvestmentAmount(event.currentTarget.value.replace(/[^\d]/g, ''))
  }, [])

  const handleRangeChange = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const nextRange = event.currentTarget.dataset.range

    if (nextRange && isCompareRange(nextRange)) {
      setRange(nextRange)
    }
  }, [])

  const handleRemoveFromCompare = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const symbol = event.currentTarget.dataset.symbol

      if (symbol) {
        removeFromCompare(symbol)
      }
    },
    [removeFromCompare],
  )

  const columns = useMemo(() => {
    return createCompareColumns(handleRemoveFromCompare)
  }, [handleRemoveFromCompare])

  return {
    chartData,
    columns,
    handleAmountChange,
    handleClearCompare,
    handleRangeChange,
    handleRemoveFromCompare,
    investmentAmount,
    metrics,
    range,
    scenarios,
    selectedCount,
    selectedInstruments,
    startingAmount,
  }
}
