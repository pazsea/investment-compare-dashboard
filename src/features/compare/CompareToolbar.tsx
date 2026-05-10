import type { FC } from 'react'

import type { Props } from './CompareToolbar.types'

import * as styles from './ComparePage.css'

const CompareToolbar: FC<Props> = (props) => {
  const { onClearCompare, selectedCount } = props

  return (
    <div className={styles.toolbar}>
      <h2 id="compare-results-heading" className={styles.instrumentName}>
        Valda instrument
      </h2>
      <span className={styles.count}>{selectedCount} instrument</span>
      <button className={styles.button} type="button" onClick={onClearCompare}>
        Rensa alla
      </button>
    </div>
  )
}

export default CompareToolbar
