import type { FC } from 'react'

import type { Props } from './DashboardPreviewListEmptyState.types'

import * as styles from './DashboardPage.css'

const DashboardPreviewListEmptyState: FC<Props> = (props) => {
  return <p className={styles.emptyText}>{props.message}</p>
}

export default DashboardPreviewListEmptyState
