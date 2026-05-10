/**
 * @vitest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import EmptyState from './EmptyState'

vi.mock('./EmptyState.css', () => ({
  container: 'container',
  message: 'message',
  title: 'title',
}))

describe('when showing an empty state with a title', () => {
  it('should expose the title and message', () => {
    render(<EmptyState title="Inga instrument" message="Börja med att söka efter ett instrument." />)

    expect(screen.getByRole('heading', { name: 'Inga instrument' })).toBeInTheDocument()
    expect(screen.getByText('Börja med att söka efter ett instrument.')).toBeInTheDocument()
  })
})

describe('when showing an empty state without a title', () => {
  it('should only expose the message', () => {
    render(<EmptyState message="Din lista är tom." />)

    expect(screen.getByText('Din lista är tom.')).toBeInTheDocument()
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })
})
