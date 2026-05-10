import type { FC, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

import { useGetInstrumentQuoteQuery } from '../../api/instrumentsApi'
import { useCompareSelection } from '../../hooks/useCompareSelection'
import { useWatchlist } from '../../hooks/useWatchlist'
import type { Instrument } from '../../types/instrument'
import {
  getCurrencyLabel,
  getExchangeLabel,
  getInstrumentTypeLabel,
} from '../../utils/instrumentPresentation'
import {
  formatWatchlistChange,
  formatWatchlistPrice,
  getInstrumentDetailsPath,
  getInstrumentFocusLabel,
} from '../../features/watchlist/watchlistPresentation'

import * as styles from './WatchlistCard.css'

export type Props = {
  instrument: Instrument
}

const WatchlistCard: FC<Props> = (props) => {
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
          <p className={styles.quoteValue}>{formatWatchlistPrice(quote)}</p>
        </div>
        <div>
          <span className={styles.quoteLabel}>Dagens förändring</span>
          <p className={quoteChangeClassName}>{formatWatchlistChange(quote)}</p>
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

export default WatchlistCard
