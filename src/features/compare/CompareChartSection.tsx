import type { FC } from 'react'
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { compareChartColors, COMPARE_CHART_MARGIN } from './compareConstants'
import type { Props } from './CompareChartSection.types'
import {
  formatRoundedChartTick,
  getRoundedChartDomainMax,
  getRoundedChartDomainMin,
} from '../../utils/chartPresentation'

import * as styles from './ComparePage.css'

const CompareChartSection: FC<Props> = (props) => {
  const { chartData, selectedInstruments } = props

  const renderChartLine = (symbol: string, index: number) => {
    return (
      <Line
        key={symbol}
        type="monotone"
        dataKey={symbol}
        dot={false}
        connectNulls
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
            Börsvärde senaste månaden
          </h3>
          <p className={styles.chartSummary}>
            Kurvorna är normaliserade till första handelsdagen under den senaste månaden så att börsvärdets utveckling blir jämförbar mellan instrument.
          </p>
        </div>
        <span className={styles.chartPill}>1M</span>
      </div>

      <div className={styles.chartViewport}>
        <div className={styles.chartCanvas}>
          <ResponsiveContainer width="100%" height={280} minWidth={0} minHeight={280}>
            <LineChart data={chartData} margin={COMPARE_CHART_MARGIN}>
              <XAxis dataKey="label" tickLine={false} axisLine={false} />
              <YAxis
                tickLine={false}
                axisLine={false}
                width={48}
                tickFormatter={formatRoundedChartTick}
                domain={[getRoundedChartDomainMin, getRoundedChartDomainMax]}
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
