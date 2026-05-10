import type { FC } from 'react'

import { EmptyState } from '../../components/EmptyState'
import { WatchlistCard } from '../../components/WatchlistCard'
import type { Props } from './WatchlistContent.types'

import * as styles from './WatchlistPage.css'

const WatchlistContent: FC<Props> = (props) => {
  const { instruments } = props

  if (instruments.length === 0) {
    return <EmptyState message="Din bevakningslista är tom." />
  }

  const renderWatchlistCard = (instrument: Props['instruments'][number]) => {
    return <WatchlistCard key={instrument.symbol} instrument={instrument} />
  }

  return (
    <section className={styles.grid} aria-label="Sparade instrument">
      {instruments.map(renderWatchlistCard)}
    </section>
  )
}

export default WatchlistContent
