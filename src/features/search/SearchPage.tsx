import { useState } from 'react'
import type { ChangeEvent, FC } from 'react'

import { useSearchInstrumentsQuery } from '../../api/instrumentsApi'
import { InstrumentCard } from '../../components/InstrumentCard'
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
          <section className={styles.status} aria-live="polite">
            Start with a symbol or company name.
          </section>
        )}

        {shouldSearch && isFetching && (
          <section className={styles.status} aria-live="polite">
            Searching instruments...
          </section>
        )}

        {shouldSearch && isError && (
          <section className={styles.errorStatus} aria-live="assertive">
            Search is unavailable right now. Try again in a moment.
          </section>
        )}

        {shouldSearch && !isFetching && !isError && instruments.length === 0 && (
          <section className={styles.status} aria-live="polite">
            No instruments found for "{debouncedQuery}".
          </section>
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
