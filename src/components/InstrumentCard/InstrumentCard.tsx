import { useCallback } from 'react'
import type { FC } from 'react'
import clsx from 'clsx'

import { useCompareSelection } from '../../hooks/useCompareSelection'
import type { Instrument } from '../../types/instrument'

import * as styles from './InstrumentCard.css'

export type Props = {
  instrument: Instrument
}

const getInstrumentTypeLabel = (type: Instrument['type']) => {
  return type.toUpperCase()
}

const InstrumentCard: FC<Props> = (props) => {
  const { instrument } = props
  const { addToCompare, canAddToCompare, isInCompare, removeFromCompare } = useCompareSelection()
  const exchange = instrument.exchange ?? 'Market unavailable'
  const currency = instrument.currency ?? 'Currency unavailable'
  const isSelectedForCompare = isInCompare(instrument.symbol)
  const compareButtonLabel = isSelectedForCompare ? 'Remove from compare' : 'Add to compare'
  const compareButtonClassName = clsx(styles.button, isSelectedForCompare && styles.selectedButton)
  const isCompareDisabled = !isSelectedForCompare && !canAddToCompare

  const handleCompareAction = useCallback(() => {
    if (isSelectedForCompare) {
      removeFromCompare(instrument.symbol)
      return
    }

    addToCompare(instrument)
  }, [addToCompare, instrument, isSelectedForCompare, removeFromCompare])

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
        <div className={styles.meta} aria-label="Instrument details">
          <span>{exchange}</span>
          <span>{currency}</span>
        </div>
      </div>

      <div className={styles.actions} aria-label={`${instrument.symbol} actions`}>
        <button
          className={compareButtonClassName}
          type="button"
          disabled={isCompareDisabled}
          aria-label={`${compareButtonLabel} ${instrument.symbol}`}
          onClick={handleCompareAction}
        >
          {compareButtonLabel}
        </button>
        <button className={styles.button} type="button" disabled>
          Add to watchlist
        </button>
      </div>
    </article>
  )
}

export default InstrumentCard
