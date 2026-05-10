import type { FC } from 'react'

import CompareChartSection from './CompareChartSection'
import CompareMetricsSection from './CompareMetricsSection'
import CompareMobileList from './CompareMobileList'
import CompareScenarioSection from './CompareScenarioSection'
import CompareToolbar from './CompareToolbar'
import { DataTable } from '../../components/DataTable'
import { EmptyState } from '../../components/EmptyState'
import { PageHeader } from '../../components/PageHeader'
import { useComparePage } from './useComparePage'
import { getCompareRowKey } from './compareTable'

import * as styles from './ComparePage.css'

const ComparePage: FC = () => {
  const {
    chartData,
    columns,
    handleAmountChange,
    handleClearCompare,
    handleRangeChange,
    handleRemoveFromCompare,
    investmentAmount,
    metrics,
    range,
    scenarios,
    selectedCount,
    selectedInstruments,
    startingAmount,
  } = useComparePage()

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <PageHeader
          eyebrow="Jämförelse"
          title="Jämför valda instrument."
          summary="Granska valda instrument sida vid sida och få en snabb bild av utveckling och nyckeltal."
        />

        {selectedCount === 0 && (
          <EmptyState message="Inga instrument har lagts till för jämförelse ännu." />
        )}

        {selectedCount > 0 && (
          <section aria-labelledby="compare-results-heading">
            <div className={styles.compareContent}>
              <CompareToolbar onClearCompare={handleClearCompare} selectedCount={selectedCount} />
              <CompareChartSection
                chartData={chartData}
                onRangeChange={handleRangeChange}
                range={range}
                selectedInstruments={selectedInstruments}
              />
              <CompareMetricsSection metrics={metrics} />
              <CompareScenarioSection
                investmentAmount={investmentAmount}
                onAmountChange={handleAmountChange}
                scenarios={scenarios}
                startingAmount={startingAmount}
              />
              <CompareMobileList
                metrics={metrics}
                onRemoveFromCompare={handleRemoveFromCompare}
                selectedInstruments={selectedInstruments}
              />
              <div className={styles.desktopTable}>
                <DataTable columns={columns} getRowKey={getCompareRowKey} rows={selectedInstruments} />
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

export default ComparePage
