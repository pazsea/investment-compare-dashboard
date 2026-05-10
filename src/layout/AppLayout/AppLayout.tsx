import { useCallback } from 'react'
import type { FC, MouseEvent, ReactNode } from 'react'
import { Moon, SunMedium } from 'lucide-react'
import { Link } from 'react-router-dom'

import { BrandMark } from '../../components/BrandMark'
import { GlobalSearch } from '../../components/GlobalSearch'
import { useTheme } from '../../context/ThemeContext'

import * as styles from './AppLayout.css'

export type Props = {
  children: ReactNode
}

const AppLayout: FC<Props> = (props) => {
  const { setTheme, theme } = useTheme()

  const handleThemeSelect = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const nextTheme = event.currentTarget.dataset.theme

      if (nextTheme === 'light' || nextTheme === 'dark') {
        setTheme(nextTheme)
      }
    },
    [setTheme],
  )

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <nav className={styles.nav} aria-label="Primary navigation">
          <Link className={styles.brand} to="/">
            <BrandMark />
          </Link>
          <div className={styles.search}>
            <GlobalSearch />
          </div>
          <div className={styles.links}>
            <Link className={styles.link} to="/compare">
              Compare
            </Link>
            <Link className={styles.link} to="/watchlist">
              Watchlist
            </Link>
          </div>
          <div className={styles.themeToggle} role="group" aria-label="Theme mode">
            <button
              className={theme === 'light' ? styles.activeThemeOption : styles.themeOption}
              type="button"
              data-theme="light"
              aria-label="Switch to light theme"
              aria-pressed={theme === 'light'}
              onClick={handleThemeSelect}
            >
              <SunMedium className={styles.themeIcon} aria-hidden="true" />
            </button>
            <button
              className={theme === 'dark' ? styles.activeThemeOption : styles.themeOption}
              type="button"
              data-theme="dark"
              aria-label="Switch to dark theme"
              aria-pressed={theme === 'dark'}
              onClick={handleThemeSelect}
            >
              <Moon className={styles.themeIcon} aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>
      {props.children}
    </div>
  )
}

export default AppLayout
