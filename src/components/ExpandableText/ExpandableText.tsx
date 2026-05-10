import { useCallback, useState } from 'react'
import type { FC } from 'react'
import clsx from 'clsx'

import type { Props } from './ExpandableText.types'
import * as styles from './ExpandableText.css'

const EXPANDABLE_TEXT_THRESHOLD = 240

const ExpandableText: FC<Props> = (props) => {
  const { text } = props
  const [isExpanded, setIsExpanded] = useState(false)
  const shouldShowToggle = text.length > EXPANDABLE_TEXT_THRESHOLD

  const handleToggle = useCallback(() => {
    setIsExpanded((currentValue) => !currentValue)
  }, [])

  return (
    <div className={styles.root}>
      <p className={clsx(styles.text, shouldShowToggle && !isExpanded && styles.clamped)}>
        {text}
      </p>
      {shouldShowToggle && (
        <button className={styles.button} type="button" onClick={handleToggle}>
          {isExpanded ? 'Visa mindre' : 'Visa mer'}
        </button>
      )}
    </div>
  )
}

export default ExpandableText
