import type { FC } from 'react'
import { Link } from 'react-router-dom'

import DashboardPreviewPanel from './DashboardPreviewPanel'
import { mockInstruments } from '../../mocks/instruments'
import { useCompareSelection } from '../../hooks/useCompareSelection'
import { useWatchlist } from '../../hooks/useWatchlist'
import type { Instrument } from '../../types/instrument'
import { getExchangeLabel, getInstrumentTypeLabel } from '../../utils/instrumentPresentation'
import { openGlobalSearch } from '../../utils/globalSearch'
import { getInstrumentDetailsPath } from '../../utils/instrumentRoutes'

import * as styles from './DashboardPage.css'

const popularInstruments = mockInstruments.slice(0, 6)

const renderInstrumentMeta = (instrument: Instrument) => {
  return (
    <div className={styles.meta}>
      <span>{instrument.symbol}</span>
      <span>{getInstrumentTypeLabel(instrument.type)}</span>
      <span>{getExchangeLabel(instrument.exchange)}</span>
    </div>
  )
}

const handleOpenSearch = () => {
  openGlobalSearch()
}

const DashboardPage: FC = () => {
  const { selectedInstruments } = useCompareSelection()
  const { instruments: watchlistInstruments } = useWatchlist()
  const comparePreview = selectedInstruments.slice(0, 3)
  const watchlistPreview = watchlistInstruments.slice(0, 3)

const renderPopularInstrument = (instrument: Instrument) => {
  return (
    <article className={styles.item} key={instrument.symbol}>
      <Link
        className={styles.itemLink}
        to={getInstrumentDetailsPath(instrument.symbol)}
        state={{ instrument }}
      >
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
            <p className={styles.eyebrow}>Investment Compare</p>
            <h1 className={styles.title} id="dashboard-title">
              Sök, spara och jämför instrument i ett samlat arbetsflöde.
            </h1>
            <p className={styles.summary}>
              Använd mockad data som standard under utveckling och slå på live-sökning när du vill
              testa riktiga marknadssvar.
            </p>
          </div>
          <button className={styles.cta} type="button" onClick={handleOpenSearch}>
            Sök instrument
          </button>
        </section>

        <section className={styles.grid} aria-label="Översikt">
          <DashboardPreviewPanel
            emptyMessage="Inga instrument har lagts till för jämförelse ännu."
            instruments={comparePreview}
            title="Jämförelse"
            to="/compare"
          />
          <DashboardPreviewPanel
            emptyMessage="Din bevakningslista är redo för instrument du vill följa."
            instruments={watchlistPreview}
            title="Bevakningslista"
            to="/watchlist"
          />
        </section>

        <section className={styles.popularSection} aria-labelledby="popular-instruments-heading">
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle} id="popular-instruments-heading">
              Populära instrument
            </h2>
            <button className={styles.panelAction} type="button" onClick={handleOpenSearch}>
              Sök alla
            </button>
          </div>
          <div className={styles.popularGrid}>{popularInstruments.map(renderPopularInstrument)}</div>
        </section>
      </div>
    </main>
  )
}

export default DashboardPage
