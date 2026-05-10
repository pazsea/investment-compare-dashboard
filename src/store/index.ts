import { configureStore } from '@reduxjs/toolkit'

import { instrumentsApi } from '../api/instrumentsApi'
import { compareReducer } from '../features/compare/compareSlice'

export const store = configureStore({
  reducer: {
    compare: compareReducer,
    [instrumentsApi.reducerPath]: instrumentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(instrumentsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
