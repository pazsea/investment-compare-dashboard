import { configureStore } from '@reduxjs/toolkit'

import { instrumentsApi } from '../api/instrumentsApi'

export const store = configureStore({
  reducer: {
    [instrumentsApi.reducerPath]: instrumentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(instrumentsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
