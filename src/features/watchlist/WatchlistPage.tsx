import type { FC } from 'react'

import { EmptyState } from '../../components/EmptyState'
import { PageHeader } from '../../components/PageHeader'
import { WatchlistCard } from '../../components/WatchlistCard'
import { useWatchlist } from '../../hooks/useWatchlist'
import type { Instrument } from '../../types/instrument'

import * as styles from './WatchlistPage.css'

const renderWatchlistCard = (instrument: Instrument) => {
  return <WatchlistCard key={instrument.symbol} instrument={instrument} />
}

const WatchlistPage: FC = () => {
  const { instruments } = useWatchlist()

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <PageHeader
          eyebrow="Bevakningslista"
          title="Följ instrument du vill återvända till."
          summary="Håll intressanta instrument nära till hands medan du avgör vad som förtjänar djupare analys."
        />

        {instruments.length === 0 && <EmptyState message="Din bevakningslista är tom." />}

        {instruments.length > 0 && (
          <section className={styles.grid} aria-label="Sparade instrument">
            {instruments.map(renderWatchlistCard)}
          </section>
        )}
      </div>
    </main>
  )
}

export default WatchlistPage
