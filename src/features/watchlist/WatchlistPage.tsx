import type { FC, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

import { useGetInstrumentQuoteQuery } from '../../api/instrumentsApi'
import { EmptyState } from '../../components/EmptyState'
import { useCompareSelection } from '../../hooks/useCompareSelection'
import { useWatchlist } from '../../hooks/useWatchlist'
import type { Instrument, InstrumentQuote } from '../../types/instrument'
import {
  getCurrencyLabel,
  getExchangeLabel,
  getInstrumentTypeLabel,
} from '../../utils/instrumentPresentation'

import * as styles from './WatchlistPage.css'

type WatchlistCardProps = {
  instrument: Instrument
}

const formatPrice = (quote?: InstrumentQuote) => {
  if (!quote) {
    return 'Kurs saknas'
  }

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

const formatChange = (quote?: InstrumentQuote) => {
  if (!quote) {
    return 'Förändring saknas'
  }

  const prefix = quote.change > 0 ? '+' : ''

  return `${prefix}${quote.change.toFixed(2)} (${prefix}${quote.changesPercentage.toFixed(2)}%)`
}

const getInstrumentFocusLabel = (instrument: Instrument) => {
  if ('sector' in instrument && instrument.sector) {
    return instrument.sector
  }

  if ('category' in instrument && instrument.category) {
    return instrument.category
  }

  if (instrument.type === 'crypto') {
    return 'Digital tillgång'
  }

  return 'Bred exponering'
}

const getInstrumentDetailsPath = (symbol: string) => {
  return `/instrument/${encodeURIComponent(symbol)}`
}

const WatchlistCard: FC<WatchlistCardProps> = (props) => {
  const { instrument } = props
  const { addToCompare, canAddToCompare, isInCompare } = useCompareSelection()
  const { removeFromWatchlist } = useWatchlist()
  const { data: quote } = useGetInstrumentQuoteQuery(instrument.symbol)
  const isSelectedForCompare = isInCompare(instrument.symbol)
  const compareButtonLabel = isSelectedForCompare ? 'Redan i jämförelse' : 'Lägg till i jämförelse'
  const isCompareDisabled = isSelectedForCompare || !canAddToCompare
  const quoteChangeClassName = clsx(
    styles.quoteChange,
    quote && quote.change >= 0 ? styles.positive : styles.negative,
  )

  const handleAddToCompare = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    addToCompare(instrument)
  }

  const handleRemoveFromWatchlist = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    removeFromWatchlist(instrument.symbol)
  }

  return (
    <article className={styles.card} aria-labelledby={`${instrument.symbol}-watchlist-name`}>
      <Link
        className={styles.stretchedLink}
        to={getInstrumentDetailsPath(instrument.symbol)}
        state={{ instrument }}
        aria-label={`Öppna ${instrument.name}`}
      />
      <div className={styles.cardHeader}>
        <span className={styles.symbol}>{instrument.symbol}</span>
        <h2 className={styles.instrumentName} id={`${instrument.symbol}-watchlist-name`}>
          {instrument.name}
        </h2>
        <div className={styles.meta}>
          <span>{getInstrumentTypeLabel(instrument.type)}</span>
          <span>{getExchangeLabel(instrument.exchange)}</span>
          <span>{getCurrencyLabel(instrument.currency)}</span>
        </div>
      </div>

      <div className={styles.quotePanel}>
        <div>
          <span className={styles.quoteLabel}>Senaste kurs</span>
          <p className={styles.quoteValue}>{formatPrice(quote)}</p>
        </div>
        <div>
          <span className={styles.quoteLabel}>Dagens förändring</span>
          <p className={quoteChangeClassName}>{formatChange(quote)}</p>
        </div>
      </div>

      <div className={styles.detailGrid}>
        <div>
          <span className={styles.detailLabel}>Fokus</span>
          <span className={styles.detailValue}>{getInstrumentFocusLabel(instrument)}</span>
        </div>
        <div>
          <span className={styles.detailLabel}>Status</span>
          <span className={styles.detailValue}>
            {quote ? 'Live eller mockad kurs tillgänglig' : 'Ingen kurs tillgänglig'}
          </span>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.button}
          type="button"
          disabled={isCompareDisabled}
          aria-label={`${compareButtonLabel} ${instrument.symbol}`}
          onClick={handleAddToCompare}
        >
          {compareButtonLabel}
        </button>
        <Link className={styles.actionLink} to={getInstrumentDetailsPath(instrument.symbol)} state={{ instrument }}>
          Visa detaljer
        </Link>
        <button
          className={styles.removeButton}
          type="button"
          aria-label={`Ta bort ${instrument.symbol} från bevakningslistan`}
          onClick={handleRemoveFromWatchlist}
        >
          Ta bort
        </button>
      </div>
    </article>
  )
}

const renderWatchlistCard = (instrument: Instrument) => {
  return <WatchlistCard key={instrument.symbol} instrument={instrument} />
}

const WatchlistPage: FC = () => {
  const { instruments } = useWatchlist()

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Bevakningslista</p>
          <h1 className={styles.title}>Följ instrument du vill återvända till.</h1>
          <p className={styles.summary}>
            Håll intressanta instrument nära till hands medan du avgör vad som förtjänar djupare analys.
          </p>
        </header>

        {instruments.length === 0 && <EmptyState message="Din bevakningslista är tom." />}

        {instruments.length > 0 && (
          <section className={styles.grid} aria-label="Sparade instrument">
            {instruments.map(renderWatchlistCard)}
          </section>
        )}
      </div>
    </main>
  )
}

export default WatchlistPage
