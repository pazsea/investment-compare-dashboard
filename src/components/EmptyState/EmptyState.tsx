import type { FC } from 'react'

import * as styles from './EmptyState.css'

export type Props = {
  title?: string
  message: string
}

const EmptyState: FC<Props> = (props) => {
  return (
    <section className={styles.container} aria-live="polite">
      {props.title && <h2 className={styles.title}>{props.title}</h2>}
      <p className={styles.message}>{props.message}</p>
    </section>
  )
}

export default EmptyState
