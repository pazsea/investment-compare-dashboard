import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { Instrument } from '../../types/instrument'

export const MAX_COMPARE_INSTRUMENTS = 4

type CompareState = {
  selectedInstruments: Instrument[]
}

const initialState: CompareState = {
  selectedInstruments: [],
}

export const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    addToCompare: (state, action: PayloadAction<Instrument>) => {
      const alreadySelected = state.selectedInstruments.some(
        (instrument) => instrument.symbol === action.payload.symbol,
      )

      if (alreadySelected || state.selectedInstruments.length >= MAX_COMPARE_INSTRUMENTS) {
        return
      }

      state.selectedInstruments.push(action.payload)
    },
    removeFromCompare: (state, action: PayloadAction<string>) => {
      state.selectedInstruments = state.selectedInstruments.filter((instrument) => {
        return instrument.symbol !== action.payload
      })
    },
    clearCompare: (state) => {
      state.selectedInstruments = []
    },
  },
})

export const { addToCompare, removeFromCompare, clearCompare } = compareSlice.actions

export const compareReducer = compareSlice.reducer
