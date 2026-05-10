/**
 * @vitest-environment jsdom
 */
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
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

vi.mock('../../api/config', () => ({
  FMP_API_KEY: '',
  FMP_BASE_URL: 'https://financialmodelingprep.com',
  USE_FMP_API: false,
  hasFmpApiKey: false,
  shouldUseFmpApi: false,
}))

vi.mock('../../components/InstrumentCard/InstrumentCard.css', () => ({
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

vi.mock('../../components/EmptyState/EmptyState.css', () => ({
  container: 'container',
  message: 'message',
  title: 'title',
}))

vi.mock('../../components/ErrorState/ErrorState.css', () => ({
  container: 'container',
  message: 'message',
  title: 'title',
}))

vi.mock('../../components/LoadingState/LoadingState.css', () => ({
  actionSkeleton: 'actionSkeleton',
  actionRow: 'actionRow',
  cardActions: 'cardActions',
  cardBody: 'cardBody',
  cardGrid: 'cardGrid',
  cardHeader: 'cardHeader',
  cardSkeleton: 'cardSkeleton',
  container: 'container',
  detailsActions: 'detailsActions',
  detailsHeader: 'detailsHeader',
  detailsMeta: 'detailsMeta',
  detailsMetaPill: 'detailsMetaPill',
  detailsMetrics: 'detailsMetrics',
  detailsSkeleton: 'detailsSkeleton',
  detailsSymbol: 'detailsSymbol',
  detailsTitle: 'detailsTitle',
  message: 'message',
  metaRow: 'metaRow',
  metricLabelSkeleton: 'metricLabelSkeleton',
  metricSkeleton: 'metricSkeleton',
  metricValueSkeleton: 'metricValueSkeleton',
  skeletonAccent: 'skeletonAccent',
  skeletonButton: 'skeletonButton',
  skeletonChip: 'skeletonChip',
  skeletonLine: 'skeletonLine',
  skeletonLineShort: 'skeletonLineShort',
  skeletonLineWide: 'skeletonLineWide',
  title: 'title',
}))

const showSearchPage = () => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
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
