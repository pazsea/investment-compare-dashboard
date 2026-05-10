import { useMemo } from 'react'
import type { MouseEvent } from 'react'

import { DataTable } from '../../components/DataTable'
import { EmptyState } from '../../components/EmptyState'
import type { Column } from '../../components/DataTable'
import { useCompareSelection } from '../../hooks/useCompareSelection'
import type { Instrument } from '../../types/instrument'

import * as styles from './ComparePage.css'

const getRowKey = (instrument: Instrument) => {
  return instrument.symbol
}

const renderNameCell = (instrument: Instrument) => {
  return instrument.name
}

const renderSymbolCell = (instrument: Instrument) => {
  return instrument.symbol
}

const renderTypeCell = (instrument: Instrument) => {
  return instrument.type.toUpperCase()
}

const renderCurrencyCell = (instrument: Instrument) => {
  return instrument.currency ?? 'Unavailable'
}

const renderExchangeCell = (instrument: Instrument) => {
  return instrument.exchange ?? 'Unavailable'
}

const ComparePage: React.FC = () => {
  const { clearCompare, removeFromCompare, selectedInstruments } = useCompareSelection()
  const selectedCount = selectedInstruments.length
  const countLabel = selectedCount === 1 ? 'instrument' : 'instruments'

  const handleClearCompare = () => {
    clearCompare()
  }

  const handleRemoveFromCompare = (event: MouseEvent<HTMLButtonElement>) => {
    const symbol = event.currentTarget.dataset.symbol

    if (symbol) {
      removeFromCompare(symbol)
    }
  }

  const renderActionCell = (instrument: Instrument) => {
    return (
      <button
        className={styles.removeButton}
        type="button"
        data-symbol={instrument.symbol}
        aria-label={`Remove ${instrument.symbol} from compare`}
        onClick={handleRemoveFromCompare}
      >
        Remove
      </button>
    )
  }

  const columns = useMemo<Column<Instrument>[]>(() => {
    return [
      { id: 'name', header: 'Name', renderCell: renderNameCell },
      { id: 'symbol', header: 'Symbol', renderCell: renderSymbolCell },
      { id: 'type', header: 'Type', renderCell: renderTypeCell },
      { id: 'currency', header: 'Currency', renderCell: renderCurrencyCell },
      { id: 'exchange', header: 'Exchange', renderCell: renderExchangeCell },
      { id: 'actions', header: 'Actions', renderCell: renderActionCell },
    ]
  }, [])

  const renderMobileCard = (instrument: Instrument) => {
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
            aria-label={`Remove ${instrument.symbol} from compare`}
            onClick={handleRemoveFromCompare}
          >
            Remove
          </button>
        </div>
        <dl className={styles.detailGrid}>
          <div>
            <dt className={styles.detailLabel}>Type</dt>
            <dd className={styles.detailValue}>{instrument.type.toUpperCase()}</dd>
          </div>
          <div>
            <dt className={styles.detailLabel}>Currency</dt>
            <dd className={styles.detailValue}>{instrument.currency ?? 'Unavailable'}</dd>
          </div>
          <div>
            <dt className={styles.detailLabel}>Exchange</dt>
            <dd className={styles.detailValue}>{instrument.exchange ?? 'Unavailable'}</dd>
          </div>
        </dl>
      </article>
    )
  }

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Compare</p>
          <h1 className={styles.title}>Compare selected instruments.</h1>
          <p className={styles.summary}>
            Review selected instruments side by side before deeper performance and quote analysis
            is added.
          </p>
        </header>

        {selectedCount === 0 && (
          <EmptyState message="No instruments selected for comparison yet." />
        )}

        {selectedCount > 0 && (
          <section aria-labelledby="compare-results-heading">
            <div className={styles.toolbar}>
              <h2 id="compare-results-heading" className={styles.instrumentName}>
                Selected instruments
              </h2>
              <span className={styles.count}>
                {selectedCount} {countLabel}
              </span>
              <button className={styles.button} type="button" onClick={handleClearCompare}>
                Clear all
              </button>
            </div>

            <div className={styles.mobileList}>{selectedInstruments.map(renderMobileCard)}</div>
            <div className={styles.desktopTable}>
              <DataTable columns={columns} getRowKey={getRowKey} rows={selectedInstruments} />
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

export default ComparePage
