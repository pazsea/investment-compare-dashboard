import type { FC } from 'react'

import * as styles from './BrandMark.css'

export type Props = {}

const BrandMark: FC<Props> = () => {
  return (
    <span className={styles.root}>
      <span className={styles.mark} aria-hidden="true">
        <span className={styles.markBarShort} />
        <span className={styles.markBarMedium} />
        <span className={styles.markBarTall} />
        <span className={styles.pulse} />
      </span>
      <span className={styles.copy}>
        <span className={styles.name}>Investment Compare</span>
        <span className={styles.tag}>Market workspace</span>
      </span>
    </span>
  )
}

export default BrandMark
