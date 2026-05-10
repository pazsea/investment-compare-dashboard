import type { FC } from 'react'
import clsx from 'clsx'

import { formatCompactCurrencyValue, formatCurrencyValue, formatPercentChange } from './compareFormatters'
import type { Props } from './CompareMetricsSection.types'
import { getExchangeLabel } from '../../utils/instrumentPresentation'

import * as styles from './ComparePage.css'

const CompareMetricsSection: FC<Props> = (props) => {
  const { metrics } = props

  const renderMetricCard = (entry: Props['metrics'][number]) => {
    const returnClassName =
      (entry.monthlyChangePercentage ?? 0) >= 0 ? styles.positiveStat : styles.negativeStat

    return (
      <article className={styles.metricCard} key={entry.instrument.symbol}>
        <header className={styles.metricHeader}>
          <span className={styles.metricSymbol}>{entry.instrument.symbol}</span>
          <h3 className={styles.metricName}>{entry.instrument.name}</h3>
        </header>
        <dl className={styles.statGrid}>
          <div>
            <dt className={styles.statLabel}>1 mån börsvärde</dt>
            <dd className={clsx(styles.statValue, returnClassName)}>
              {formatPercentChange(entry.monthlyChangePercentage)}
            </dd>
          </div>
          <div>
            <dt className={styles.statLabel}>Pris</dt>
            <dd className={styles.statValue}>
              {entry.profile?.price !== undefined
                ? formatCurrencyValue(entry.profile.price, entry.profile.currency)
                : 'Saknas'}
            </dd>
          </div>
          <div>
            <dt className={styles.statLabel}>Börsvärde</dt>
            <dd className={styles.statValue}>
              {entry.profile?.marketCap !== undefined
                ? formatCompactCurrencyValue(entry.profile.marketCap, entry.profile.currency)
                : 'Saknas'}
            </dd>
          </div>
          <div>
            <dt className={styles.statLabel}>Dagens förändring</dt>
            <dd className={styles.statValue}>
              {formatPercentChange(entry.profile?.changesPercentage)}
            </dd>
          </div>
          <div>
            <dt className={styles.statLabel}>Volym</dt>
            <dd className={styles.statValue}>
              {entry.profile?.volume !== undefined ? entry.profile.volume.toLocaleString('sv-SE') : 'Saknas'}
            </dd>
          </div>
          <div>
            <dt className={styles.statLabel}>Marknad</dt>
            <dd className={styles.statValue}>{getExchangeLabel(entry.profile?.exchange ?? entry.instrument.exchange)}</dd>
          </div>
        </dl>
      </article>
    )
  }

  return <section className={styles.metricsGrid} aria-label="Jämförelsemått">{metrics.map(renderMetricCard)}</section>
}

export default CompareMetricsSection
