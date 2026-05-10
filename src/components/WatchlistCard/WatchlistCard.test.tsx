/**
 * @vitest-environment jsdom
 */
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { addToCompare, clearCompare } from '../../features/compare/compareSlice'
import { addToWatchlist, clearWatchlist, WATCHLIST_STORAGE_KEY } from '../../features/watchlist/watchlistSlice'
import { mockInstruments } from '../../mocks/instruments'
import { store } from '../../store'
import WatchlistCard from './WatchlistCard'

vi.mock('./WatchlistCard.css', () => ({
  actionLink: 'actionLink',
  actions: 'actions',
  button: 'button',
  card: 'card',
  cardHeader: 'cardHeader',
  detailGrid: 'detailGrid',
  detailLabel: 'detailLabel',
  detailValue: 'detailValue',
  instrumentName: 'instrumentName',
  meta: 'meta',
  negative: 'negative',
  positive: 'positive',
  quoteChange: 'quoteChange',
  quoteLabel: 'quoteLabel',
  quotePanel: 'quotePanel',
  quoteValue: 'quoteValue',
  removeButton: 'removeButton',
  stretchedLink: 'stretchedLink',
  symbol: 'symbol',
}))

const instrument = mockInstruments[0]

const showWatchlistCard = () => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <WatchlistCard instrument={instrument} />
      </MemoryRouter>
    </Provider>,
  )
}

describe('when showing a watchlist card', () => {
  beforeEach(() => {
    store.dispatch(clearCompare())
    store.dispatch(clearWatchlist())
    window.localStorage.removeItem(WATCHLIST_STORAGE_KEY)
  })

  afterEach(() => {
    store.dispatch(clearCompare())
    store.dispatch(clearWatchlist())
    window.localStorage.removeItem(WATCHLIST_STORAGE_KEY)
  })

  it('should expose instrument details and quote sections', () => {
    showWatchlistCard()

    expect(screen.getByRole('heading', { name: 'Apple Inc.' })).toBeInTheDocument()
    expect(screen.getByText('AAPL')).toBeInTheDocument()
    expect(screen.getByText('Senaste kurs')).toBeInTheDocument()
    expect(screen.getByText('Dagens förändring')).toBeInTheDocument()
    expect(screen.getByText('Technology')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Visa detaljer' })).toHaveAttribute(
      'href',
      '/instrument/AAPL',
    )
  })

  it('should update the compare action after adding the instrument', async () => {
    const user = userEvent.setup()

    showWatchlistCard()

    await user.click(screen.getByRole('button', { name: 'Lägg till i jämförelse AAPL' }))

    expect(screen.getByRole('button', { name: 'Redan i jämförelse AAPL' })).toBeDisabled()
  })
})

describe('when the instrument is already selected for comparison', () => {
  beforeEach(() => {
    store.dispatch(clearCompare())
    store.dispatch(clearWatchlist())
    store.dispatch(addToWatchlist(instrument))
    store.dispatch(addToCompare(instrument))
  })

  afterEach(() => {
    store.dispatch(clearCompare())
    store.dispatch(clearWatchlist())
    window.localStorage.removeItem(WATCHLIST_STORAGE_KEY)
  })

  it('should show a disabled selected state', () => {
    showWatchlistCard()

    expect(screen.getByRole('button', { name: 'Redan i jämförelse AAPL' })).toBeDisabled()
  })
})
