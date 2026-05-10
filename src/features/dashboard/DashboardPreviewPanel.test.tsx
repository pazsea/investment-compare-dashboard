/**
 * @vitest-environment jsdom
 */
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { mockInstruments } from '../../mocks/instruments'
import DashboardPreviewPanel from './DashboardPreviewPanel'

vi.mock('./DashboardPage.css', () => ({
  emptyText: 'emptyText',
  item: 'item',
  itemLink: 'itemLink',
  list: 'list',
  meta: 'meta',
  panel: 'panel',
  panelHeader: 'panelHeader',
  panelLink: 'panelLink',
  panelTitle: 'panelTitle',
}))

const showPreviewPanel = (instruments = mockInstruments.slice(0, 4)) => {
  return render(
    <MemoryRouter>
      <DashboardPreviewPanel
        emptyMessage="Inga instrument har lagts till för jämförelse ännu."
        instruments={instruments}
        title="Jämförelse"
        to="/compare"
      />
    </MemoryRouter>,
  )
}

describe('when a dashboard preview panel has no instruments', () => {
  it('should show the empty state message', () => {
    showPreviewPanel([])

    expect(screen.getByText('Inga instrument har lagts till för jämförelse ännu.')).toBeInTheDocument()
  })
})

describe('when a dashboard preview panel has instruments', () => {
  it('should show up to three preview items', () => {
    showPreviewPanel()

    expect(screen.getAllByRole('link', { name: /Inc\.|Corporation|Chase/ })).toHaveLength(3)
    expect(screen.queryByRole('link', { name: 'Vanguard S&P 500 ETF' })).not.toBeInTheDocument()
  })
})
