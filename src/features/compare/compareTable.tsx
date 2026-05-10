import type { MouseEvent } from 'react'

import type { Column } from '../../components/DataTable'
import type { Instrument } from '../../types/instrument'
import {
  getCurrencyLabel,
  getExchangeLabel,
  getInstrumentTypeLabel,
} from '../../utils/instrumentPresentation'

import * as styles from './ComparePage.css'

export type RemoveFromCompareHandler = (event: MouseEvent<HTMLButtonElement>) => void

export const getCompareRowKey = (instrument: Instrument) => {
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

export const createCompareColumns = (
  handleRemoveFromCompare: RemoveFromCompareHandler,
): Column<Instrument>[] => {
  const renderActionCell = (instrument: Instrument) => {
    return (
      <button
        className={styles.removeButton}
        type="button"
        data-symbol={instrument.symbol}
        aria-label={`Ta bort ${instrument.symbol} från jämförelse`}
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
    { id: 'currency', header: 'Valuta', renderCell: renderCurrencyCell },
    { id: 'exchange', header: 'Marknad', renderCell: renderExchangeCell },
    { id: 'actions', header: 'Åtgärder', renderCell: renderActionCell },
  ]
}
