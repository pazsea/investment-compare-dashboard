import type { FC, ReactNode } from 'react'
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
  const { theme, toggleTheme } = useTheme()
  const themeButtonLabel = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
  const themeButtonText = theme === 'dark' ? 'Light mode' : 'Dark mode'
  const ThemeIcon = theme === 'dark' ? SunMedium : Moon

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
            <Link className={styles.link} to="/search">
              Search
            </Link>
            <Link className={styles.link} to="/compare">
              Compare
            </Link>
            <Link className={styles.link} to="/watchlist">
              Watchlist
            </Link>
          </div>
          <button
            className={styles.themeButton}
            type="button"
            aria-label={themeButtonLabel}
            aria-pressed={theme === 'dark'}
            onClick={toggleTheme}
          >
            <ThemeIcon className={styles.themeIcon} aria-hidden="true" />
            <span>{themeButtonText}</span>
          </button>
        </nav>
      </header>
      {props.children}
    </div>
  )
}

export default AppLayout
