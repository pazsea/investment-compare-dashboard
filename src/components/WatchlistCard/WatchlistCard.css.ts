import { style } from '@vanilla-extract/css'

import { breakpoints, vars } from '../../styles/theme.css'

export const card = style({
  position: 'relative',
  display: 'grid',
  gap: vars.space.lg,
  padding: vars.space.lg,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.md,
  background: vars.colors.surface,
  boxShadow: vars.shadow.sm,
})

export const stretchedLink = style({
  position: 'absolute',
  inset: 0,
  zIndex: 0,
  borderRadius: vars.radii.md,
})

export const cardHeader = style({
  position: 'relative',
  zIndex: 1,
  display: 'grid',
  gap: vars.space.sm,
})

export const symbol = style({
  color: vars.colors.primary,
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.sm,
  fontWeight: 700,
})

export const instrumentName = style({
  margin: 0,
  color: vars.colors.text,
  fontSize: vars.fontSize.lg,
  lineHeight: 1.3,
})

export const meta = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space.sm,
  color: vars.colors.textMuted,
  fontSize: vars.fontSize.sm,
})

export const quotePanel = style({
  position: 'relative',
  zIndex: 1,
  display: 'grid',
  gap: vars.space.md,
  padding: vars.space.md,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.sm,
  background: vars.colors.surfaceElevated,

  '@media': {
    [`(min-width: ${breakpoints.mobile})`]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
  },
})

export const quoteLabel = style({
  display: 'block',
  color: vars.colors.textSubtle,
  fontSize: vars.fontSize.xs,
  fontWeight: 700,
  textTransform: 'uppercase',
})

export const quoteValue = style({
  margin: `${vars.space.xs} 0 0`,
  color: vars.colors.text,
  fontSize: vars.fontSize.lg,
  fontWeight: 700,
})

export const quoteChange = style({
  margin: `${vars.space.xs} 0 0`,
  color: vars.colors.text,
  fontSize: vars.fontSize.md,
  fontWeight: 700,
})

export const positive = style({
  color: vars.colors.positive,
})

export const negative = style({
  color: vars.colors.negative,
})

export const detailGrid = style({
  position: 'relative',
  zIndex: 1,
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
  display: 'block',
  marginTop: vars.space.xs,
  color: vars.colors.text,
  fontSize: vars.fontSize.sm,
})

export const actions = style({
  position: 'relative',
  zIndex: 1,
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
  padding: `${vars.space.sm} ${vars.space.md}`,

  ':disabled': {
    color: vars.colors.textMuted,
    cursor: 'not-allowed',
  },
})

export const actionLink = style([
  button,
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
  },
])

export const removeButton = style([
  button,
  {
    color: vars.colors.negative,
  },
])
