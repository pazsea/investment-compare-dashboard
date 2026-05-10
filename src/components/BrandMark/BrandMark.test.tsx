/**
 * @vitest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import BrandMark from './BrandMark'

vi.mock('./BrandMark.css', () => ({
  copy: 'copy',
  mark: 'mark',
  markBar: 'markBar',
  markBarMedium: 'markBarMedium',
  markBarShort: 'markBarShort',
  markBarTall: 'markBarTall',
  name: 'name',
  pulse: 'pulse',
  root: 'root',
  tag: 'tag',
}))

describe('when showing the brand mark', () => {
  it('should expose the product identity', () => {
    render(<BrandMark />)

    expect(screen.getByText('Investment Compare')).toBeInTheDocument()
    expect(screen.getByText('Market workspace')).toBeInTheDocument()
  })
})
