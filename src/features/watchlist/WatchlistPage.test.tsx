/**
 * @vitest-environment jsdom
 */
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { addToCompare, clearCompare } from '../compare/compareSlice'
import { addToWatchlist, clearWatchlist, WATCHLIST_STORAGE_KEY } from './watchlistSlice'
import { mockInstruments } from '../../mocks/instruments'
import { store } from '../../store'
import WatchlistPage from './WatchlistPage'

vi.mock('../../components/EmptyState/EmptyState.css', () => ({
  action: 'action',
  card: 'card',
  container: 'container',
  icon: 'icon',
  message: 'message',
  title: 'title',
}))
vi.mock('../../components/PageHeader/PageHeader.css', () => ({
  eyebrow: 'eyebrow',
  header: 'header',
  summary: 'summary',
  title: 'title',
}))
vi.mock('../../components/WatchlistCard/WatchlistCard.css', () => ({
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
vi.mock('./WatchlistPage.css', () => ({
  grid: 'grid',
  page: 'page',
  shell: 'shell',
}))

const showWatchlistPage = () => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <WatchlistPage />
      </MemoryRouter>
    </Provider>,
  )
}

describe('when the watchlist is empty', () => {
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

  it('should show the empty watchlist state', () => {
    showWatchlistPage()

    expect(screen.getByText('Din bevakningslista är tom.')).toBeInTheDocument()
    expect(screen.queryByLabelText('Sparade instrument')).not.toBeInTheDocument()
  })
})

describe('when the watchlist has saved instruments', () => {
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

  it('should show saved instrument details', () => {
    act(() => {
      store.dispatch(addToWatchlist(mockInstruments[0]))
    })

    showWatchlistPage()

    expect(screen.getByLabelText('Sparade instrument')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Apple Inc.' })).toBeInTheDocument()
    expect(screen.getByText('Senaste kurs')).toBeInTheDocument()
    expect(screen.getByText('Dagens förändring')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Visa detaljer' })).toHaveAttribute(
      'href',
      '/instrument/AAPL',
    )
  })

  it('should explain when a saved instrument is already selected for comparison', () => {
    act(() => {
      store.dispatch(addToWatchlist(mockInstruments[0]))
      store.dispatch(addToCompare(mockInstruments[0]))
    })

    showWatchlistPage()

    expect(screen.getByRole('button', { name: 'Redan i jämförelse AAPL' })).toBeDisabled()
  })
})
