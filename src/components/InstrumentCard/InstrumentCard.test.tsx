/**
 * @vitest-environment jsdom
 */
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { clearCompare } from '../../features/compare/compareSlice'
import { store } from '../../store'
import type { Instrument } from '../../types/instrument'
import InstrumentCard from './InstrumentCard'

vi.mock('./InstrumentCard.css', () => ({
  actions: 'actions',
  button: 'button',
  card: 'card',
  header: 'header',
  meta: 'meta',
  name: 'name',
  selectedButton: 'selectedButton',
  symbol: 'symbol',
  symbolRow: 'symbolRow',
  type: 'type',
}))

const instrument: Instrument = {
  type: 'stock',
  symbol: 'AAPL',
  name: 'Apple Inc.',
  currency: 'USD',
  exchange: 'NASDAQ',
  sector: 'Technology',
}

const showInstrumentCard = () => {
  return render(
    <Provider store={store}>
      <InstrumentCard instrument={instrument} />
    </Provider>,
  )
}

describe('when showing an instrument card', () => {
  afterEach(() => {
    store.dispatch(clearCompare())
  })

  it('should expose the key instrument details', () => {
    showInstrumentCard()

    expect(screen.getByRole('article', { name: 'Apple Inc.' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Apple Inc.' })).toBeInTheDocument()
    expect(screen.getByText('AAPL')).toBeInTheDocument()
    expect(screen.getByText('STOCK')).toBeInTheDocument()
    expect(screen.getByText('NASDAQ')).toBeInTheDocument()
    expect(screen.getByText('USD')).toBeInTheDocument()
  })

  it('should allow the instrument to be selected for comparison', async () => {
    const user = userEvent.setup()

    showInstrumentCard()

    await user.click(screen.getByRole('button', { name: 'Add to compare AAPL' }))

    expect(screen.getByRole('button', { name: 'Remove from compare AAPL' })).toBeEnabled()
  })

  it('should keep the watchlist action unavailable for now', () => {
    showInstrumentCard()

    expect(screen.getByRole('button', { name: 'Add to watchlist' })).toBeDisabled()
  })
})
