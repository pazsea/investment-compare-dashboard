import type { MouseEvent } from 'react'

import type { Column } from '../../components/DataTable'
import {
  formatCompactCurrencyValue,
  formatCurrencyValue,
  formatPercentChange,
} from './compareFormatters'
import type { CompareMetricEntry } from './compareTypes'
import {
  getCurrencyLabel,
  getExchangeLabel,
  getInstrumentTypeLabel,
} from '../../utils/instrumentPresentation'

import * as styles from './ComparePage.css'

export type RemoveFromCompareHandler = (event: MouseEvent<HTMLButtonElement>) => void

export const getCompareRowKey = (entry: CompareMetricEntry) => {
  return entry.instrument.symbol
}

const renderNameCell = (entry: CompareMetricEntry) => {
  return entry.instrument.name
}

const renderSymbolCell = (entry: CompareMetricEntry) => {
  return entry.instrument.symbol
}

const renderTypeCell = (entry: CompareMetricEntry) => {
  return getInstrumentTypeLabel(entry.instrument.type)
}

const renderCurrencyCell = (entry: CompareMetricEntry) => {
  return getCurrencyLabel(entry.profile?.currency ?? entry.instrument.currency)
}

const renderExchangeCell = (entry: CompareMetricEntry) => {
  return getExchangeLabel(entry.profile?.exchange ?? entry.instrument.exchange)
}

const renderPriceCell = (entry: CompareMetricEntry) => {
  return entry.profile?.price !== undefined
    ? formatCurrencyValue(entry.profile.price, entry.profile.currency)
    : 'Saknas'
}

const renderMonthlyChangeCell = (entry: CompareMetricEntry) => {
  return formatPercentChange(entry.monthlyChangePercentage)
}

const renderMarketCapCell = (entry: CompareMetricEntry) => {
  return entry.profile?.marketCap !== undefined
    ? formatCompactCurrencyValue(entry.profile.marketCap, entry.profile.currency)
    : 'Saknas'
}

export const createCompareColumns = (
  handleRemoveFromCompare: RemoveFromCompareHandler,
): Column<CompareMetricEntry>[] => {
  const renderActionCell = (entry: CompareMetricEntry) => {
    return (
      <button
        className={styles.removeButton}
        type="button"
        data-symbol={entry.instrument.symbol}
        aria-label={`Ta bort ${entry.instrument.symbol} från jämförelse`}
        onClick={handleRemoveFromCompare}
      >
        Ta bort
      </button>
    )
  }

  return [
    { id: 'name', header: 'Namn', renderCell: renderNameCell },
    { id: 'symbol', header: 'Kortnamn', renderCell: renderSymbolCell },
    { id: 'type', header: 'Typ', renderCell: renderTypeCell },
    { id: 'price', header: 'Pris', renderCell: renderPriceCell },
    { id: 'monthlyChange', header: '1 mån', renderCell: renderMonthlyChangeCell },
    { id: 'marketCap', header: 'Börsvärde', renderCell: renderMarketCapCell },
    { id: 'currency', header: 'Valuta', renderCell: renderCurrencyCell },
    { id: 'exchange', header: 'Marknad', renderCell: renderExchangeCell },
    { id: 'actions', header: 'Åtgärder', renderCell: renderActionCell },
  ]
}
