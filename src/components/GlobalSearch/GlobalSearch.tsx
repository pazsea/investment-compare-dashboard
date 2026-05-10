import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ChangeEvent, FC, KeyboardEvent, MouseEvent } from 'react'
import clsx from 'clsx'
import { useLocation, useNavigate } from 'react-router-dom'

import { useSearchInstrumentsQuery } from '../../api/instrumentsApi'
import { useDebounce } from '../../hooks/useDebounce'
import type { Instrument } from '../../types/instrument'
import { OPEN_GLOBAL_SEARCH_EVENT } from '../../utils/globalSearch'

import * as styles from './GlobalSearch.css'

export type Props = {}

type SearchHistoryItem = {
  name: string
  symbol: string
  type: Instrument['type']
}

const MIN_QUERY_LENGTH = 2
const RECENT_SEARCHES_STORAGE_KEY = 'investmentCompareRecentSearches'
const MAX_RECENT_SEARCHES = 5

const readRecentSearches = (): SearchHistoryItem[] => {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const storedSearches = window.localStorage.getItem(RECENT_SEARCHES_STORAGE_KEY)
    const parsedSearches: unknown = storedSearches ? JSON.parse(storedSearches) : []

    return Array.isArray(parsedSearches)
      ? parsedSearches.filter((item): item is SearchHistoryItem => {
          if (!item || typeof item !== 'object') {
            return false
          }

          const candidate = item as Partial<SearchHistoryItem>

          return (
            typeof candidate.symbol === 'string' &&
            typeof candidate.name === 'string' &&
            typeof candidate.type === 'string'
          )
        })
      : []
  } catch {
    return []
  }
}

const createRecentSearch = (instrument: Instrument): SearchHistoryItem => {
  return {
    name: instrument.name,
    symbol: instrument.symbol,
    type: instrument.type,
  }
}

const GlobalSearch: FC<Props> = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const shellRef = useRef<HTMLDivElement | null>(null)
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [recentSearches, setRecentSearches] = useState<SearchHistoryItem[]>(readRecentSearches)
  const debouncedQuery = useDebounce(query.trim(), 250)
  const shouldSearch = debouncedQuery.length >= MIN_QUERY_LENGTH
  const { data: results = [], isFetching } = useSearchInstrumentsQuery(debouncedQuery, {
    skip: !shouldSearch,
  })

  const recentItems = useMemo<Instrument[]>(() => {
    return recentSearches.map((item) => ({
      type: item.type,
      symbol: item.symbol,
      name: item.name,
    }))
  }, [recentSearches])

  const visibleResults = shouldSearch ? results.slice(0, 6) : []
  const navigableItems = shouldSearch ? visibleResults : recentItems

  useEffect(() => {
    setActiveIndex(navigableItems.length > 0 ? 0 : -1)
  }, [navigableItems])

  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      const isSearchShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k'

      if (isSearchShortcut) {
        event.preventDefault()
        setIsOpen(true)
        inputRef.current?.focus()
      }

      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    const handleOpenSearch = () => {
      setIsOpen(true)
      inputRef.current?.focus()
    }

    window.addEventListener(OPEN_GLOBAL_SEARCH_EVENT, handleOpenSearch)

    return () => {
      window.removeEventListener(OPEN_GLOBAL_SEARCH_EVENT, handleOpenSearch)
    }
  }, [])

  useEffect(() => {
    const handlePointerDown = (event: globalThis.MouseEvent) => {
      if (!shellRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
    }
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  const saveRecentSearch = useCallback((instrument: Instrument) => {
    setRecentSearches((currentSearches) => {
      const nextSearches = [
        createRecentSearch(instrument),
        ...currentSearches.filter((item) => item.symbol !== instrument.symbol),
      ].slice(0, MAX_RECENT_SEARCHES)

      window.localStorage.setItem(RECENT_SEARCHES_STORAGE_KEY, JSON.stringify(nextSearches))

      return nextSearches
    })
  }, [])

  const openInstrument = useCallback(
    (instrument: Instrument) => {
      saveRecentSearch(instrument)
      setIsOpen(false)
      setQuery('')
      navigate(`/instrument/${encodeURIComponent(instrument.symbol)}`, {
        state: { instrument },
      })
    },
    [navigate, saveRecentSearch],
  )

  const handleQueryChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
    setIsOpen(true)
  }, [])

  const handleInputFocus = useCallback(() => {
    setIsOpen(true)
  }, [])

  const handleInputKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen || navigableItems.length === 0) {
        return
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setActiveIndex((currentIndex) => {
          return currentIndex >= navigableItems.length - 1 ? 0 : currentIndex + 1
        })
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        setActiveIndex((currentIndex) => {
          return currentIndex <= 0 ? navigableItems.length - 1 : currentIndex - 1
        })
      }

      if (event.key === 'Enter') {
        const selectedItem = navigableItems[activeIndex] ?? navigableItems[0]

        if (selectedItem) {
          event.preventDefault()
          openInstrument(selectedItem)
        }
      }
    },
    [activeIndex, isOpen, navigableItems, openInstrument],
  )

  const handleResultMouseEnter = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const nextIndex = Number(event.currentTarget.dataset.index)

    if (!Number.isNaN(nextIndex)) {
      setActiveIndex(nextIndex)
    }
  }, [])

  const handleResultClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const symbol = event.currentTarget.dataset.symbol
      const selectedItem = navigableItems.find((item) => item.symbol === symbol)

      if (selectedItem) {
        openInstrument(selectedItem)
      }
    },
    [navigableItems, openInstrument],
  )

  const renderSkeleton = (index: number) => {
    return (
      <div className={styles.skeletonItem} key={`skeleton-${index}`}>
        <div className={styles.skeletonBar} />
        <div className={styles.skeletonBar} />
      </div>
    )
  }

  const renderSearchResult = (instrument: Instrument, index: number) => {
    const isActive = activeIndex === index

    return (
      <button
        key={`result-${instrument.symbol}`}
        className={clsx(styles.resultButton, isActive && styles.activeResult)}
        type="button"
        data-index={index}
        data-symbol={instrument.symbol}
        role="option"
        aria-selected={isActive}
        onClick={handleResultClick}
        onMouseEnter={handleResultMouseEnter}
      >
        <div className={styles.resultTopRow}>
          <span className={styles.resultName}>{instrument.name}</span>
          <span className={styles.resultBadge}>{instrument.symbol}</span>
        </div>
        <div className={styles.resultMeta}>
          <span>{instrument.type.toUpperCase()}</span>
          <span>{instrument.exchange ?? 'Market unavailable'}</span>
          <span>{instrument.currency ?? 'Currency unavailable'}</span>
        </div>
      </button>
    )
  }

  const renderRecentSearch = (instrument: Instrument, index: number) => {
    return renderSearchResult(instrument, index)
  }

  const hasRecentSearches = !shouldSearch && recentItems.length > 0
  const hasNoResults = shouldSearch && !isFetching && visibleResults.length === 0
  const shouldShowQueryHint = query.trim().length > 0 && !shouldSearch && !hasRecentSearches
  const shouldShowPanel = isOpen && (query.length > 0 || hasRecentSearches)

  return (
    <div className={styles.shell} ref={shellRef}>
      <label className={styles.trigger} htmlFor="global-instrument-search">
        <input
          ref={inputRef}
          id="global-instrument-search"
          className={styles.input}
          type="search"
          role="combobox"
          aria-expanded={shouldShowPanel}
          aria-controls="global-search-results"
          aria-label="Global instrument search"
          placeholder="Search instruments"
          autoComplete="off"
          value={query}
          onChange={handleQueryChange}
          onFocus={handleInputFocus}
          onKeyDown={handleInputKeyDown}
        />
        <span className={styles.shortcut} aria-hidden="true">
          Cmd K
        </span>
      </label>

      {shouldShowPanel && (
        <div className={styles.panel} id="global-search-results" role="listbox">
          {hasRecentSearches && (
            <section className={styles.section} aria-label="Recent searches">
              <p className={styles.sectionTitle}>Recent</p>
              <div className={styles.resultList}>{recentItems.map(renderRecentSearch)}</div>
            </section>
          )}

          {shouldSearch && (
            <section className={styles.section} aria-label="Instrument results">
              <p className={styles.sectionTitle}>Instruments</p>

              {isFetching && (
                <div className={styles.skeletonList}>{[0, 1, 2].map(renderSkeleton)}</div>
              )}

              {!isFetching && (
                <div className={styles.resultList}>{visibleResults.map(renderSearchResult)}</div>
              )}

              {hasNoResults && <p className={styles.emptyText}>No instruments found.</p>}
            </section>
          )}

          {shouldShowQueryHint && (
            <section className={styles.section} aria-label="Search hint">
              <p className={styles.emptyText}>Type at least two characters to search.</p>
            </section>
          )}
        </div>
      )}
    </div>
  )
}

export default GlobalSearch
