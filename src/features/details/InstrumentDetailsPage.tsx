import { useCallback } from 'react'
import type { FC } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import clsx from 'clsx'
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

import { canUseLiveQuoteForInstrument, canUseLiveQuoteForSymbol } from '../../api/fmpAvailability'
import { useGetInstrumentQuoteQuery } from '../../api/instrumentsApi'
import { EmptyState } from '../../components/EmptyState'
import { ErrorState } from '../../components/ErrorState'
import { LoadingState } from '../../components/LoadingState'
import { useCompareSelection } from '../../hooks/useCompareSelection'
import { useWatchlist } from '../../hooks/useWatchlist'
import { findMockInstrument } from '../../mocks/instruments'
import { vars } from '../../styles/theme.css'
import type { Instrument, InstrumentQuote } from '../../types/instrument'
import { getExchangeLabel, getInstrumentTypeLabel } from '../../utils/instrumentPresentation'
import { isDetailsLocationState } from './detailsTypeguards'
import {
  getDetailsSeries,
  getInstrumentFocus,
  getInstrumentNarrative,
  getTrendLabel,
} from './detailsPerformance'

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
    return new Intl.NumberFormat('sv-SE', {
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
    return new Intl.NumberFormat('sv-SE', {
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
  const locationState = isDetailsLocationState(location.state) ? location.state : undefined
  const symbol = params.symbol?.trim().toUpperCase() ?? ''
  const fallbackInstrument = findMockInstrument(symbol)
  const routeInstrument = locationState?.instrument ?? fallbackInstrument
  const shouldFetchLiveQuote = routeInstrument
    ? canUseLiveQuoteForInstrument(routeInstrument)
    : canUseLiveQuoteForSymbol(symbol)
  const { data: quote, isError, isFetching } = useGetInstrumentQuoteQuery(symbol, {
    skip: !symbol || !shouldFetchLiveQuote,
  })
  const instrument =
    routeInstrument ?? (quote ? createInstrumentFromQuote(quote) : undefined)
  const { addToCompare, canAddToCompare, isInCompare, removeFromCompare } = useCompareSelection()
  const { addToWatchlist, isInWatchlist, removeFromWatchlist } = useWatchlist()
  const isSelectedForCompare = instrument ? isInCompare(instrument.symbol) : false
  const isSavedToWatchlist = instrument ? isInWatchlist(instrument.symbol) : false
  const compareButtonLabel = isSelectedForCompare ? 'Ta bort från jämförelse' : 'Lägg till i jämförelse'
  const watchlistButtonLabel = isSavedToWatchlist ? 'Ta bort från bevakningslista' : 'Lägg till i bevakningslista'
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
            title="Laddar instrumentdetaljer"
            message="Kursdata, marknadsinformation och åtgärder är på väg."
            variant="details"
          />
        )}

        {isError && <ErrorState message="Instrumentdetaljer är inte tillgängliga just nu." />}

        {!isFetching && !isError && !instrument && (
          <EmptyState message={`Inga detaljer hittades för ${symbol || 'det här instrumentet'}.`} />
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
                    <span className={styles.badge}>{getInstrumentTypeLabel(instrument.type)}</span>
                    {focus && <span className={styles.badge}>{focus.value}</span>}
                    <span className={styles.badge}>{getExchangeLabel(instrument.exchange ?? quote?.exchange)}</span>
                  </div>
                </div>
                <div className={styles.heroMetrics}>
                  {quote && <span className={styles.heroPrice}>{formatPrice(quote)}</span>}
                  {quote && <span className={heroChangeClassName}>{formatChange(quote)}</span>}
                  {!quote && <span className={styles.heroPriceFallback}>Kurs saknas</span>}
                  <span className={styles.heroCaption}>
                    {trendLabel ?? 'Live-prissättning är inte tillgänglig för den här symbolen i din nuvarande API-plan.'}
                  </span>
                </div>
              </div>
            </header>

            {quote && (
              <section className={styles.chartPanel} aria-labelledby="instrument-performance-heading">
                <div className={styles.sectionHeader}>
                  <div>
                    <h2 className={styles.sectionTitle} id="instrument-performance-heading">
                      Dagens utveckling
                    </h2>
                    <p className={styles.sectionSummary}>
                      En kompakt vy över den senaste rörelsen baserad på aktuell kurs.
                    </p>
                  </div>
                  <div className={styles.chartSummary}>
                    <span className={styles.chartSummaryLabel}>Senaste</span>
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
                  <span className={styles.metricLabel}>Kurs</span>
                  <span className={styles.metricValue}>{formatPrice(quote)}</span>
                </div>
              )}
              {quote && (
                <div className={styles.metric}>
                  <span className={styles.metricLabel}>Dagens förändring</span>
                  <span className={changeClassName}>{formatChange(quote)}</span>
                </div>
              )}
              <div className={styles.metric}>
                <span className={styles.metricLabel}>Marknad</span>
                <span className={styles.metricValue}>{getExchangeLabel(instrument.exchange ?? quote?.exchange)}</span>
              </div>
              <div className={styles.metric}>
                <span className={styles.metricLabel}>{focus?.label ?? 'Profil'}</span>
                <span className={styles.metricValueSmall}>{focus?.value ?? 'Saknas'}</span>
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
                    Om instrumentet
                  </h2>
                  <p className={styles.sectionSummary}>
                    Kontext som hjälper dig att snabbt bedöma instrumentet inför vidare analys och jämförelse.
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
