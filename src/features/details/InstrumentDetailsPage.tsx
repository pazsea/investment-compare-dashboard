import { useCallback } from 'react'
import type { FC } from 'react'
import { useParams } from 'react-router-dom'
import clsx from 'clsx'

import { useGetInstrumentQuoteQuery } from '../../api/instrumentsApi'
import { EmptyState } from '../../components/EmptyState'
import { ErrorState } from '../../components/ErrorState'
import { LoadingState } from '../../components/LoadingState'
import { findMockInstrument } from '../../mocks/instruments'
import { useCompareSelection } from '../../hooks/useCompareSelection'
import { useWatchlist } from '../../hooks/useWatchlist'
import type { Instrument, InstrumentQuote } from '../../types/instrument'

import * as styles from './InstrumentDetailsPage.css'

const inferInstrumentType = (symbol: string, name: string): Instrument['type'] => {
  const normalizedSymbol = symbol.toUpperCase()
  const normalizedName = name.toLowerCase()

  if (normalizedSymbol.endsWith('USD') && !normalizedSymbol.includes('.')) {
    return 'crypto'
  }

  if (normalizedName.includes(' etf') || normalizedName.includes('exchange traded fund')) {
    return 'etf'
  }

  if (normalizedName.includes('fund')) {
    return 'fund'
  }

  return 'stock'
}

const createInstrumentFromQuote = (quote: InstrumentQuote): Instrument => {
  return {
    type: inferInstrumentType(quote.symbol, quote.name),
    symbol: quote.symbol,
    name: quote.name,
    currency: quote.currency,
    exchange: quote.exchange,
  }
}

const formatPrice = (quote: InstrumentQuote) => {
  const currency = quote.currency ?? 'USD'

  try {
    return new Intl.NumberFormat('en-US', {
      currency,
      style: 'currency',
    }).format(quote.price)
  } catch {
    return `${quote.price.toFixed(2)} ${currency}`
  }
}

const formatChange = (quote: InstrumentQuote) => {
  const changePrefix = quote.change > 0 ? '+' : ''

  return `${changePrefix}${quote.change.toFixed(2)} (${changePrefix}${quote.changesPercentage.toFixed(2)}%)`
}

const InstrumentDetailsPage: FC = () => {
  const params = useParams<{ symbol: string }>()
  const symbol = params.symbol?.trim().toUpperCase() ?? ''
  const { data: quote, isError, isFetching } = useGetInstrumentQuoteQuery(symbol, {
    skip: !symbol,
  })
  const fallbackInstrument = findMockInstrument(symbol)
  const instrument = fallbackInstrument ?? (quote ? createInstrumentFromQuote(quote) : undefined)
  const { addToCompare, canAddToCompare, isInCompare, removeFromCompare } = useCompareSelection()
  const { addToWatchlist, isInWatchlist, removeFromWatchlist } = useWatchlist()
  const isSelectedForCompare = instrument ? isInCompare(instrument.symbol) : false
  const isSavedToWatchlist = instrument ? isInWatchlist(instrument.symbol) : false
  const compareButtonLabel = isSelectedForCompare ? 'Remove from compare' : 'Add to compare'
  const watchlistButtonLabel = isSavedToWatchlist ? 'Remove from watchlist' : 'Add to watchlist'
  const compareButtonClassName = clsx(styles.button, isSelectedForCompare && styles.selectedButton)
  const watchlistButtonClassName = clsx(styles.button, isSavedToWatchlist && styles.selectedButton)
  const changeClassName = clsx(
    styles.metricValue,
    quote && quote.change >= 0 ? styles.positive : styles.negative,
  )
  const isCompareDisabled = !isSelectedForCompare && !canAddToCompare

  const handleCompareAction = useCallback(() => {
    if (!instrument) {
      return
    }

    if (isSelectedForCompare) {
      removeFromCompare(instrument.symbol)
      return
    }

    addToCompare(instrument)
  }, [addToCompare, instrument, isSelectedForCompare, removeFromCompare])

  const handleWatchlistAction = useCallback(() => {
    if (!instrument) {
      return
    }

    if (isSavedToWatchlist) {
      removeFromWatchlist(instrument.symbol)
      return
    }

    addToWatchlist(instrument)
  }, [addToWatchlist, instrument, isSavedToWatchlist, removeFromWatchlist])

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        {isFetching && (
          <LoadingState message="Loading instrument details..." />
        )}

        {isError && (
          <ErrorState message="Instrument details are unavailable right now." />
        )}

        {!isFetching && !isError && !instrument && (
          <EmptyState message={`No details found for ${symbol || 'this instrument'}.`} />
        )}

        {!isFetching && !isError && instrument && quote && (
          <section className={styles.panel} aria-labelledby="instrument-details-heading">
            <header className={styles.header}>
              <span className={styles.symbol}>{instrument.symbol}</span>
              <h1 className={styles.title} id="instrument-details-heading">
                {instrument.name}
              </h1>
              <div className={styles.meta}>
                <span>{instrument.type.toUpperCase()}</span>
                <span>{instrument.currency ?? quote.currency ?? 'Currency unavailable'}</span>
                <span>{instrument.exchange ?? quote.exchange ?? 'Market unavailable'}</span>
              </div>
            </header>

            <div className={styles.priceGrid}>
              <div className={styles.metric}>
                <span className={styles.metricLabel}>Price</span>
                <span className={styles.metricValue}>{formatPrice(quote)}</span>
              </div>
              <div className={styles.metric}>
                <span className={styles.metricLabel}>Daily change</span>
                <span className={changeClassName}>{formatChange(quote)}</span>
              </div>
              <div className={styles.metric}>
                <span className={styles.metricLabel}>Exchange</span>
                <span className={styles.metricValue}>
                  {instrument.exchange ?? quote.exchange ?? 'Unavailable'}
                </span>
              </div>
            </div>

            <div className={styles.actions}>
              <button
                className={compareButtonClassName}
                type="button"
                disabled={isCompareDisabled}
                aria-label={`${compareButtonLabel} ${instrument.symbol}`}
                onClick={handleCompareAction}
              >
                {compareButtonLabel}
              </button>
              <button
                className={watchlistButtonClassName}
                type="button"
                aria-label={`${watchlistButtonLabel} ${instrument.symbol}`}
                onClick={handleWatchlistAction}
              >
                {watchlistButtonLabel}
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

export default InstrumentDetailsPage
