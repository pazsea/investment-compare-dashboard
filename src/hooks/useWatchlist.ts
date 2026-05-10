import { useCallback, useEffect, useMemo } from 'react'

import {
  addToWatchlist as addToWatchlistAction,
  clearWatchlist as clearWatchlistAction,
  removeFromWatchlist as removeFromWatchlistAction,
  WATCHLIST_STORAGE_KEY,
} from '../features/watchlist/watchlistSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import type { Instrument } from '../types/instrument'

export const useWatchlist = () => {
  const dispatch = useAppDispatch()
  const instruments = useAppSelector((state) => state.watchlist.instruments)
  const savedSymbols = useMemo(() => {
    return new Set(instruments.map((instrument) => instrument.symbol))
  }, [instruments])

  useEffect(() => {
    window.localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(instruments))
  }, [instruments])

  const addToWatchlist = useCallback(
    (instrument: Instrument) => {
      dispatch(addToWatchlistAction(instrument))
    },
    [dispatch],
  )

  const removeFromWatchlist = useCallback(
    (symbol: string) => {
      dispatch(removeFromWatchlistAction(symbol))
    },
    [dispatch],
  )

  const isInWatchlist = useCallback(
    (symbol: string) => {
      return savedSymbols.has(symbol)
    },
    [savedSymbols],
  )

  const clearWatchlist = useCallback(() => {
    dispatch(clearWatchlistAction())
  }, [dispatch])

  return {
    addToWatchlist,
    clearWatchlist,
    instruments,
    isInWatchlist,
    removeFromWatchlist,
  }
}
