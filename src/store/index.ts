import { configureStore } from '@reduxjs/toolkit'

import { instrumentsApi } from '../api/instrumentsApi'
import { compareReducer } from '../features/compare/compareSlice'
import { watchlistReducer } from '../features/watchlist/watchlistSlice'

export const store = configureStore({
  reducer: {
    compare: compareReducer,
    watchlist: watchlistReducer,
    [instrumentsApi.reducerPath]: instrumentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(instrumentsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
