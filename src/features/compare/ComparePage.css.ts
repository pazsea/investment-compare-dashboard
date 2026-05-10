import { style } from '@vanilla-extract/css'

import { breakpoints, vars } from '../../styles/theme.css'

export const page = style({
  minHeight: '100vh',
  padding: vars.space.lg,
})

export const shell = style({
  display: 'grid',
  width: '100%',
  maxWidth: '1180px',
  margin: '0 auto',
  gap: vars.space.xl,
  paddingTop: vars.space.xl,
})

export const toolbar = style({
  display: 'grid',
  gap: vars.space.md,

  '@media': {
    [`(min-width: ${breakpoints.tablet})`]: {
      gridTemplateColumns: '1fr auto auto',
      alignItems: 'center',
    },
  },
})

export const compareContent = style({
  display: 'grid',
  gap: vars.space.xl,
})

export const count = style({
  color: vars.colors.textMuted,
  fontSize: vars.fontSize.sm,
})

export const button = style({
  minHeight: '44px',
  width: '100%',
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.sm,
  background: vars.colors.surface,
  color: vars.colors.text,
  cursor: 'pointer',
  fontSize: vars.fontSize.sm,
  fontWeight: 700,
  padding: `${vars.space.sm} ${vars.space.lg}`,
  transition: 'transform 180ms ease, border-color 180ms ease, background-color 180ms ease, color 180ms ease',

  ':hover': {
    borderColor: vars.colors.borderStrong,
    transform: 'translateY(-1px)',
  },

  ':disabled': {
    color: vars.colors.textMuted,
    cursor: 'not-allowed',
  },

  '@media': {
    [`(min-width: ${breakpoints.tablet})`]: {
      width: 'auto',
    },
  },
})

export const removeButton = style([
  button,
  {
    color: vars.colors.negative,
  },
])

export const emptyState = style({
  padding: vars.space.xl,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.md,
  background: vars.colors.surface,
  color: vars.colors.textMuted,
  lineHeight: 1.5,
})

export const mobileList = style({
  display: 'grid',
  gap: vars.space.lg,

  '@media': {
    [`(min-width: ${breakpoints.tablet})`]: {
      display: 'none',
    },
  },
})

export const desktopTable = style({
  display: 'none',

  '@media': {
    [`(min-width: ${breakpoints.tablet})`]: {
      display: 'block',
    },
  },
})

export const chartSection = style({
  display: 'grid',
  gap: vars.space.lg,
  overflow: 'hidden',
  padding: vars.space.lg,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.md,
  background: vars.colors.surface,
  boxShadow: vars.shadow.sm,
  transition: 'box-shadow 180ms ease, border-color 180ms ease',

  ':hover': {
    borderColor: vars.colors.borderStrong,
    boxShadow: vars.shadow.md,
  },
})

export const chartHeader = style({
  display: 'grid',
  gap: vars.space.md,
  minWidth: 0,

  '@media': {
    [`(min-width: ${breakpoints.tablet})`]: {
      gridTemplateColumns: '1fr auto',
      alignItems: 'center',
    },
  },
})

export const chartTitle = style({
  margin: 0,
  color: vars.colors.text,
  fontSize: vars.fontSize.lg,
})

export const chartSummary = style({
  margin: 0,
  color: vars.colors.textMuted,
  fontSize: vars.fontSize.sm,
  lineHeight: 1.5,
})

export const chartPill = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '32px',
  minWidth: '52px',
  width: 'fit-content',
  borderColor: vars.colors.primary,
  borderStyle: 'solid',
  borderWidth: '1px',
  borderRadius: vars.radii.full,
  background: vars.colors.primarySoft,
  color: vars.colors.primary,
  fontSize: vars.fontSize.xs,
  fontWeight: 700,
  padding: `${vars.space.xs} ${vars.space.sm}`,
})

export const chartViewport = style({
  minWidth: 0,
  overflow: 'hidden',
})

export const chartCanvas = style({
  minWidth: 0,
  minHeight: '280px',
  width: '100%',
  height: '280px',
})

export const metricsGrid = style({
  display: 'grid',
  gap: vars.space.lg,

  '@media': {
    [`(min-width: ${breakpoints.tablet})`]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
    [`(min-width: ${breakpoints.desktop})`]: {
      gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    },
  },
})

export const metricCard = style({
  display: 'grid',
  gap: vars.space.md,
  padding: vars.space.lg,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.md,
  background: vars.colors.surface,
  boxShadow: vars.shadow.sm,
  transition: 'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease',

  ':hover': {
    transform: 'translateY(-2px)',
    borderColor: vars.colors.borderStrong,
    boxShadow: vars.shadow.md,
  },
})

export const metricHeader = style({
  display: 'grid',
  gap: vars.space.xs,
})

export const metricSymbol = style({
  color: vars.colors.primary,
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.xs,
  fontWeight: 700,
})

export const metricName = style({
  margin: 0,
  color: vars.colors.text,
  fontSize: vars.fontSize.md,
})

export const statGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: vars.space.md,
})

export const statLabel = style({
  display: 'block',
  color: vars.colors.textSubtle,
  fontSize: vars.fontSize.xs,
  fontWeight: 700,
  textTransform: 'uppercase',
})

export const statValue = style({
  color: vars.colors.text,
  fontSize: vars.fontSize.sm,
})

export const positiveStat = style({
  color: vars.colors.positive,
  fontWeight: 700,
})

export const negativeStat = style({
  color: vars.colors.negative,
  fontWeight: 700,
})

export const card = style({
  display: 'grid',
  gap: vars.space.lg,
  padding: vars.space.lg,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.md,
  background: vars.colors.surface,
  boxShadow: vars.shadow.sm,
  transition: 'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease',

  ':hover': {
    transform: 'translateY(-2px)',
    borderColor: vars.colors.borderStrong,
    boxShadow: vars.shadow.md,
  },
})

export const cardHeader = style({
  display: 'grid',
  gap: vars.space.md,

  '@media': {
    [`(min-width: ${breakpoints.mobile})`]: {
      gridTemplateColumns: 'minmax(0, 1fr) auto',
      alignItems: 'start',
    },
  },
})

export const instrumentName = style({
  margin: 0,
  color: vars.colors.text,
  fontSize: vars.fontSize.lg,
  lineHeight: 1.3,
})

export const symbol = style({
  color: vars.colors.primary,
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.sm,
  fontWeight: 700,
})

export const detailGrid = style({
  display: 'grid',
  gap: vars.space.md,

  '@media': {
    [`(min-width: ${breakpoints.mobile})`]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
  },
})

export const detailLabel = style({
  display: 'block',
  color: vars.colors.textSubtle,
  fontSize: vars.fontSize.xs,
  fontWeight: 700,
  textTransform: 'uppercase',
})

export const detailValue = style({
  color: vars.colors.text,
  fontSize: vars.fontSize.sm,
})
