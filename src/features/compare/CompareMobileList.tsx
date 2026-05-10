import type { FC } from 'react'
import clsx from 'clsx'

import type { Props } from './CompareMobileList.types'
import {
  getCurrencyLabel,
  getExchangeLabel,
  getInstrumentTypeLabel,
} from '../../utils/instrumentPresentation'

import * as styles from './ComparePage.css'

const CompareMobileList: FC<Props> = (props) => {
  const { metrics, onRemoveFromCompare, selectedInstruments } = props

  const renderMobileCard = (instrument: Props['selectedInstruments'][number]) => {
    const metric = metrics.find((entry) => entry.instrument.symbol === instrument.symbol)?.values
    const returnClassName =
      metric && metric.returnPercent >= 0 ? styles.positiveStat : styles.negativeStat

    return (
      <article className={styles.card} key={instrument.symbol} aria-labelledby={`${instrument.symbol}-compare-name`}>
        <div className={styles.cardHeader}>
          <div>
            <span className={styles.symbol}>{instrument.symbol}</span>
            <h2 className={styles.instrumentName} id={`${instrument.symbol}-compare-name`}>
              {instrument.name}
            </h2>
          </div>
          <button
            className={styles.removeButton}
            type="button"
            data-symbol={instrument.symbol}
            aria-label={`Ta bort ${instrument.symbol} från jämförelse`}
            onClick={onRemoveFromCompare}
          >
            Ta bort
          </button>
        </div>
        <dl className={styles.detailGrid}>
          <div>
            <dt className={styles.detailLabel}>Typ</dt>
            <dd className={styles.detailValue}>{getInstrumentTypeLabel(instrument.type)}</dd>
          </div>
          <div>
            <dt className={styles.detailLabel}>Valuta</dt>
            <dd className={styles.detailValue}>{getCurrencyLabel(instrument.currency)}</dd>
          </div>
          <div>
            <dt className={styles.detailLabel}>Marknad</dt>
            <dd className={styles.detailValue}>{getExchangeLabel(instrument.exchange)}</dd>
          </div>
          <div>
            <dt className={styles.detailLabel}>Avkastning</dt>
            <dd className={clsx(styles.detailValue, returnClassName)}>
              {metric ? `${metric.returnPercent}%` : 'Saknas'}
            </dd>
          </div>
        </dl>
      </article>
    )
  }

  return <div className={styles.mobileList}>{selectedInstruments.map(renderMobileCard)}</div>
}

export default CompareMobileList
