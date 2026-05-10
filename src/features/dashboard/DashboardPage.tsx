import type { FC } from 'react'
import { Link } from 'react-router-dom'

import { mockInstruments } from '../../mocks/instruments'
import { useCompareSelection } from '../../hooks/useCompareSelection'
import { useWatchlist } from '../../hooks/useWatchlist'
import type { Instrument } from '../../types/instrument'

import * as styles from './DashboardPage.css'

const popularInstruments = mockInstruments.slice(0, 6)

const renderInstrumentMeta = (instrument: Instrument) => {
  return (
    <div className={styles.meta}>
      <span>{instrument.symbol}</span>
      <span>{instrument.type.toUpperCase()}</span>
      <span>{instrument.exchange ?? 'Market unavailable'}</span>
    </div>
  )
}

const DashboardPage: FC = () => {
  const { selectedInstruments } = useCompareSelection()
  const { instruments: watchlistInstruments } = useWatchlist()
  const comparePreview = selectedInstruments.slice(0, 3)
  const watchlistPreview = watchlistInstruments.slice(0, 3)

  const renderPreviewItem = (instrument: Instrument) => {
    return (
      <li className={styles.item} key={instrument.symbol}>
        <Link className={styles.itemLink} to={`/instrument/${encodeURIComponent(instrument.symbol)}`}>
          {instrument.name}
        </Link>
        {renderInstrumentMeta(instrument)}
      </li>
    )
  }

  const renderPopularInstrument = (instrument: Instrument) => {
    return (
      <article className={styles.item} key={instrument.symbol}>
        <Link className={styles.itemLink} to={`/instrument/${encodeURIComponent(instrument.symbol)}`}>
          {instrument.name}
        </Link>
        {renderInstrumentMeta(instrument)}
      </article>
    )
  }

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <section className={styles.hero} aria-labelledby="dashboard-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Investment dashboard</p>
            <h1 className={styles.title} id="dashboard-title">
              Search, save, and compare instruments in one focused workspace.
            </h1>
            <p className={styles.summary}>
              Use mocked data by default while developing, then opt into Financial Modeling Prep
              when you want real market responses.
            </p>
          </div>
          <Link className={styles.cta} to="/search">
            Search instruments
          </Link>
        </section>

        <section className={styles.grid} aria-label="Dashboard previews">
          <article className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>Compare</h2>
              <Link className={styles.panelLink} to="/compare">
                Open
              </Link>
            </div>
            {comparePreview.length === 0 && (
              <p className={styles.emptyText}>No instruments selected for comparison yet.</p>
            )}
            {comparePreview.length > 0 && (
              <ul className={styles.list}>{comparePreview.map(renderPreviewItem)}</ul>
            )}
          </article>

          <article className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>Watchlist</h2>
              <Link className={styles.panelLink} to="/watchlist">
                Open
              </Link>
            </div>
            {watchlistPreview.length === 0 && (
              <p className={styles.emptyText}>Your watchlist is ready for saved instruments.</p>
            )}
            {watchlistPreview.length > 0 && (
              <ul className={styles.list}>{watchlistPreview.map(renderPreviewItem)}</ul>
            )}
          </article>

          <article className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>API mode</h2>
            </div>
            <p className={styles.emptyText}>
              Live market calls stay off by default, keeping local development calm.
            </p>
          </article>
        </section>

        <section className={styles.popularSection} aria-labelledby="popular-instruments-heading">
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle} id="popular-instruments-heading">
              Popular instruments
            </h2>
            <Link className={styles.panelLink} to="/search">
              Search all
            </Link>
          </div>
          <div className={styles.popularGrid}>{popularInstruments.map(renderPopularInstrument)}</div>
        </section>
      </div>
    </main>
  )
}

export default DashboardPage
