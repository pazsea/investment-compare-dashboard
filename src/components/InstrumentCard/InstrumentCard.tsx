import { useCallback } from 'react'
import type { FC } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

import { useCompareSelection } from '../../hooks/useCompareSelection'
import { useWatchlist } from '../../hooks/useWatchlist'
import type { Instrument } from '../../types/instrument'
import {
  getCurrencyLabel,
  getExchangeLabel,
  getInstrumentTypeLabel,
} from '../../utils/instrumentPresentation'
import { getInstrumentDetailsPath } from '../../utils/instrumentRoutes'

import * as styles from './InstrumentCard.css'

export type Props = {
  instrument: Instrument
}

const InstrumentCard: FC<Props> = (props) => {
  const { instrument } = props
  const { addToCompare, canAddToCompare, isInCompare, removeFromCompare } = useCompareSelection()
  const { addToWatchlist, isInWatchlist, removeFromWatchlist } = useWatchlist()
  const exchange = getExchangeLabel(instrument.exchange)
  const currency = getCurrencyLabel(instrument.currency)
  const isSelectedForCompare = isInCompare(instrument.symbol)
  const isSavedToWatchlist = isInWatchlist(instrument.symbol)
  const compareButtonLabel = isSelectedForCompare ? 'Ta bort från jämförelse' : 'Lägg till i jämförelse'
  const watchlistButtonLabel = isSavedToWatchlist ? 'Ta bort från bevakningslista' : 'Lägg till i bevakningslista'
  const compareButtonClassName = clsx(styles.button, isSelectedForCompare && styles.selectedButton)
  const watchlistButtonClassName = clsx(styles.button, isSavedToWatchlist && styles.selectedButton)
  const isCompareDisabled = !isSelectedForCompare && !canAddToCompare

  const handleCompareAction = useCallback(() => {
    if (isSelectedForCompare) {
      removeFromCompare(instrument.symbol)
      return
    }

    addToCompare(instrument)
  }, [addToCompare, instrument, isSelectedForCompare, removeFromCompare])

  const handleWatchlistAction = useCallback(() => {
    if (isSavedToWatchlist) {
      removeFromWatchlist(instrument.symbol)
      return
    }

    addToWatchlist(instrument)
  }, [addToWatchlist, instrument, isSavedToWatchlist, removeFromWatchlist])

  return (
    <article className={styles.card} aria-labelledby={`${instrument.symbol}-name`}>
      <div className={styles.header}>
        <div className={styles.symbolRow}>
          <span className={styles.symbol}>{instrument.symbol}</span>
          <span className={styles.type}>{getInstrumentTypeLabel(instrument.type)}</span>
        </div>
        <h2 id={`${instrument.symbol}-name`} className={styles.name}>
          {instrument.name}
        </h2>
        <div className={styles.meta} aria-label="Instrumentdetaljer">
          <span>{exchange}</span>
          <span>{currency}</span>
        </div>
      </div>
      <Link
        className={styles.stretchedLink}
        to={getInstrumentDetailsPath(instrument.symbol)}
        state={{ instrument }}
        aria-label={`Öppna ${instrument.name}`}
      />

      <div className={styles.actions} aria-label={`Åtgärder för ${instrument.symbol}`}>
        <Link className={styles.action} to={getInstrumentDetailsPath(instrument.symbol)} state={{ instrument }}>
          Visa detaljer
        </Link>
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
    </article>
  )
}

export default InstrumentCard
