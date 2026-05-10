import type { FC } from 'react'
import { Link } from 'react-router-dom'

import type { Props } from './DashboardPreviewList.types'
import { getExchangeLabel, getInstrumentTypeLabel } from '../../utils/instrumentPresentation'
import { getInstrumentDetailsPath } from '../../utils/instrumentRoutes'
import DashboardPreviewListEmptyState from './DashboardPreviewListEmptyState'

import * as styles from './DashboardPage.css'

const PREVIEW_LIMIT = 3

const DashboardPreviewList: FC<Props> = (props) => {
  const { emptyMessage, instruments } = props
  const previewItems = instruments.slice(0, PREVIEW_LIMIT)

  if (previewItems.length === 0) {
    return <DashboardPreviewListEmptyState message={emptyMessage} />
  }

  const renderPreviewItem = (instrument: Props['instruments'][number]) => {
    return (
      <li className={styles.item} key={instrument.symbol}>
        <Link
          className={styles.itemLink}
          to={getInstrumentDetailsPath(instrument.symbol)}
          state={{ instrument }}
        >
          {instrument.name}
        </Link>
        <div className={styles.meta}>
          <span>{instrument.symbol}</span>
          <span>{getInstrumentTypeLabel(instrument.type)}</span>
          <span>{getExchangeLabel(instrument.exchange)}</span>
        </div>
      </li>
    )
  }

  return <ul className={styles.list}>{previewItems.map(renderPreviewItem)}</ul>
}

export default DashboardPreviewList
