/**
 * @vitest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import LoadingState from './LoadingState'

vi.mock('./LoadingState.css', () => ({
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
  skeletonBar: 'skeletonBar',
  skeletonButton: 'skeletonButton',
  skeletonChip: 'skeletonChip',
  skeletonLine: 'skeletonLine',
  skeletonLineShort: 'skeletonLineShort',
  skeletonLineWide: 'skeletonLineWide',
  skeletonList: 'skeletonList',
  title: 'title',
}))

describe('when showing a message loading state', () => {
  it('should expose loading copy', () => {
    render(<LoadingState title="Hämtar data" message="Det här tar bara ett ögonblick." />)

    expect(screen.getByRole('heading', { name: 'Hämtar data' })).toBeInTheDocument()
    expect(screen.getByText('Det här tar bara ett ögonblick.')).toBeInTheDocument()
  })
})

describe('when showing search result skeletons', () => {
  it('should keep the loading copy visible', () => {
    render(<LoadingState variant="search-results" title="Söker" message="Letar efter instrument." />)

    expect(screen.getByRole('heading', { name: 'Söker' })).toBeInTheDocument()
    expect(screen.getByText('Letar efter instrument.')).toBeInTheDocument()
  })
})

describe('when showing details skeletons', () => {
  it('should keep the details loading copy visible', () => {
    render(<LoadingState variant="details" title="Hämtar instrument" message="Laddar detaljer." />)

    expect(screen.getByRole('heading', { name: 'Hämtar instrument' })).toBeInTheDocument()
    expect(screen.getByText('Laddar detaljer.')).toBeInTheDocument()
  })
})
