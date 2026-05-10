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
vi.mock('./ComparePage.css', () => ({
  activeRangeButton: 'activeRangeButton',
  amountField: 'amountField',
  amountInput: 'amountInput',
  amountLabel: 'amountLabel',
  button: 'button',
  card: 'card',
  cardHeader: 'cardHeader',
  chartCanvas: 'chartCanvas',
  chartHeader: 'chartHeader',
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
  rangeButton: 'rangeButton',
  rangeControls: 'rangeControls',
  removeButton: 'removeButton',
  scenarioCard: 'scenarioCard',
  scenarioCards: 'scenarioCards',
  scenarioGrid: 'scenarioGrid',
  scenarioSection: 'scenarioSection',
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
    expect(screen.getByRole('heading', { name: 'Relativ utveckling' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Om du investerade vid periodens början' })).toBeInTheDocument()
    expect(screen.queryByText('Inga instrument har lagts till för jämförelse ännu.')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Rensa alla' }))

    expect(screen.getByText('Inga instrument har lagts till för jämförelse ännu.')).toBeInTheDocument()
  })
})
