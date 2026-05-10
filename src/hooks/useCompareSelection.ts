import { useCallback, useMemo } from 'react'

import {
  addToCompare as addToCompareAction,
  clearCompare as clearCompareAction,
  MAX_COMPARE_INSTRUMENTS,
  removeFromCompare as removeFromCompareAction,
} from '../features/compare/compareSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import type { Instrument } from '../types/instrument'

export const useCompareSelection = () => {
  const dispatch = useAppDispatch()
  const selectedInstruments = useAppSelector((state) => state.compare.selectedInstruments)
  const selectedSymbols = useMemo(() => {
    return new Set(selectedInstruments.map((instrument) => instrument.symbol))
  }, [selectedInstruments])

  const addToCompare = useCallback(
    (instrument: Instrument) => {
      dispatch(addToCompareAction(instrument))
    },
    [dispatch],
  )

  const removeFromCompare = useCallback(
    (symbol: string) => {
      dispatch(removeFromCompareAction(symbol))
    },
    [dispatch],
  )

  const isInCompare = useCallback(
    (symbol: string) => {
      return selectedSymbols.has(symbol)
    },
    [selectedSymbols],
  )

  const clearCompare = useCallback(() => {
    dispatch(clearCompareAction())
  }, [dispatch])

  return {
    addToCompare,
    canAddToCompare: selectedInstruments.length < MAX_COMPARE_INSTRUMENTS,
    clearCompare,
    isInCompare,
    removeFromCompare,
    selectedInstruments,
  }
}
