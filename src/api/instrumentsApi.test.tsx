/**
 * @vitest-environment jsdom
 */
import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { renderHook, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest'

const server = setupServer(
  http.get('https://financialmodelingprep.com/api/v3/search-ticker', () => {
    return HttpResponse.json([
      {
        symbol: 'NVDA',
        name: 'NVIDIA Corporation',
        currency: 'USD',
        exchangeShortName: 'NASDAQ',
      },
    ])
  }),
)

describe('when RTK Query searches with the FMP API enabled', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
    vi.unstubAllEnvs()
    vi.resetModules()
  })

  afterAll(() => {
    server.close()
  })

  it('should map the FMP search response into instruments', async () => {
    vi.stubEnv('VITE_USE_FMP_API', 'true')
    vi.stubEnv('VITE_FMP_API_KEY', 'test-key')

    const { instrumentsApi, useSearchInstrumentsQuery } = await import('./instrumentsApi')
    const testStore = configureStore({
      reducer: {
        [instrumentsApi.reducerPath]: instrumentsApi.reducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(instrumentsApi.middleware),
    })

    const Wrapper = (props: { children: ReactNode }) => {
      return <Provider store={testStore}>{props.children}</Provider>
    }

    const { result } = renderHook(() => useSearchInstrumentsQuery('nvda'), {
      wrapper: Wrapper,
    })

    await waitFor(() => {
      expect(result.current.data?.[0]).toEqual({
        type: 'stock',
        symbol: 'NVDA',
        name: 'NVIDIA Corporation',
        currency: 'USD',
        exchange: 'NASDAQ',
      })
    })
  })
})
