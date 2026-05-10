import { useCallback } from 'react'
import type { FC } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import clsx from 'clsx'
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

import { useGetInstrumentProfileQuery } from '../../api/instrumentsApi'
import { ExpandableText } from '../../components/ExpandableText'
import { inferInstrumentType } from '../../api/fmpMappers'
import { EmptyState } from '../../components/EmptyState'
import { ErrorState } from '../../components/ErrorState'
import { LoadingState } from '../../components/LoadingState'
import { useCompareSelection } from '../../hooks/useCompareSelection'
import { useWatchlist } from '../../hooks/useWatchlist'
import { vars } from '../../styles/theme.css'
import type { Instrument, InstrumentProfile } from '../../types/instrument'
import { getExchangeLabel, getInstrumentTypeLabel } from '../../utils/instrumentPresentation'
import { isDetailsLocationState } from './detailsTypeguards'
import {
  getDetailsSeries,
  getInstrumentFocus,
  getInstrumentNarrative,
  getTrendLabel,
} from './detailsPerformance'

import * as styles from './InstrumentDetailsPage.css'

const createInstrumentFromProfile = (profile: InstrumentProfile): Instrument => {
  return {
    type: profile.isFund ? 'fund' : profile.isEtf ? 'etf' : inferInstrumentType(profile.symbol, profile.name),
    symbol: profile.symbol,
    name: profile.name,
    currency: profile.currency,
    exchange: profile.exchange,
    ...(profile.sector ? { sector: profile.sector } : {}),
  }
}

const formatPrice = (profile: InstrumentProfile) => {
  if (profile.price === undefined) {
    return 'Kurs saknas'
  }

  const currency = profile.currency ?? 'USD'

  try {
    return new Intl.NumberFormat('sv-SE', {
      currency,
      style: 'currency',
    }).format(profile.price)
  } catch {
    return `${profile.price.toFixed(2)} ${currency}`
  }
}

const formatCompactPrice = (profile: InstrumentProfile) => {
  if (profile.price === undefined) {
    return 'Kurs saknas'
  }

  const currency = profile.currency ?? 'USD'

  try {
    return new Intl.NumberFormat('sv-SE', {
      currency,
      notation: 'compact',
      style: 'currency',
      maximumFractionDigits: 2,
    }).format(profile.price)
  } catch {
    return `${profile.price.toFixed(2)} ${currency}`
  }
}

const formatChange = (profile: InstrumentProfile) => {
  if (profile.change === undefined || profile.changesPercentage === undefined) {
    return 'Förändring saknas'
  }

  const changePrefix = profile.change > 0 ? '+' : ''

  return `${changePrefix}${profile.change.toFixed(2)} (${changePrefix}${profile.changesPercentage.toFixed(2)}%)`
}

const InstrumentDetailsPage: FC = () => {
  const params = useParams<{ symbol: string }>()
  const location = useLocation()
  const locationState = isDetailsLocationState(location.state) ? location.state : undefined
  const symbol = params.symbol?.trim().toUpperCase() ?? ''
  const routeInstrument = locationState?.instrument
  const { data: profile, isError, isFetching } = useGetInstrumentProfileQuery(symbol, {
    skip: !symbol,
  })
  const profileInstrument = profile ? createInstrumentFromProfile(profile) : undefined
  const instrument = routeInstrument ?? profileInstrument
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
    profile && (profile.change ?? 0) >= 0 ? styles.positive : styles.negative,
  )
  const heroChangeClassName = clsx(
    styles.heroChange,
    profile && (profile.change ?? 0) >= 0 ? styles.positive : styles.negative,
  )
  const isCompareDisabled = !isSelectedForCompare && !canAddToCompare
  const focus = instrument ? getInstrumentFocus(instrument) : undefined
  const narrative = instrument ? getInstrumentNarrative(instrument) : undefined
  const aboutText = profile?.description ?? narrative ?? ''
  const series = profile?.price !== undefined ? getDetailsSeries(profile) : []
  const trendLabel = profile ? getTrendLabel(profile) : undefined
  const showErrorState = isError && !instrument

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
            message="Profil, marknadsinformation och åtgärder är på väg."
            variant="details"
          />
        )}

        {showErrorState && <ErrorState message="Instrumentdetaljer är inte tillgängliga just nu." />}

        {!isFetching && !showErrorState && !instrument && (
          <EmptyState message={`Inga detaljer hittades för ${symbol || 'det här instrumentet'}.`} />
        )}

        {!isFetching && !showErrorState && instrument && (
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
                    <span className={styles.badge}>{getExchangeLabel(instrument.exchange ?? profile?.exchange)}</span>
                  </div>
                </div>
                <div className={styles.heroMetrics}>
                  {profile?.price !== undefined && <span className={styles.heroPrice}>{formatPrice(profile)}</span>}
                  {profile?.price !== undefined && profile.change !== undefined && (
                    <span className={heroChangeClassName}>{formatChange(profile)}</span>
                  )}
                  {profile?.price === undefined && (
                    <span className={styles.heroPriceFallback}>Kurs saknas</span>
                  )}
                  <span className={styles.heroCaption}>
                    {trendLabel ?? 'Profilen saknar prisdata just nu.'}
                  </span>
                </div>
              </div>
            </header>

            {profile?.price !== undefined && (
              <section className={styles.chartPanel} aria-labelledby="instrument-performance-heading">
                <div className={styles.sectionHeader}>
                  <div>
                    <h2 className={styles.sectionTitle} id="instrument-performance-heading">
                      Dagens utveckling
                    </h2>
                    <p className={styles.sectionSummary}>
                      En kompakt vy over den senaste rorelsen baserad pa profilens prisdata.
                    </p>
                  </div>
                  <div className={styles.chartSummary}>
                    <span className={styles.chartSummaryLabel}>Senaste</span>
                    <span className={styles.chartSummaryValue}>{formatCompactPrice(profile)}</span>
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
              {profile?.price !== undefined && (
                <div className={styles.metric}>
                  <span className={styles.metricLabel}>Kurs</span>
                  <span className={styles.metricValue}>{formatPrice(profile)}</span>
                </div>
              )}
              {profile?.change !== undefined && profile.changesPercentage !== undefined && (
                <div className={styles.metric}>
                  <span className={styles.metricLabel}>Dagens förändring</span>
                  <span className={changeClassName}>{formatChange(profile)}</span>
                </div>
              )}
              <div className={styles.metric}>
                <span className={styles.metricLabel}>Marknad</span>
                <span className={styles.metricValue}>{getExchangeLabel(instrument.exchange ?? profile?.exchange)}</span>
              </div>
              <div className={styles.metric}>
                <span className={styles.metricLabel}>{focus?.label ?? 'Profil'}</span>
                <span className={styles.metricValueSmall}>
                  {profile?.industry ?? focus?.value ?? 'Saknas'}
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
              <div className={styles.aboutLayout}>
                <div className={styles.profileMeta}>
                  <ExpandableText text={aboutText} />
                  {profile && (
                    <div className={styles.profileGrid}>
                      {profile.ceo && (
                        <div className={styles.metric}>
                          <span className={styles.metricLabel}>VD</span>
                          <span className={styles.metricValueSmall}>{profile.ceo}</span>
                        </div>
                      )}
                      {profile.sector && (
                        <div className={styles.metric}>
                          <span className={styles.metricLabel}>Sektor</span>
                          <span className={styles.metricValueSmall}>{profile.sector}</span>
                        </div>
                      )}
                      {profile.industry && (
                        <div className={styles.metric}>
                          <span className={styles.metricLabel}>Bransch</span>
                          <span className={styles.metricValueSmall}>{profile.industry}</span>
                        </div>
                      )}
                      {profile.fullTimeEmployees && (
                        <div className={styles.metric}>
                          <span className={styles.metricLabel}>Anställda</span>
                          <span className={styles.metricValueSmall}>{profile.fullTimeEmployees}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {profile && (
                  <aside className={styles.companyCard} aria-label="Bolagsprofil">
                    <div className={styles.companyMark}>
                      {profile.image && (
                        <img
                          className={styles.companyImage}
                          src={profile.image}
                          alt={`${profile.name} logotyp`}
                        />
                      )}
                      <div className={styles.companyInfo}>
                        <h3 className={styles.companyName}>{profile.name}</h3>
                        <span className={styles.companySubline}>
                          {profile.city && profile.state
                            ? `${profile.city}, ${profile.state}`
                            : profile.country ?? 'Plats saknas'}
                        </span>
                      </div>
                    </div>
                    {profile.website && (
                      <a
                        className={styles.actionLink}
                        href={profile.website}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Besök webbplats
                      </a>
                    )}
                  </aside>
                )}
              </div>
            </section>
          </section>
        )}
      </div>
    </main>
  )
}

export default InstrumentDetailsPage
