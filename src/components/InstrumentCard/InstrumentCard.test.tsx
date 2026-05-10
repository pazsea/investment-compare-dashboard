/**
 * @vitest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import type { Instrument } from '../../types/instrument'
import InstrumentCard from './InstrumentCard'

vi.mock('./InstrumentCard.css', () => ({
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

const instrument: Instrument = {
  type: 'stock',
  symbol: 'AAPL',
  name: 'Apple Inc.',
  currency: 'USD',
  exchange: 'NASDAQ',
  sector: 'Technology',
}

describe('when showing an instrument card', () => {
  it('should expose the key instrument details', () => {
    render(<InstrumentCard instrument={instrument} />)

    expect(screen.getByRole('article', { name: 'Apple Inc.' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Apple Inc.' })).toBeInTheDocument()
    expect(screen.getByText('AAPL')).toBeInTheDocument()
    expect(screen.getByText('STOCK')).toBeInTheDocument()
    expect(screen.getByText('NASDAQ')).toBeInTheDocument()
    expect(screen.getByText('USD')).toBeInTheDocument()
  })

  it('should keep compare and watchlist actions unavailable for now', () => {
    render(<InstrumentCard instrument={instrument} />)

    expect(screen.getByRole('button', { name: 'Add to compare' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Add to watchlist' })).toBeDisabled()
  })
})
