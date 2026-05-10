import type { FC } from 'react'
import { Link } from 'react-router-dom'

import type { Props } from './DashboardPreviewPanel.types'
import DashboardPreviewList from './DashboardPreviewList'

import * as styles from './DashboardPage.css'

const DashboardPreviewPanel: FC<Props> = (props) => {
  const { emptyMessage, instruments, title, to } = props

  return (
    <article className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2 className={styles.panelTitle}>{title}</h2>
        <Link className={styles.panelLink} to={to}>
          Öppna
        </Link>
      </div>
      <DashboardPreviewList emptyMessage={emptyMessage} instruments={instruments} />
    </article>
  )
}

export default DashboardPreviewPanel
