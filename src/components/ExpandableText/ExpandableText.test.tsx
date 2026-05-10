/**
 * @vitest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import ExpandableText from './ExpandableText'

vi.mock('./ExpandableText.css', () => ({
  button: 'button',
  clamped: 'clamped',
  root: 'root',
  text: 'text',
}))

const shortText = 'Kort beskrivning som far plats utan att kapas.'
const longText =
  'Apple utvecklar, tillverkar och saljfor smartphones, persondatorer, surfplattor, wearables och tjanster globalt. ' +
  'Bolaget driver ett brett ekosystem av hardvara, mjukvara och abonnemang som tillsammans skapar en tydlig plattformseffekt ' +
  'och en aterkommande intaktsbas med stor kundlojalitet over tid.'

describe('when the company description is short', () => {
  it('should show the text without a toggle button', () => {
    render(<ExpandableText text={shortText} />)

    expect(screen.getByText(shortText)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Visa mer' })).not.toBeInTheDocument()
  })
})

describe('when the company description is long', () => {
  it('should let the user expand and collapse the full text', async () => {
    const user = userEvent.setup()

    render(<ExpandableText text={longText} />)

    expect(screen.getByRole('button', { name: 'Visa mer' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Visa mer' }))

    expect(screen.getByRole('button', { name: 'Visa mindre' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Visa mindre' }))

    expect(screen.getByRole('button', { name: 'Visa mer' })).toBeInTheDocument()
  })
})
