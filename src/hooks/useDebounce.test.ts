import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useDebounce } from './useDebounce'

describe('when debouncing a changing value', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('should publish the latest value after the delay', () => {
    vi.useFakeTimers()

    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 250), {
      initialProps: { value: 'a' },
    })

    expect(result.current).toBe('a')

    rerender({ value: 'ap' })

    expect(result.current).toBe('a')

    act(() => {
      vi.advanceTimersByTime(249)
    })

    expect(result.current).toBe('a')

    act(() => {
      vi.advanceTimersByTime(1)
    })

    expect(result.current).toBe('ap')
  })
})
