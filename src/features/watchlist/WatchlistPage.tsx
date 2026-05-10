import type { FC } from 'react'

import { PageHeader } from '../../components/PageHeader'
import { useWatchlist } from '../../hooks/useWatchlist'
import WatchlistContent from './WatchlistContent'

import * as styles from './WatchlistPage.css'

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
        <WatchlistContent instruments={instruments} />
      </div>
    </main>
  )
}

export default WatchlistPage
