import { useCallback } from 'react'
import type { FC } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import clsx from 'clsx'
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

import { useGetInstrumentQuoteQuery } from '../../api/instrumentsApi'
import { EmptyState } from '../../components/EmptyState'
import { ErrorState } from '../../components/ErrorState'
import { LoadingState } from '../../components/LoadingState'
import { useCompareSelection } from '../../hooks/useCompareSelection'
import { useWatchlist } from '../../hooks/useWatchlist'
import { findMockInstrument } from '../../mocks/instruments'
import { vars } from '../../styles/theme.css'
import type { Instrument, InstrumentQuote } from '../../types/instrument'
import {
  getDetailsSeries,
  getInstrumentFocus,
  getInstrumentNarrative,
  getTrendLabel,
} from './detailsPerformance'

import * as styles from './InstrumentDetailsPage.css'

type LocationState = {
  instrument?: Instrument
}

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

const formatCompactPrice = (quote: InstrumentQuote) => {
  const currency = quote.currency ?? 'USD'

  try {
    return new Intl.NumberFormat('en-US', {
      currency,
      notation: 'compact',
      style: 'currency',
      maximumFractionDigits: 2,
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
  const location = useLocation()
  const locationState = location.state as LocationState | null
  const symbol = params.symbol?.trim().toUpperCase() ?? ''
  const { data: quote, isError, isFetching } = useGetInstrumentQuoteQuery(symbol, {
    skip: !symbol,
  })
  const fallbackInstrument = findMockInstrument(symbol)
  const instrument =
    locationState?.instrument ?? fallbackInstrument ?? (quote ? createInstrumentFromQuote(quote) : undefined)
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
  const heroChangeClassName = clsx(
    styles.heroChange,
    quote && quote.change >= 0 ? styles.positive : styles.negative,
  )
  const isCompareDisabled = !isSelectedForCompare && !canAddToCompare
  const focus = instrument ? getInstrumentFocus(instrument) : undefined
  const narrative = instrument ? getInstrumentNarrative(instrument) : undefined
  const series = quote ? getDetailsSeries(quote) : []
  const trendLabel = quote ? getTrendLabel(quote) : undefined

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
          <LoadingState
            title="Loading instrument details"
            message="Pricing, exchange data, and actions are on the way."
            variant="details"
          />
        )}

        {isError && <ErrorState message="Instrument details are unavailable right now." />}

        {!isFetching && !isError && !instrument && (
          <EmptyState message={`No details found for ${symbol || 'this instrument'}.`} />
        )}

        {!isFetching && !isError && instrument && (
          <section className={styles.panel} aria-labelledby="instrument-details-heading">
            <header className={styles.hero}>
              <div className={styles.heroHeader}>
                <div className={styles.header}>
                  <span className={styles.symbol}>{instrument.symbol}</span>
                  <h1 className={styles.title} id="instrument-details-heading">
                    {instrument.name}
                  </h1>
                  <div className={styles.meta}>
                    <span className={styles.badge}>{instrument.type.toUpperCase()}</span>
                    {focus && <span className={styles.badge}>{focus.value}</span>}
                    <span className={styles.badge}>
                      {instrument.exchange ?? quote?.exchange ?? 'Market unavailable'}
                    </span>
                  </div>
                </div>
                <div className={styles.heroMetrics}>
                  {quote && <span className={styles.heroPrice}>{formatPrice(quote)}</span>}
                  {quote && <span className={heroChangeClassName}>{formatChange(quote)}</span>}
                  {!quote && <span className={styles.heroPriceFallback}>Quote unavailable</span>}
                  <span className={styles.heroCaption}>
                    {trendLabel ?? 'Live pricing is not available for this symbol on the current API plan.'}
                  </span>
                </div>
              </div>
            </header>

            {quote && (
              <section className={styles.chartPanel} aria-labelledby="instrument-performance-heading">
                <div className={styles.sectionHeader}>
                  <div>
                    <h2 className={styles.sectionTitle} id="instrument-performance-heading">
                      Session performance
                    </h2>
                    <p className={styles.sectionSummary}>
                      A compact view of recent movement anchored to the latest quote.
                    </p>
                  </div>
                  <div className={styles.chartSummary}>
                    <span className={styles.chartSummaryLabel}>Latest</span>
                    <span className={styles.chartSummaryValue}>{formatCompactPrice(quote)}</span>
                  </div>
                </div>
                <div className={styles.chartCanvas}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={series} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="details-chart-fill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={vars.colors.primary} stopOpacity={0.28} />
                          <stop offset="100%" stopColor={vars.colors.primary} stopOpacity={0.02} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="label" tickLine={false} axisLine={false} />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        width={56}
                        domain={['dataMin - 1', 'dataMax + 1']}
                      />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke={vars.colors.primary}
                        strokeWidth={2.5}
                        fill="url(#details-chart-fill)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </section>
            )}

            <div className={styles.priceGrid}>
              {quote && (
                <div className={styles.metric}>
                  <span className={styles.metricLabel}>Price</span>
                  <span className={styles.metricValue}>{formatPrice(quote)}</span>
                </div>
              )}
              {quote && (
                <div className={styles.metric}>
                  <span className={styles.metricLabel}>Daily change</span>
                  <span className={changeClassName}>{formatChange(quote)}</span>
                </div>
              )}
              <div className={styles.metric}>
                <span className={styles.metricLabel}>Exchange</span>
                <span className={styles.metricValue}>
                  {instrument.exchange ?? quote?.exchange ?? 'Unavailable'}
                </span>
              </div>
              <div className={styles.metric}>
                <span className={styles.metricLabel}>{focus?.label ?? 'Profile'}</span>
                <span className={styles.metricValueSmall}>{focus?.value ?? 'Unavailable'}</span>
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

            <section className={styles.aboutPanel} aria-labelledby="instrument-about-heading">
              <div className={styles.sectionHeader}>
                <div>
                  <h2 className={styles.sectionTitle} id="instrument-about-heading">
                    About this instrument
                  </h2>
                  <p className={styles.sectionSummary}>
                    Context designed to support quick triage during research and comparison.
                  </p>
                </div>
              </div>
              <p className={styles.aboutCopy}>{narrative}</p>
            </section>
          </section>
        )}
      </div>
    </main>
  )
}

export default InstrumentDetailsPage
