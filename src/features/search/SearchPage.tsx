import { useState } from 'react'
import type { ChangeEvent, FC } from 'react'

import { useSearchInstrumentsQuery } from '../../api/instrumentsApi'
import { EmptyState } from '../../components/EmptyState'
import { ErrorState } from '../../components/ErrorState'
import { InstrumentCard } from '../../components/InstrumentCard'
import { LoadingState } from '../../components/LoadingState'
import { useDebounce } from '../../hooks/useDebounce'
import type { Instrument } from '../../types/instrument'

import * as styles from './SearchPage.css'

const MIN_QUERY_LENGTH = 2

const renderInstrumentCard = (instrument: Instrument) => {
  return <InstrumentCard key={instrument.symbol} instrument={instrument} />
}

const SearchPage: FC = () => {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query.trim(), 350)
  const shouldSearch = debouncedQuery.length >= MIN_QUERY_LENGTH
  const { data: instruments = [], isFetching, isError } = useSearchInstrumentsQuery(debouncedQuery, {
    skip: !shouldSearch,
  })

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const resultLabel = instruments.length === 1 ? 'result' : 'results'

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Instrument search</p>
          <h1 className={styles.title}>Find stocks, ETFs, funds, and crypto instruments.</h1>
          <p className={styles.summary}>
            Search by symbol or name to discover instruments for future comparison and watchlist
            workflows.
          </p>
        </header>

        <section className={styles.searchPanel} aria-label="Instrument search form">
          <label className={styles.label} htmlFor="instrument-search">
            Search instruments
          </label>
          <input
            id="instrument-search"
            className={styles.input}
            type="search"
            value={query}
            placeholder="Try AAPL, VOO, Bitcoin, or Microsoft"
            autoComplete="off"
            onChange={handleQueryChange}
          />
          <p id="instrument-search-heading" className={styles.helper}>
            Enter at least two characters to search.
          </p>
        </section>

        {!shouldSearch && (
          <EmptyState message="Start with a symbol or company name." />
        )}

        {shouldSearch && isFetching && (
          <LoadingState
            title="Searching instruments"
            message="Matching results will appear here as they load."
            variant="search-results"
          />
        )}

        {shouldSearch && isError && (
          <ErrorState message="Search is unavailable right now. Try again in a moment." />
        )}

        {shouldSearch && !isFetching && !isError && instruments.length === 0 && (
          <EmptyState message={`No instruments found for "${debouncedQuery}".`} />
        )}

        {shouldSearch && !isError && instruments.length > 0 && (
          <section aria-labelledby="search-results-heading">
            <div className={styles.resultsHeader}>
              <h2 id="search-results-heading" className={styles.resultsTitle}>
                Search results
              </h2>
              <span className={styles.resultCount}>
                {instruments.length} {resultLabel}
              </span>
            </div>
            <div className={styles.grid}>{instruments.map(renderInstrumentCard)}</div>
          </section>
        )}
      </div>
    </main>
  )
}

export default SearchPage
