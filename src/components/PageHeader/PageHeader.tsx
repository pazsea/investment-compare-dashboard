import type { FC } from 'react'

import * as styles from './PageHeader.css'

export type Props = {
  eyebrow: string
  title: string
  summary: string
}

const PageHeader: FC<Props> = (props) => {
  const { eyebrow, title, summary } = props

  return (
    <header className={styles.header}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.summary}>{summary}</p>
    </header>
  )
}

export default PageHeader
