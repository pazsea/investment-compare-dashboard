import type { FC } from 'react'

import * as styles from './ErrorState.css'

export type Props = {
  title?: string
  message: string
}

const ErrorState: FC<Props> = (props) => {
  return (
    <section className={styles.container} aria-live="assertive">
      {props.title && <h2 className={styles.title}>{props.title}</h2>}
      <p className={styles.message}>{props.message}</p>
    </section>
  )
}

export default ErrorState
