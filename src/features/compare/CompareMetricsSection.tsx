import type { FC } from 'react'
import clsx from 'clsx'

import type { Props } from './CompareMetricsSection.types'

import * as styles from './ComparePage.css'

const CompareMetricsSection: FC<Props> = (props) => {
  const { metrics } = props

  const renderMetricCard = (entry: Props['metrics'][number]) => {
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

  return <section className={styles.metricsGrid} aria-label="Jämförelsemått">{metrics.map(renderMetricCard)}</section>
}

export default CompareMetricsSection
