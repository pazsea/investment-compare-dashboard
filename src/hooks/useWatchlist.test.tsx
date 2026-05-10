/**
 * @vitest-environment jsdom
 */
import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { WATCHLIST_STORAGE_KEY, watchlistReducer } from '../features/watchlist/watchlistSlice'
import type { Instrument } from '../types/instrument'
import { useWatchlist } from './useWatchlist'

const instrument: Instrument = {
  type: 'stock',
  symbol: 'AAPL',
  name: 'Apple Inc.',
}

const createWrapper = () => {
  const testStore = configureStore({
    reducer: {
      watchlist: watchlistReducer,
    },
  })

  const Wrapper = (props: { children: ReactNode }) => {
    return <Provider store={testStore}>{props.children}</Provider>
  }

  return Wrapper
}

describe('when managing the watchlist', () => {
  afterEach(() => {
    window.localStorage.removeItem(WATCHLIST_STORAGE_KEY)
  })

  it('should add, deduplicate, remove, and persist instruments', async () => {
    const { result } = renderHook(() => useWatchlist(), {
      wrapper: createWrapper(),
    })

    act(() => {
      result.current.addToWatchlist(instrument)
      result.current.addToWatchlist(instrument)
    })

    expect(result.current.instruments).toHaveLength(1)
    expect(result.current.isInWatchlist('AAPL')).toBe(true)

    await waitFor(() => {
      expect(window.localStorage.getItem(WATCHLIST_STORAGE_KEY)).toContain('AAPL')
    })

    act(() => {
      result.current.removeFromWatchlist('AAPL')
    })

    expect(result.current.instruments).toHaveLength(0)
  })
})
