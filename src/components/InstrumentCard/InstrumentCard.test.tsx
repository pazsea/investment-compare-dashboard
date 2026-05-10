/**
 * @vitest-environment jsdom
 */
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { clearCompare } from '../../features/compare/compareSlice'
import { clearWatchlist, WATCHLIST_STORAGE_KEY } from '../../features/watchlist/watchlistSlice'
import { store } from '../../store'
import type { Instrument } from '../../types/instrument'
import InstrumentCard from './InstrumentCard'

vi.mock('./InstrumentCard.css', () => ({
  actions: 'actions',
  action: 'action',
  button: 'button',
  card: 'card',
  header: 'header',
  meta: 'meta',
  name: 'name',
  selectedButton: 'selectedButton',
  symbol: 'symbol',
  symbolRow: 'symbolRow',
  stretchedLink: 'stretchedLink',
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
      <MemoryRouter>
        <InstrumentCard instrument={instrument} />
      </MemoryRouter>
    </Provider>,
  )
}

describe('when showing an instrument card', () => {
  afterEach(() => {
    store.dispatch(clearCompare())
    store.dispatch(clearWatchlist())
    window.localStorage.removeItem(WATCHLIST_STORAGE_KEY)
  })

  it('should expose the key instrument details', () => {
    showInstrumentCard()

    expect(screen.getByRole('article', { name: 'Apple Inc.' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Apple Inc.' })).toBeInTheDocument()
    expect(screen.getByText('AAPL')).toBeInTheDocument()
    expect(screen.getByText('STOCK')).toBeInTheDocument()
    expect(screen.getByText('NASDAQ')).toBeInTheDocument()
    expect(screen.getByText('USD')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'View details' })).toHaveAttribute(
      'href',
      '/instrument/AAPL',
    )
  })

  it('should allow the instrument to be selected for comparison', async () => {
    const user = userEvent.setup()

    showInstrumentCard()

    await user.click(screen.getByRole('button', { name: 'Add to compare AAPL' }))

    expect(screen.getByRole('button', { name: 'Remove from compare AAPL' })).toBeEnabled()
  })

  it('should allow the instrument to be saved to the watchlist', async () => {
    const user = userEvent.setup()

    showInstrumentCard()

    await user.click(screen.getByRole('button', { name: 'Add to watchlist AAPL' }))

    expect(screen.getByRole('button', { name: 'Remove from watchlist AAPL' })).toBeEnabled()
  })
})
