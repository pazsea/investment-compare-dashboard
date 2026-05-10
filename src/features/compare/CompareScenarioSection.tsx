import type { FC } from 'react'
import clsx from 'clsx'

import { formatSekCurrency } from './compareFormatters'
import type { Props } from './CompareScenarioSection.types'

import * as styles from './ComparePage.css'

const CompareScenarioSection: FC<Props> = (props) => {
  const { investmentAmount, onAmountChange, scenarios, startingAmount } = props

  const renderScenarioCard = (entry: Props['scenarios'][number]) => {
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
            <dd className={styles.statValue}>{formatSekCurrency(startingAmount)}</dd>
          </div>
          <div>
            <dt className={styles.statLabel}>Slutvärde</dt>
            <dd className={styles.statValue}>{formatSekCurrency(entry.endingValue)}</dd>
          </div>
          <div>
            <dt className={styles.statLabel}>Vinst / förlust</dt>
            <dd className={clsx(styles.statValue, gainLossClassName)}>
              {gainLossPrefix}
              {formatSekCurrency(Math.abs(entry.gainLoss))}
            </dd>
          </div>
        </dl>
      </article>
    )
  }

  return (
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
            onChange={onAmountChange}
          />
        </label>
      </div>
      <div className={styles.scenarioCards}>{scenarios.map(renderScenarioCard)}</div>
    </section>
  )
}

export default CompareScenarioSection
