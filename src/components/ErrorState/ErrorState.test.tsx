/**
 * @vitest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import ErrorState from './ErrorState'

vi.mock('./ErrorState.css', () => ({
  container: 'container',
  message: 'message',
  title: 'title',
}))

describe('when showing an error state with a title', () => {
  it('should expose the alert context', () => {
    render(<ErrorState title="Kunde inte hämta data" message="Försök igen om en stund." />)

    expect(screen.getByRole('heading', { name: 'Kunde inte hämta data' })).toBeInTheDocument()
    expect(screen.getByText('Försök igen om en stund.')).toBeInTheDocument()
  })
})

describe('when showing an error state without a title', () => {
  it('should only expose the message', () => {
    render(<ErrorState message="Något gick fel." />)

    expect(screen.getByText('Något gick fel.')).toBeInTheDocument()
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })
})
