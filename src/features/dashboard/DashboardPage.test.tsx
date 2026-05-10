/**
 * @vitest-environment jsdom
 */
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { addToCompare, clearCompare } from '../compare/compareSlice'
import { addToWatchlist, clearWatchlist, WATCHLIST_STORAGE_KEY } from '../watchlist/watchlistSlice'
import { mockInstruments } from '../../mocks/instruments'
import { store } from '../../store'
import { OPEN_GLOBAL_SEARCH_EVENT } from '../../utils/globalSearch'
import DashboardPage from './DashboardPage'

vi.mock('./DashboardPage.css', () => ({
  cta: 'cta',
  emptyText: 'emptyText',
  eyebrow: 'eyebrow',
  grid: 'grid',
  hero: 'hero',
  heroCopy: 'heroCopy',
  item: 'item',
  itemLink: 'itemLink',
  list: 'list',
  meta: 'meta',
  page: 'page',
  panel: 'panel',
  panelAction: 'panelAction',
  panelHeader: 'panelHeader',
  panelLink: 'panelLink',
  panelTitle: 'panelTitle',
  popularGrid: 'popularGrid',
  popularSection: 'popularSection',
  shell: 'shell',
  summary: 'summary',
  title: 'title',
}))

const showDashboardPage = () => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    </Provider>,
  )
}

describe('when the dashboard has no saved instruments', () => {
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

  it('should show empty preview messages', () => {
    showDashboardPage()

    expect(screen.getByText('Inga instrument har lagts till för jämförelse ännu.')).toBeInTheDocument()
    expect(screen.getByText('Din bevakningslista är redo för instrument du vill följa.')).toBeInTheDocument()
  })
})

describe('when the dashboard has preview instruments', () => {
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

  it('should show compare and watchlist previews', () => {
    act(() => {
      store.dispatch(addToCompare(mockInstruments[0]))
      store.dispatch(addToWatchlist(mockInstruments[1]))
    })

    showDashboardPage()

    expect(screen.getAllByRole('link', { name: 'Apple Inc.' })[0]).toHaveAttribute('href', '/instrument/AAPL')
    expect(screen.getAllByRole('link', { name: 'Microsoft Corporation' })[0]).toHaveAttribute(
      'href',
      '/instrument/MSFT',
    )
  })

  it('should open global search from the dashboard action', async () => {
    const user = userEvent.setup()
    const handleOpenGlobalSearch = vi.fn()

    window.addEventListener(OPEN_GLOBAL_SEARCH_EVENT, handleOpenGlobalSearch)

    showDashboardPage()

    await user.click(screen.getByRole('button', { name: 'Sök instrument' }))

    expect(handleOpenGlobalSearch).toHaveBeenCalledTimes(1)

    window.removeEventListener(OPEN_GLOBAL_SEARCH_EVENT, handleOpenGlobalSearch)
  })
})
