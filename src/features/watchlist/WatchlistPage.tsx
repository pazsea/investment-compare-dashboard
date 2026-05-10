import type { MouseEvent } from 'react'

import { EmptyState } from '../../components/EmptyState'
import { useCompareSelection } from '../../hooks/useCompareSelection'
import { useWatchlist } from '../../hooks/useWatchlist'
import type { Instrument } from '../../types/instrument'

import * as styles from './WatchlistPage.css'

const WatchlistPage: React.FC = () => {
  const { addToCompare, canAddToCompare, isInCompare } = useCompareSelection()
  const { instruments, removeFromWatchlist } = useWatchlist()

  const handleRemoveFromWatchlist = (event: MouseEvent<HTMLButtonElement>) => {
    const symbol = event.currentTarget.dataset.symbol

    if (symbol) {
      removeFromWatchlist(symbol)
    }
  }

  const handleAddToCompare = (event: MouseEvent<HTMLButtonElement>) => {
    const symbol = event.currentTarget.dataset.symbol
    const instrument = instruments.find((savedInstrument) => savedInstrument.symbol === symbol)

    if (instrument) {
      addToCompare(instrument)
    }
  }

  const renderWatchlistCard = (instrument: Instrument) => {
    const isSelectedForCompare = isInCompare(instrument.symbol)
    const compareButtonLabel = isSelectedForCompare ? 'Added to compare' : 'Add to compare'
    const isCompareDisabled = isSelectedForCompare || !canAddToCompare

    return (
      <article className={styles.card} key={instrument.symbol} aria-labelledby={`${instrument.symbol}-watchlist-name`}>
        <div className={styles.cardHeader}>
          <span className={styles.symbol}>{instrument.symbol}</span>
          <h2 className={styles.instrumentName} id={`${instrument.symbol}-watchlist-name`}>
            {instrument.name}
          </h2>
          <div className={styles.meta}>
            <span>{instrument.type.toUpperCase()}</span>
            <span>{instrument.currency ?? 'Currency unavailable'}</span>
            <span>{instrument.exchange ?? 'Market unavailable'}</span>
          </div>
        </div>
        <div className={styles.actions}>
          <button
            className={styles.button}
            type="button"
            data-symbol={instrument.symbol}
            disabled={isCompareDisabled}
            aria-label={`${compareButtonLabel} ${instrument.symbol}`}
            onClick={handleAddToCompare}
          >
            {compareButtonLabel}
          </button>
          <button
            className={styles.removeButton}
            type="button"
            data-symbol={instrument.symbol}
            aria-label={`Remove ${instrument.symbol} from watchlist`}
            onClick={handleRemoveFromWatchlist}
          >
            Remove
          </button>
        </div>
      </article>
    )
  }

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Watchlist</p>
          <h1 className={styles.title}>Track instruments worth revisiting.</h1>
          <p className={styles.summary}>
            Keep interesting instruments close while you decide what deserves a deeper comparison.
          </p>
        </header>

        {instruments.length === 0 && (
          <EmptyState message="Your watchlist is empty." />
        )}

        {instruments.length > 0 && (
          <section className={styles.grid} aria-label="Saved instruments">
            {instruments.map(renderWatchlistCard)}
          </section>
        )}
      </div>
    </main>
  )
}

export default WatchlistPage
