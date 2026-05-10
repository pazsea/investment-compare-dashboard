import { keyframes, style } from '@vanilla-extract/css'

import { breakpoints, vars } from '../../styles/theme.css'

const shimmer = keyframes({
  '0%': {
    backgroundPosition: '100% 0',
  },
  '100%': {
    backgroundPosition: '-100% 0',
  },
})

const skeletonFill = {
  animation: `${shimmer} 1.8s ease-in-out infinite`,
  background: `linear-gradient(90deg, ${vars.colors.surfaceElevated} 0%, ${vars.colors.border} 50%, ${vars.colors.surfaceElevated} 100%)`,
  backgroundSize: '200% 100%',
}

export const container = style({
  display: 'grid',
  gap: vars.space.md,
  padding: vars.space.xl,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.md,
  background: vars.colors.surface,
  boxShadow: vars.shadow.sm,
  color: vars.colors.textMuted,
  lineHeight: 1.5,
})

export const title = style({
  margin: 0,
  color: vars.colors.text,
  fontSize: vars.fontSize.lg,
})

export const message = style({
  margin: 0,
  color: vars.colors.textMuted,
  fontSize: vars.fontSize.md,
})

export const cardGrid = style({
  display: 'grid',
  gap: vars.space.lg,

  '@media': {
    [`(min-width: ${breakpoints.tablet})`]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
    [`(min-width: ${breakpoints.desktop})`]: {
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    },
  },
})

export const cardSkeleton = style({
  display: 'grid',
  gap: vars.space.lg,
  minHeight: '180px',
  padding: vars.space.lg,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.md,
  background: vars.colors.surface,
  boxShadow: vars.shadow.sm,
})

export const cardHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.space.md,
})

export const skeletonAccent = style([
  skeletonFill,
  {
    height: vars.space.md,
    width: '72px',
    borderRadius: vars.radii.full,
  },
])

export const skeletonChip = style([
  skeletonFill,
  {
    height: '28px',
    width: '64px',
    borderRadius: vars.radii.full,
  },
])

export const cardBody = style({
  display: 'grid',
  gap: vars.space.sm,
})

export const skeletonLine = style([
  skeletonFill,
  {
    height: vars.space.md,
    width: '54%',
    borderRadius: vars.radii.full,
  },
])

export const skeletonLineWide = style([
  skeletonFill,
  {
    height: vars.space.lg,
    width: '82%',
    borderRadius: vars.radii.full,
  },
])

export const metaRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space.sm,
})

export const skeletonLineShort = style([
  skeletonFill,
  {
    height: vars.space.md,
    width: '96px',
    borderRadius: vars.radii.full,
  },
])

export const cardActions = style({
  display: 'grid',
  gap: vars.space.sm,

  '@media': {
    [`(min-width: ${breakpoints.mobile})`]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
    [`(min-width: ${breakpoints.tablet})`]: {
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    },
  },
})

export const skeletonButton = style([
  skeletonFill,
  {
    minHeight: '44px',
    width: '100%',
    borderRadius: vars.radii.sm,
  },
])

export const detailsSkeleton = style({
  display: 'grid',
  gap: vars.space.xl,
  padding: vars.space.lg,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.md,
  background: vars.colors.surface,
  boxShadow: vars.shadow.md,

  '@media': {
    [`(min-width: ${breakpoints.tablet})`]: {
      padding: vars.space.xl,
    },
  },
})

export const detailsHeader = style({
  display: 'grid',
  gap: vars.space.md,
})

export const detailsSymbol = style([
  skeletonFill,
  {
    height: vars.space.md,
    width: '88px',
    borderRadius: vars.radii.full,
  },
])

export const detailsTitle = style([
  skeletonFill,
  {
    height: '40px',
    width: '72%',
    borderRadius: vars.radii.sm,
  },
])

export const detailsMeta = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space.sm,
})

export const detailsMetaPill = style([
  skeletonFill,
  {
    height: '28px',
    width: '110px',
    borderRadius: vars.radii.full,
  },
])

export const detailsMetrics = style({
  display: 'grid',
  gap: vars.space.lg,

  '@media': {
    [`(min-width: ${breakpoints.tablet})`]: {
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    },
  },
})

export const metricSkeleton = style({
  display: 'grid',
  gap: vars.space.sm,
  padding: vars.space.lg,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.md,
  background: vars.colors.surfaceElevated,
})

export const metricLabelSkeleton = style([
  skeletonFill,
  {
    height: vars.space.sm,
    width: '68px',
    borderRadius: vars.radii.full,
  },
])

export const metricValueSkeleton = style([
  skeletonFill,
  {
    height: '32px',
    width: '74%',
    borderRadius: vars.radii.sm,
  },
])

export const detailsActions = style({
  display: 'grid',
  gap: vars.space.sm,

  '@media': {
    [`(min-width: ${breakpoints.mobile})`]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
  },
})

export const actionSkeleton = style([
  skeletonFill,
  {
    minHeight: '44px',
    borderRadius: vars.radii.sm,
  },
])
