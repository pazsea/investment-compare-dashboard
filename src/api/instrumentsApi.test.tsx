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
  http.get('https://financialmodelingprep.com/stable/search-symbol', () => {
    return HttpResponse.json([
      {
        symbol: 'NVDA',
        name: 'NVIDIA Corporation',
        currency: 'USD',
        exchangeShortName: 'NASDAQ',
      },
    ])
  }),
  http.get('https://financialmodelingprep.com/stable/search-name', () => {
    return HttpResponse.json([])
  }),
  http.get('https://financialmodelingprep.com/stable/profile', () => {
    return HttpResponse.json([
      {
        symbol: 'NVDA',
        companyName: 'NVIDIA Corporation',
        exchange: 'NASDAQ',
        sector: 'Technology',
      },
    ])
  }),
  http.get('https://financialmodelingprep.com/stable/historical-market-capitalization', () => {
    return HttpResponse.json([
      {
        symbol: 'NVDA',
        date: '2026-04-08',
        marketCap: 200,
      },
      {
        symbol: 'NVDA',
        date: '2026-05-08',
        marketCap: 220,
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

  it('should map the FMP profile response into instrument profiles', async () => {
    vi.stubEnv('VITE_USE_FMP_API', 'true')
    vi.stubEnv('VITE_FMP_API_KEY', 'test-key')

    const { instrumentsApi, useGetInstrumentProfileQuery } = await import('./instrumentsApi')
    const testStore = configureStore({
      reducer: {
        [instrumentsApi.reducerPath]: instrumentsApi.reducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(instrumentsApi.middleware),
    })

    const Wrapper = (props: { children: ReactNode }) => {
      return <Provider store={testStore}>{props.children}</Provider>
    }

    const { result } = renderHook(() => useGetInstrumentProfileQuery('nvda'), {
      wrapper: Wrapper,
    })

    await waitFor(() => {
      expect(result.current.data).toEqual({
        symbol: 'NVDA',
        name: 'NVIDIA Corporation',
        currency: undefined,
        exchange: 'NASDAQ',
        industry: undefined,
        website: undefined,
        description: undefined,
        ceo: undefined,
        sector: 'Technology',
        country: undefined,
        fullTimeEmployees: undefined,
        city: undefined,
        state: undefined,
        image: undefined,
        defaultImage: undefined,
        isEtf: undefined,
        isFund: undefined,
        marketCap: undefined,
        volume: undefined,
        price: undefined,
        change: undefined,
        changesPercentage: undefined,
      })
    })
  })

  it('should surface an error when both live search requests fail', async () => {
    server.use(
      http.get('https://financialmodelingprep.com/stable/search-symbol', () => {
        return HttpResponse.json({ message: 'search failed' }, { status: 500 })
      }),
      http.get('https://financialmodelingprep.com/stable/search-name', () => {
        return HttpResponse.json({ message: 'search failed' }, { status: 500 })
      }),
    )

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

    const { result } = renderHook(() => useSearchInstrumentsQuery('fail'), {
      wrapper: Wrapper,
    })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })
  })

  it('should map historical market cap series for compare charts', async () => {
    vi.stubEnv('VITE_USE_FMP_API', 'true')
    vi.stubEnv('VITE_FMP_API_KEY', 'test-key')

    const { instrumentsApi, useGetInstrumentMarketCapHistoryQuery } = await import('./instrumentsApi')
    const testStore = configureStore({
      reducer: {
        [instrumentsApi.reducerPath]: instrumentsApi.reducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(instrumentsApi.middleware),
    })

    const Wrapper = (props: { children: ReactNode }) => {
      return <Provider store={testStore}>{props.children}</Provider>
    }

    const { result } = renderHook(() => useGetInstrumentMarketCapHistoryQuery(['nvda']), {
      wrapper: Wrapper,
    })

    await waitFor(() => {
      expect(result.current.data).toEqual({
        NVDA: [
          {
            symbol: 'NVDA',
            date: '2026-04-08',
            marketCap: 200,
          },
          {
            symbol: 'NVDA',
            date: '2026-05-08',
            marketCap: 220,
          },
        ],
      })
    })
  })
})
