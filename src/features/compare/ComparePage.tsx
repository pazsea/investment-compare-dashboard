import { useMemo, useState } from 'react'
import type { MouseEvent } from 'react'
import clsx from 'clsx'
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { DataTable } from '../../components/DataTable'
import { EmptyState } from '../../components/EmptyState'
import type { Column } from '../../components/DataTable'
import { useCompareSelection } from '../../hooks/useCompareSelection'
import type { Instrument } from '../../types/instrument'
import {
  getCompareChartData,
  getCompareMetrics,
  type CompareRange,
} from './comparePerformance'

import * as styles from './ComparePage.css'

const rangeOptions: CompareRange[] = ['1D', '1W', '1M', '1Y', '5Y']

const chartColors = [
  'var(--compare-line-1, #2563EB)',
  'var(--compare-line-2, #059669)',
  'var(--compare-line-3, #D97706)',
  'var(--compare-line-4, #DC2626)',
]

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
  const [range, setRange] = useState<CompareRange>('1M')
  const selectedCount = selectedInstruments.length
  const countLabel = selectedCount === 1 ? 'instrument' : 'instruments'
  const chartData = useMemo(() => {
    return getCompareChartData(selectedInstruments, range).map((point) => ({
      label: point.label,
      ...point.values,
    }))
  }, [range, selectedInstruments])
  const metrics = useMemo(() => {
    return selectedInstruments.map((instrument) => ({
      instrument,
      values: getCompareMetrics(instrument, range),
    }))
  }, [range, selectedInstruments])

  const handleClearCompare = () => {
    clearCompare()
  }

  const handleRangeChange = (event: MouseEvent<HTMLButtonElement>) => {
    const nextRange = event.currentTarget.dataset.range as CompareRange | undefined

    if (nextRange) {
      setRange(nextRange)
    }
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

  const renderRangeButton = (option: CompareRange) => {
    return (
      <button
        key={option}
        className={clsx(styles.rangeButton, option === range && styles.activeRangeButton)}
        type="button"
        data-range={option}
        aria-pressed={option === range}
        onClick={handleRangeChange}
      >
        {option}
      </button>
    )
  }

  const renderMetricCard = (entry: (typeof metrics)[number]) => {
    const returnClassName =
      entry.values.returnPercent >= 0 ? styles.positiveStat : styles.negativeStat

    return (
      <article className={styles.metricCard} key={entry.instrument.symbol}>
        <header className={styles.metricHeader}>
          <span className={styles.metricSymbol}>{entry.instrument.symbol}</span>
          <h3 className={styles.metricName}>{entry.instrument.name}</h3>
        </header>
        <dl className={styles.statGrid}>
          <div>
            <dt className={styles.statLabel}>Return</dt>
            <dd className={clsx(styles.statValue, returnClassName)}>{entry.values.returnPercent}%</dd>
          </div>
          <div>
            <dt className={styles.statLabel}>Volatility</dt>
            <dd className={styles.statValue}>{entry.values.volatility}%</dd>
          </div>
          <div>
            <dt className={styles.statLabel}>Market cap</dt>
            <dd className={styles.statValue}>${entry.values.marketCap}B</dd>
          </div>
          <div>
            <dt className={styles.statLabel}>P/E</dt>
            <dd className={styles.statValue}>{entry.values.peRatio}</dd>
          </div>
          <div>
            <dt className={styles.statLabel}>Dividend</dt>
            <dd className={styles.statValue}>{entry.values.dividendYield}%</dd>
          </div>
          <div>
            <dt className={styles.statLabel}>Volume</dt>
            <dd className={styles.statValue}>{entry.values.volume.toLocaleString()}</dd>
          </div>
        </dl>
      </article>
    )
  }

  const renderChartLine = (instrument: Instrument, index: number) => {
    return (
      <Line
        key={instrument.symbol}
        type="monotone"
        dataKey={instrument.symbol}
        dot={false}
        stroke={chartColors[index % chartColors.length]}
        strokeWidth={2.5}
      />
    )
  }

  const renderMobileCard = (instrument: Instrument) => {
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
          <div>
            <dt className={styles.detailLabel}>Return</dt>
            <dd className={clsx(styles.detailValue, returnClassName)}>
              {metric ? `${metric.returnPercent}%` : 'Unavailable'}
            </dd>
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
            <div className={styles.compareContent}>
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

              <section className={styles.chartSection} aria-labelledby="compare-chart-heading">
                <div className={styles.chartHeader}>
                  <div>
                    <h3 className={styles.chartTitle} id="compare-chart-heading">
                      Relative performance
                    </h3>
                    <p className={styles.chartSummary}>
                      Series are normalized to 100 so movement is easy to compare across instruments.
                    </p>
                  </div>
                  <div className={styles.rangeControls}>{rangeOptions.map(renderRangeButton)}</div>
                </div>

                <div className={styles.chartViewport}>
                  <div className={styles.chartCanvas}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{ top: 8, right: 8, left: -24, bottom: 8 }}>
                        <XAxis dataKey="label" tickLine={false} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} domain={['dataMin - 4', 'dataMax + 4']} />
                        <Tooltip />
                        {selectedInstruments.map(renderChartLine)}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </section>

              <section className={styles.metricsGrid} aria-label="Compare metrics">
                {metrics.map(renderMetricCard)}
              </section>

              <div className={styles.mobileList}>{selectedInstruments.map(renderMobileCard)}</div>
              <div className={styles.desktopTable}>
                <DataTable columns={columns} getRowKey={getRowKey} rows={selectedInstruments} />
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

export default ComparePage
