/**
 * @vitest-environment jsdom
 */
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { mockInstruments } from '../../mocks/instruments'
import WatchlistContent from './WatchlistContent'

vi.mock('../../components/EmptyState/EmptyState.css', () => ({
  container: 'container',
  message: 'message',
  title: 'title',
}))
vi.mock('../../components/WatchlistCard/WatchlistCard', () => ({
  default: (props: { instrument: (typeof mockInstruments)[number] }) => {
    return <article>{props.instrument.name}</article>
  },
}))
vi.mock('./WatchlistPage.css', () => ({
  grid: 'grid',
}))

const showWatchlistContent = (instruments = mockInstruments.slice(0, 2)) => {
  return render(
    <MemoryRouter>
      <WatchlistContent instruments={instruments} />
    </MemoryRouter>,
  )
}

describe('when the watchlist content has no instruments', () => {
  it('should show the empty state', () => {
    showWatchlistContent([])

    expect(screen.getByText('Din bevakningslista är tom.')).toBeInTheDocument()
  })
})

describe('when the watchlist content has instruments', () => {
  it('should show the saved instruments list', () => {
    showWatchlistContent()

    expect(screen.getByLabelText('Sparade instrument')).toBeInTheDocument()
    expect(screen.getByText('Apple Inc.')).toBeInTheDocument()
    expect(screen.getByText('Microsoft Corporation')).toBeInTheDocument()
  })
})
