import type { FC } from 'react'
import clsx from 'clsx'
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { formatRoundedChartTick } from './compareFormatters'
import {
  compareChartColors,
  COMPARE_CHART_MARGIN,
  compareRangeOptions,
} from './compareConstants'
import type { Props } from './CompareChartSection.types'

import * as styles from './ComparePage.css'

const CompareChartSection: FC<Props> = (props) => {
  const { chartData, onRangeChange, range, selectedInstruments } = props

  const renderRangeButton = (option: (typeof compareRangeOptions)[number]) => {
    return (
      <button
        key={option}
        className={clsx(styles.rangeButton, option === range && styles.activeRangeButton)}
        type="button"
        data-range={option}
        aria-pressed={option === range}
        onClick={onRangeChange}
      >
        {option}
      </button>
    )
  }

  const renderChartLine = (symbol: string, index: number) => {
    return (
      <Line
        key={symbol}
        type="monotone"
        dataKey={symbol}
        dot={false}
        stroke={compareChartColors[index % compareChartColors.length]}
        strokeWidth={2.5}
      />
    )
  }

  const renderInstrumentLine = (
    instrument: Props['selectedInstruments'][number],
    index: number,
  ) => {
    return renderChartLine(instrument.symbol, index)
  }

  return (
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
        <div className={styles.rangeControls}>{compareRangeOptions.map(renderRangeButton)}</div>
      </div>

      <div className={styles.chartViewport}>
        <div className={styles.chartCanvas}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={COMPARE_CHART_MARGIN}>
              <XAxis dataKey="label" tickLine={false} axisLine={false} />
              <YAxis
                tickLine={false}
                axisLine={false}
                width={48}
                tickFormatter={formatRoundedChartTick}
                domain={['dataMin - 4', 'dataMax + 4']}
              />
              <Tooltip />
              {selectedInstruments.map(renderInstrumentLine)}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}

export default CompareChartSection
