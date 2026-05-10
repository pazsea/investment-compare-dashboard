import { createContext, useContext, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'

import { darkThemeClass, lightThemeClass } from '../styles/theme.css'

export type ThemeMode = 'light' | 'dark'

export type Props = {
  children: ReactNode
}

type ThemeContextValue = {
  setTheme: (theme: ThemeMode) => void
  theme: ThemeMode
  toggleTheme: () => void
}

const THEME_STORAGE_KEY = 'investmentCompareTheme'

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const readStoredTheme = (): ThemeMode => {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)

  return storedTheme === 'dark' ? 'dark' : 'light'
}

export const ThemeProvider: FC<Props> = (props) => {
  const [theme, setTheme] = useState<ThemeMode>(readStoredTheme)

  useEffect(() => {
    document.body.classList.remove(lightThemeClass, darkThemeClass)
    document.body.classList.add(theme === 'dark' ? darkThemeClass : lightThemeClass)
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ setTheme, theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const value = useContext(ThemeContext)

  if (!value) {
    throw new Error('useTheme must be used within ThemeProvider')
  }

  return value
}
