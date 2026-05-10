/**
 * @vitest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import PageHeader from './PageHeader'

vi.mock('./PageHeader.css', () => ({
  eyebrow: 'eyebrow',
  header: 'header',
  summary: 'summary',
  title: 'title',
}))

describe('when showing a page header', () => {
  it('should expose the title and supporting context', () => {
    render(
      <PageHeader
        eyebrow="Jämförelse"
        title="Jämför valda instrument."
        summary="Granska valda instrument sida vid sida."
      />,
    )

    expect(screen.getByRole('heading', { name: 'Jämför valda instrument.' })).toBeInTheDocument()
    expect(screen.getByText('Jämförelse')).toBeInTheDocument()
    expect(screen.getByText('Granska valda instrument sida vid sida.')).toBeInTheDocument()
  })
})
