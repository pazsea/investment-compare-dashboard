/**
 * @vitest-environment jsdom
 */
import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { addToCompare, clearCompare } from './compareSlice'
import { clearWatchlist } from '../watchlist/watchlistSlice'
import { mockInstruments } from '../../mocks/instruments'
import { store } from '../../store'
import ComparePage from './ComparePage'

vi.mock('../../api/instrumentsApi', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../api/instrumentsApi')>()

  return {
    ...actual,
    useGetInstrumentMarketCapHistoryQuery: () => ({
      data: {
        AAPL: [
          { symbol: 'AAPL', date: '2026-04-08', marketCap: 100 },
          { symbol: 'AAPL', date: '2026-05-08', marketCap: 110 },
        ],
        MSFT: [
          { symbol: 'MSFT', date: '2026-04-08', marketCap: 100 },
          { symbol: 'MSFT', date: '2026-05-08', marketCap: 95 },
        ],
      },
      isError: false,
      isFetching: false,
    }),
    useGetInstrumentProfilesQuery: () => ({
      data: {
        AAPL: {
          symbol: 'AAPL',
          name: 'Apple Inc.',
          currency: 'USD',
          exchange: 'NASDAQ',
          marketCap: 3900351299800,
          price: 262.82,
          volume: 36725325,
          changesPercentage: 1.24,
        },
        MSFT: {
          symbol: 'MSFT',
          name: 'Microsoft Corporation',
          currency: 'USD',
          exchange: 'NASDAQ',
          marketCap: 3120000000000,
          price: 483.16,
          volume: 18442000,
          changesPercentage: 0.71,
        },
      },
      isFetching: false,
    }),
  }
})
vi.mock('../../api/config', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../api/config')>()

  return {
    ...actual,
    shouldUseFmpApi: true,
  }
})

vi.mock('../../components/DataTable/DataTable.css', () => ({
  cell: 'cell',
  headerCell: 'headerCell',
  row: 'row',
  table: 'table',
  wrapper: 'wrapper',
}))
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
vi.mock('../../components/ErrorState/ErrorState.css', () => ({
  container: 'container',
  message: 'message',
  title: 'title',
}))
vi.mock('../../components/LoadingState/LoadingState.css', () => ({
  actionSkeleton: 'actionSkeleton',
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
vi.mock('./ComparePage.css', () => ({
  button: 'button',
  card: 'card',
  cardHeader: 'cardHeader',
  chartCanvas: 'chartCanvas',
  chartHeader: 'chartHeader',
  chartPill: 'chartPill',
  chartSection: 'chartSection',
  chartSummary: 'chartSummary',
  chartTitle: 'chartTitle',
  chartViewport: 'chartViewport',
  compareContent: 'compareContent',
  count: 'count',
  desktopTable: 'desktopTable',
  detailGrid: 'detailGrid',
  detailLabel: 'detailLabel',
  detailValue: 'detailValue',
  instrumentName: 'instrumentName',
  metricCard: 'metricCard',
  metricHeader: 'metricHeader',
  metricName: 'metricName',
  metricSymbol: 'metricSymbol',
  metricsGrid: 'metricsGrid',
  mobileList: 'mobileList',
  negativeStat: 'negativeStat',
  page: 'page',
  positiveStat: 'positiveStat',
  removeButton: 'removeButton',
  shell: 'shell',
  statGrid: 'statGrid',
  statLabel: 'statLabel',
  statValue: 'statValue',
  symbol: 'symbol',
  toolbar: 'toolbar',
}))
vi.mock('recharts', () => ({
  Line: () => null,
  LineChart: (props: { children: ReactNode }) => {
    return <div aria-label="Relativ utveckling diagram">{props.children}</div>
  },
  ResponsiveContainer: (props: { children: ReactNode }) => {
    return <div>{props.children}</div>
  },
  Tooltip: () => null,
  XAxis: () => null,
  YAxis: () => null,
}))

const showComparePage = () => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <ComparePage />
      </MemoryRouter>
    </Provider>,
  )
}

describe('when no instruments are selected for comparison', () => {
  beforeEach(() => {
    store.dispatch(clearCompare())
    store.dispatch(clearWatchlist())
  })

  afterEach(() => {
    store.dispatch(clearCompare())
    store.dispatch(clearWatchlist())
  })

  it('should show the empty comparison state', () => {
    showComparePage()

    expect(screen.getByText('Inga instrument har lagts till för jämförelse ännu.')).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Valda instrument' })).not.toBeInTheDocument()
  })
})

describe('when instruments are selected for comparison', () => {
  beforeEach(() => {
    store.dispatch(clearCompare())
    store.dispatch(clearWatchlist())
  })

  afterEach(() => {
    store.dispatch(clearCompare())
    store.dispatch(clearWatchlist())
  })

  it('should show comparison tools and hide the empty state', async () => {
    const user = userEvent.setup()

    store.dispatch(addToCompare(mockInstruments[0]))
    store.dispatch(addToCompare(mockInstruments[1]))

    showComparePage()

    expect(screen.getByRole('heading', { name: 'Valda instrument' })).toBeInTheDocument()
    expect(screen.getByText('2 instrument')).toBeInTheDocument()
    expect(await screen.findByRole('heading', { name: 'Börsvärde senaste månaden' })).toBeInTheDocument()
    expect(screen.queryByText('Inga instrument har lagts till för jämförelse ännu.')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Rensa alla' }))

    expect(screen.getByText('Inga instrument har lagts till för jämförelse ännu.')).toBeInTheDocument()
  })
})

describe('when the user selects symbols outside the compare allowlist', () => {
  beforeEach(() => {
    store.dispatch(clearCompare())
    store.dispatch(clearWatchlist())
  })

  afterEach(() => {
    store.dispatch(clearCompare())
    store.dispatch(clearWatchlist())
  })

  it('should explain that the free API only supports certain compare symbols', () => {
    store.dispatch(addToCompare(mockInstruments[4]))

    showComparePage()

    expect(screen.getByText('Begränsning i gratisversionen')).toBeInTheDocument()
    expect(
      screen.getByText(/Följande valda instrument stöds inte för jämförelse just nu: VTSAX./),
    ).toBeInTheDocument()
  })
})
