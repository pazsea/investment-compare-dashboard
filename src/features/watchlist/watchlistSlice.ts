import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { Instrument, InstrumentType } from '../../types/instrument'

export const WATCHLIST_STORAGE_KEY = 'investmentCompareWatchlist'

type WatchlistState = {
  instruments: Instrument[]
}

const instrumentTypes = new Set<InstrumentType>(['stock', 'fund', 'crypto', 'etf'])

const isStoredInstrument = (value: unknown): value is Instrument => {
  if (!value || typeof value !== 'object') {
    return false
  }

  const instrument = value as Partial<Instrument>

  return (
    typeof instrument.symbol === 'string' &&
    typeof instrument.name === 'string' &&
    typeof instrument.type === 'string' &&
    instrumentTypes.has(instrument.type as InstrumentType)
  )
}

const readStoredWatchlist = (): Instrument[] => {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const storedWatchlist = window.localStorage.getItem(WATCHLIST_STORAGE_KEY)
    const parsedWatchlist: unknown = storedWatchlist ? JSON.parse(storedWatchlist) : []

    return Array.isArray(parsedWatchlist) ? parsedWatchlist.filter(isStoredInstrument) : []
  } catch {
    return []
  }
}

const initialState: WatchlistState = {
  instruments: readStoredWatchlist(),
}

export const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addToWatchlist: (state, action: PayloadAction<Instrument>) => {
      const alreadySaved = state.instruments.some(
        (instrument) => instrument.symbol === action.payload.symbol,
      )

      if (alreadySaved) {
        return
      }

      state.instruments.push(action.payload)
    },
    removeFromWatchlist: (state, action: PayloadAction<string>) => {
      state.instruments = state.instruments.filter((instrument) => {
        return instrument.symbol !== action.payload
      })
    },
    clearWatchlist: (state) => {
      state.instruments = []
    },
  },
})

export const { addToWatchlist, removeFromWatchlist, clearWatchlist } = watchlistSlice.actions

export const watchlistReducer = watchlistSlice.reducer
