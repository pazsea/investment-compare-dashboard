import type { FC } from 'react'

import CompareApiNotice from './CompareApiNotice'
import CompareChartSection from './CompareChartSection'
import CompareMetricsSection from './CompareMetricsSection'
import CompareMobileList from './CompareMobileList'
import CompareToolbar from './CompareToolbar'
import { DataTable } from '../../components/DataTable'
import { EmptyState } from '../../components/EmptyState'
import { ErrorState } from '../../components/ErrorState'
import { LoadingState } from '../../components/LoadingState'
import { PageHeader } from '../../components/PageHeader'
import { useComparePage } from './useComparePage'
import { getCompareRowKey } from './compareTable'

import * as styles from './ComparePage.css'

const ComparePage: FC = () => {
  const {
    chartData,
    columns,
    handleClearCompare,
    handleRemoveFromCompare,
    isError,
    isLoading,
    metrics,
    selectedCount,
    selectedInstruments,
    unsupportedSymbols,
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
              {unsupportedSymbols.length > 0 && (
                <CompareApiNotice unsupportedSymbols={unsupportedSymbols} />
              )}
              {isLoading && (
                <LoadingState
                  title="Laddar jämförelsedata"
                  message="Senaste månadsserier och nyckeltal hämtas för valda instrument."
                />
              )}
              {!isLoading && isError && (
                <ErrorState message="Jämförelsedata kunde inte hämtas just nu." />
              )}
              {!isLoading && !isError && (
                <>
                  <CompareChartSection chartData={chartData} selectedInstruments={selectedInstruments} />
                  <CompareMetricsSection metrics={metrics} />
                  <CompareMobileList
                    metrics={metrics}
                    onRemoveFromCompare={handleRemoveFromCompare}
                    selectedInstruments={selectedInstruments}
                  />
                  <div className={styles.desktopTable}>
                    <DataTable columns={columns} getRowKey={getCompareRowKey} rows={metrics} />
                  </div>
                </>
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

export default ComparePage
