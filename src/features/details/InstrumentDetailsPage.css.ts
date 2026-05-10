import { style } from '@vanilla-extract/css'

import { breakpoints, vars } from '../../styles/theme.css'

export const page = style({
  minHeight: '100vh',
  padding: vars.space.lg,
})

export const shell = style({
  display: 'grid',
  width: '100%',
  maxWidth: '980px',
  margin: '0 auto',
  gap: vars.space.xl,
  paddingTop: vars.space.xl,
})

export const panel = style({
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

export const header = style({
  display: 'grid',
  gap: vars.space.md,
})

export const symbol = style({
  color: vars.colors.primary,
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.sm,
  fontWeight: 700,
})

export const title = style({
  margin: 0,
  color: vars.colors.text,
  fontSize: vars.fontSize.xxl,
  lineHeight: 1.15,
})

export const meta = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space.sm,
  color: vars.colors.textMuted,
  fontSize: vars.fontSize.sm,
})

export const priceGrid = style({
  display: 'grid',
  gap: vars.space.lg,

  '@media': {
    [`(min-width: ${breakpoints.tablet})`]: {
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    },
  },
})

export const metric = style({
  display: 'grid',
  gap: vars.space.xs,
  padding: vars.space.lg,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.md,
  background: vars.colors.surfaceElevated,
})

export const metricLabel = style({
  color: vars.colors.textSubtle,
  fontSize: vars.fontSize.xs,
  fontWeight: 700,
  textTransform: 'uppercase',
})

export const metricValue = style({
  color: vars.colors.text,
  fontSize: vars.fontSize.xl,
  fontWeight: 700,
})

export const positive = style({
  color: vars.colors.positive,
})

export const negative = style({
  color: vars.colors.negative,
})

export const actions = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: vars.space.sm,

  '@media': {
    [`(min-width: ${breakpoints.mobile})`]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
  },
})

export const button = style({
  minHeight: '44px',
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.sm,
  background: vars.colors.surfaceElevated,
  color: vars.colors.text,
  cursor: 'pointer',
  fontSize: vars.fontSize.sm,
  fontWeight: 700,
  padding: `${vars.space.sm} ${vars.space.lg}`,

  ':disabled': {
    color: vars.colors.textMuted,
    cursor: 'not-allowed',
  },
})

export const selectedButton = style({
  borderColor: vars.colors.primary,
  background: vars.colors.primarySoft,
  color: vars.colors.primary,
})

export const status = style({
  padding: vars.space.xl,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.md,
  background: vars.colors.surface,
  color: vars.colors.textMuted,
  lineHeight: 1.5,
})

export const errorStatus = style([
  status,
  {
    borderColor: vars.colors.negative,
    background: vars.colors.negativeSoft,
    color: vars.colors.negative,
  },
])
