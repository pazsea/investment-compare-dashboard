/**
 * @vitest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ThemeProvider, useTheme } from './ThemeContext'

vi.mock('../styles/theme.css', () => ({
  darkThemeClass: 'dark-theme',
  lightThemeClass: 'light-theme',
}))

const ThemeProbe = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button type="button" onClick={toggleTheme}>
      {theme}
    </button>
  )
}

describe('when switching themes', () => {
  afterEach(() => {
    window.localStorage.clear()
    document.body.className = ''
  })

  it('should toggle the active theme and persist the selection', async () => {
    const user = userEvent.setup()

    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>,
    )

    expect(screen.getByRole('button', { name: 'light' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'light' }))

    expect(screen.getByRole('button', { name: 'dark' })).toBeInTheDocument()
    expect(document.body).toHaveClass('dark-theme')
    expect(window.localStorage.getItem('investmentCompareTheme')).toBe('dark')
  })
})
