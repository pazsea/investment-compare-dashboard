import { useCallback, useMemo } from 'react'
import type { MouseEvent } from 'react'

import {
  useGetInstrumentMarketCapHistoryQuery,
  useGetInstrumentProfilesQuery,
} from '../../api/instrumentsApi'
import { shouldUseFmpApi } from '../../api/config'
import { useCompareSelection } from '../../hooks/useCompareSelection'
import { getUnsupportedCompareSymbols } from './compareAvailability'
import { getCompareChartData, getMarketCapChangePercentage } from './compareHistory'
import { createCompareColumns } from './compareTable'
import type { CompareMetricEntry } from './compareTypes'

export const useComparePage = () => {
  const { clearCompare, removeFromCompare, selectedInstruments } = useCompareSelection()
  const selectedCount = selectedInstruments.length
  const selectedSymbols = useMemo(() => {
    return selectedInstruments.map((instrument) => instrument.symbol)
  }, [selectedInstruments])
  const unsupportedSymbols = useMemo(() => {
    return shouldUseFmpApi ? getUnsupportedCompareSymbols(selectedSymbols) : []
  }, [selectedSymbols])
  const supportedSymbols = useMemo(() => {
    return selectedSymbols.filter((symbol) => !unsupportedSymbols.includes(symbol))
  }, [selectedSymbols, unsupportedSymbols])
  const {
    data: marketCapHistory = {},
    isError: isMarketCapHistoryError,
    isFetching: isMarketCapHistoryFetching,
  } = useGetInstrumentMarketCapHistoryQuery(supportedSymbols, {
    skip: selectedCount === 0 || supportedSymbols.length === 0,
  })
  const {
    data: profiles = {},
    isFetching: isProfilesFetching,
  } = useGetInstrumentProfilesQuery(selectedSymbols, {
    skip: selectedCount === 0,
  })

  const chartData = useMemo(() => {
    return getCompareChartData(marketCapHistory)
  }, [marketCapHistory])

  const metrics = useMemo<CompareMetricEntry[]>(() => {
    return selectedInstruments.map((instrument) => ({
      instrument,
      marketCapHistory: marketCapHistory[instrument.symbol] ?? [],
      monthlyChangePercentage: getMarketCapChangePercentage(marketCapHistory[instrument.symbol] ?? []),
      profile: profiles[instrument.symbol],
    }))
  }, [marketCapHistory, profiles, selectedInstruments])

  const handleClearCompare = useCallback(() => {
    clearCompare()
  }, [clearCompare])

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
    handleClearCompare,
    handleRemoveFromCompare,
    isLoading: isMarketCapHistoryFetching || isProfilesFetching,
    isError: isMarketCapHistoryError,
    metrics,
    selectedCount,
    selectedInstruments,
    unsupportedSymbols,
  }
}
