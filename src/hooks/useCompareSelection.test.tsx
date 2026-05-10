/**
 * @vitest-environment jsdom
 */
import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { compareReducer } from '../features/compare/compareSlice'
import type { Instrument } from '../types/instrument'
import { useCompareSelection } from './useCompareSelection'

const instruments: Instrument[] = [
  { type: 'stock', symbol: 'AAPL', name: 'Apple Inc.' },
  { type: 'stock', symbol: 'MSFT', name: 'Microsoft Corporation' },
  { type: 'stock', symbol: 'JPM', name: 'JPMorgan Chase & Co.' },
  { type: 'etf', symbol: 'VOO', name: 'Vanguard S&P 500 ETF' },
  { type: 'crypto', symbol: 'BTCUSD', name: 'Bitcoin USD' },
]

const createWrapper = () => {
  const testStore = configureStore({
    reducer: {
      compare: compareReducer,
    },
  })

  const Wrapper = (props: { children: ReactNode }) => {
    return <Provider store={testStore}>{props.children}</Provider>
  }

  return Wrapper
}

describe('when selecting instruments for comparison', () => {
  it('should add, deduplicate, remove, and clear selections', () => {
    const { result } = renderHook(() => useCompareSelection(), {
      wrapper: createWrapper(),
    })

    act(() => {
      result.current.addToCompare(instruments[0])
      result.current.addToCompare(instruments[0])
    })

    expect(result.current.selectedInstruments).toHaveLength(1)
    expect(result.current.isInCompare('AAPL')).toBe(true)

    act(() => {
      result.current.removeFromCompare('AAPL')
    })

    expect(result.current.selectedInstruments).toHaveLength(0)

    act(() => {
      result.current.addToCompare(instruments[0])
      result.current.clearCompare()
    })

    expect(result.current.selectedInstruments).toHaveLength(0)
  })

  it('should stop accepting new selections after four instruments', () => {
    const { result } = renderHook(() => useCompareSelection(), {
      wrapper: createWrapper(),
    })

    act(() => {
      instruments.forEach(result.current.addToCompare)
    })

    expect(result.current.selectedInstruments).toHaveLength(4)
    expect(result.current.canAddToCompare).toBe(false)
  })
})
