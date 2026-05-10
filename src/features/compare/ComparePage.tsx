import { useMemo, useState } from 'react'
import type { ChangeEvent, MouseEvent } from 'react'
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
  getCurrencyLabel,
  getExchangeLabel,
  getInstrumentTypeLabel,
} from '../../utils/instrumentPresentation'
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
  return getInstrumentTypeLabel(instrument.type)
}

const renderCurrencyCell = (instrument: Instrument) => {
  return getCurrencyLabel(instrument.currency)
}

const renderExchangeCell = (instrument: Instrument) => {
  return getExchangeLabel(instrument.exchange)
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('sv-SE', {
    currency: 'SEK',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(value)
}

const ComparePage: React.FC = () => {
  const { clearCompare, removeFromCompare, selectedInstruments } = useCompareSelection()
  const [range, setRange] = useState<CompareRange>('1M')
  const [investmentAmount, setInvestmentAmount] = useState('10000')
  const selectedCount = selectedInstruments.length
  const countLabel = selectedCount === 1 ? 'instrument' : 'instrument'
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
  const normalizedAmount = Number.parseInt(investmentAmount, 10)
  const startingAmount = Number.isFinite(normalizedAmount) && normalizedAmount > 0 ? normalizedAmount : 10000
  const scenarios = useMemo(() => {
    return metrics.map((entry) => {
      const endingValue = startingAmount * (1 + entry.values.returnPercent / 100)
      const gainLoss = endingValue - startingAmount

      return {
        ...entry,
        endingValue,
        gainLoss,
      }
    })
  }, [metrics, startingAmount])

  const handleClearCompare = () => {
    clearCompare()
  }

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.currentTarget.value.replace(/[^\d]/g, '')

    setInvestmentAmount(nextValue)
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
        Ta bort
      </button>
    )
  }

  const columns = useMemo<Column<Instrument>[]>(() => {
    return [
      { id: 'name', header: 'Namn', renderCell: renderNameCell },
      { id: 'symbol', header: 'Kortnamn', renderCell: renderSymbolCell },
      { id: 'type', header: 'Typ', renderCell: renderTypeCell },
      { id: 'currency', header: 'Valuta', renderCell: renderCurrencyCell },
      { id: 'exchange', header: 'Marknad', renderCell: renderExchangeCell },
      { id: 'actions', header: 'Åtgärder', renderCell: renderActionCell },
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
            <dt className={styles.statLabel}>Avkastning</dt>
            <dd className={clsx(styles.statValue, returnClassName)}>{entry.values.returnPercent}%</dd>
          </div>
          <div>
            <dt className={styles.statLabel}>Volatilitet</dt>
            <dd className={styles.statValue}>{entry.values.volatility}%</dd>
          </div>
          <div>
            <dt className={styles.statLabel}>Börsvärde</dt>
            <dd className={styles.statValue}>{entry.values.marketCap} mdr</dd>
          </div>
          <div>
            <dt className={styles.statLabel}>P/E</dt>
            <dd className={styles.statValue}>{entry.values.peRatio}</dd>
          </div>
          <div>
            <dt className={styles.statLabel}>Utdelning</dt>
            <dd className={styles.statValue}>{entry.values.dividendYield}%</dd>
          </div>
          <div>
            <dt className={styles.statLabel}>Volym</dt>
            <dd className={styles.statValue}>{entry.values.volume.toLocaleString()}</dd>
          </div>
        </dl>
      </article>
    )
  }

  const renderScenarioCard = (entry: (typeof scenarios)[number]) => {
    const gainLossClassName = entry.gainLoss >= 0 ? styles.positiveStat : styles.negativeStat
    const gainLossPrefix = entry.gainLoss >= 0 ? '+' : ''

    return (
      <article className={styles.scenarioCard} key={`scenario-${entry.instrument.symbol}`}>
        <header className={styles.metricHeader}>
          <span className={styles.metricSymbol}>{entry.instrument.symbol}</span>
          <h3 className={styles.metricName}>{entry.instrument.name}</h3>
        </header>
        <dl className={styles.scenarioGrid}>
          <div>
            <dt className={styles.statLabel}>Startbelopp</dt>
            <dd className={styles.statValue}>{formatCurrency(startingAmount)}</dd>
          </div>
          <div>
            <dt className={styles.statLabel}>Slutvärde</dt>
            <dd className={styles.statValue}>{formatCurrency(entry.endingValue)}</dd>
          </div>
          <div>
            <dt className={styles.statLabel}>Vinst / förlust</dt>
            <dd className={clsx(styles.statValue, gainLossClassName)}>
              {gainLossPrefix}
              {formatCurrency(Math.abs(entry.gainLoss))}
            </dd>
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

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Jämförelse</p>
          <h1 className={styles.title}>Jämför valda instrument.</h1>
          <p className={styles.summary}>
            Granska valda instrument sida vid sida och få en snabb bild av utveckling och nyckeltal.
          </p>
        </header>

        {selectedCount === 0 && (
          <EmptyState message="Inga instrument har lagts till för jämförelse ännu." />
        )}

        {selectedCount > 0 && (
          <section aria-labelledby="compare-results-heading">
            <div className={styles.compareContent}>
              <div className={styles.toolbar}>
                <h2 id="compare-results-heading" className={styles.instrumentName}>
                  Valda instrument
                </h2>
                <span className={styles.count}>
                  {selectedCount} {countLabel}
                </span>
                <button className={styles.button} type="button" onClick={handleClearCompare}>
                  Rensa alla
                </button>
              </div>

              <section className={styles.chartSection} aria-labelledby="compare-chart-heading">
                <div className={styles.chartHeader}>
                  <div>
                    <h3 className={styles.chartTitle} id="compare-chart-heading">
                      Relativ utveckling
                    </h3>
                    <p className={styles.chartSummary}>
                      Kurvorna är normaliserade till 100 så att utvecklingen blir enkel att jämföra mellan instrument.
                    </p>
                  </div>
                  <div className={styles.rangeControls}>{rangeOptions.map(renderRangeButton)}</div>
                </div>

                <div className={styles.chartViewport}>
                  <div className={styles.chartCanvas}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
                        <XAxis dataKey="label" tickLine={false} axisLine={false} />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          width={48}
                          tickFormatter={(value) => String(Math.round(Number(value)))}
                          domain={['dataMin - 4', 'dataMax + 4']}
                        />
                        <Tooltip />
                        {selectedInstruments.map(renderChartLine)}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </section>

              <section className={styles.metricsGrid} aria-label="Jämförelsemått">
                {metrics.map(renderMetricCard)}
              </section>

              <section className={styles.scenarioSection} aria-labelledby="compare-scenario-heading">
                <div className={styles.chartHeader}>
                  <div>
                    <h3 className={styles.chartTitle} id="compare-scenario-heading">
                      Om du investerade vid periodens början
                    </h3>
                    <p className={styles.chartSummary}>
                      Här visas vad startbeloppet hade varit värt i dag om du hade investerat det i början av den valda perioden, omräknat i svenska kronor.
                    </p>
                  </div>
                  <label className={styles.amountField}>
                    <span className={styles.amountLabel}>Startbelopp i kronor</span>
                    <input
                      className={styles.amountInput}
                      type="text"
                      inputMode="numeric"
                      aria-label="Startbelopp i kronor"
                      value={investmentAmount}
                      onChange={handleAmountChange}
                    />
                  </label>
                </div>
                <div className={styles.scenarioCards}>{scenarios.map(renderScenarioCard)}</div>
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
