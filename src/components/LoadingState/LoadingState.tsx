import type { FC } from 'react'

import * as styles from './LoadingState.css'

type Variant = 'details' | 'message' | 'search-results'

export type Props = {
  cardCount?: number
  message?: string
  title?: string
  variant?: Variant
}

const renderSearchSkeletonCard = (_: unknown, index: number) => {
  return (
    <article className={styles.cardSkeleton} key={`search-skeleton-${index}`} aria-hidden="true">
      <div className={styles.cardHeader}>
        <div className={styles.skeletonAccent} />
        <div className={styles.skeletonChip} />
      </div>
      <div className={styles.cardBody}>
        <div className={styles.skeletonLine} />
        <div className={styles.skeletonLineWide} />
        <div className={styles.metaRow}>
          <div className={styles.skeletonLineShort} />
          <div className={styles.skeletonLineShort} />
        </div>
      </div>
      <div className={styles.cardActions}>
        <div className={styles.skeletonButton} />
        <div className={styles.skeletonButton} />
        <div className={styles.skeletonButton} />
      </div>
    </article>
  )
}

const renderDetailsMetric = (_: unknown, index: number) => {
  return (
    <article className={styles.metricSkeleton} key={`details-metric-${index}`} aria-hidden="true">
      <div className={styles.metricLabelSkeleton} />
      <div className={styles.metricValueSkeleton} />
    </article>
  )
}

const renderDetailsAction = (_: unknown, index: number) => {
  return <div className={styles.actionSkeleton} key={`details-action-${index}`} aria-hidden="true" />
}

const LoadingState: FC<Props> = (props) => {
  const { cardCount = 3, message, title, variant = 'message' } = props

  if (variant === 'search-results') {
    return (
      <section className={styles.container} aria-live="polite">
        {title && <h2 className={styles.title}>{title}</h2>}
        {message && <p className={styles.message}>{message}</p>}
        <div className={styles.cardGrid}>{Array.from({ length: cardCount }).map(renderSearchSkeletonCard)}</div>
      </section>
    )
  }

  if (variant === 'details') {
    return (
      <section className={styles.container} aria-live="polite">
        {title && <h2 className={styles.title}>{title}</h2>}
        {message && <p className={styles.message}>{message}</p>}
        <div className={styles.detailsSkeleton} aria-hidden="true">
          <div className={styles.detailsHeader}>
            <div className={styles.detailsSymbol} />
            <div className={styles.detailsTitle} />
            <div className={styles.detailsMeta}>
              <div className={styles.detailsMetaPill} />
              <div className={styles.detailsMetaPill} />
              <div className={styles.detailsMetaPill} />
            </div>
          </div>
          <div className={styles.detailsMetrics}>{Array.from({ length: 3 }).map(renderDetailsMetric)}</div>
          <div className={styles.detailsActions}>{Array.from({ length: 2 }).map(renderDetailsAction)}</div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.container} aria-live="polite">
      {title && <h2 className={styles.title}>{title}</h2>}
      {message && <p className={styles.message}>{message}</p>}
    </section>
  )
}

export default LoadingState
