/**
 * @vitest-environment jsdom
 */
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { store } from '../../store'
import SearchPage from './SearchPage'

vi.mock('./SearchPage.css', () => ({
  errorStatus: 'errorStatus',
  eyebrow: 'eyebrow',
  grid: 'grid',
  header: 'header',
  helper: 'helper',
  input: 'input',
  label: 'label',
  page: 'page',
  resultCount: 'resultCount',
  resultsHeader: 'resultsHeader',
  resultsTitle: 'resultsTitle',
  searchPanel: 'searchPanel',
  shell: 'shell',
  status: 'status',
  summary: 'summary',
  title: 'title',
}))

vi.mock('../../components/InstrumentCard/InstrumentCard.css', () => ({
  actions: 'actions',
  button: 'button',
  card: 'card',
  header: 'header',
  meta: 'meta',
  name: 'name',
  symbol: 'symbol',
  symbolRow: 'symbolRow',
  type: 'type',
}))

const showSearchPage = () => {
  return render(
    <Provider store={store}>
      <SearchPage />
    </Provider>,
  )
}

describe('when user searches for an instrument', () => {
  it('should show matching instruments from fallback data', async () => {
    const user = userEvent.setup()

    showSearchPage()

    await user.type(screen.getByRole('searchbox', { name: 'Search instruments' }), 'aapl')

    expect(await screen.findByRole('heading', { name: 'Apple Inc.' })).toBeInTheDocument()
    expect(screen.getByText('AAPL')).toBeInTheDocument()
    expect(screen.getByText('1 result')).toBeInTheDocument()
  })
})
