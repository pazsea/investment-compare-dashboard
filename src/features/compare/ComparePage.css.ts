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

export const header = style({
  display: 'grid',
  gap: vars.space.md,
})

export const eyebrow = style({
  margin: 0,
  color: vars.colors.primary,
  fontSize: vars.fontSize.sm,
  fontWeight: 700,
  textTransform: 'uppercase',
})

export const title = style({
  margin: 0,
  color: vars.colors.text,
  fontSize: vars.fontSize.xxl,
  lineHeight: 1.15,
})

export const summary = style({
  maxWidth: '720px',
  margin: 0,
  color: vars.colors.textMuted,
  fontSize: vars.fontSize.md,
  lineHeight: 1.6,
})

export const toolbar = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.space.md,
})

export const count = style({
  color: vars.colors.textMuted,
  fontSize: vars.fontSize.sm,
})

export const button = style({
  minHeight: '44px',
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.sm,
  background: vars.colors.surface,
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

export const card = style({
  display: 'grid',
  gap: vars.space.lg,
  padding: vars.space.lg,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.md,
  background: vars.colors.surface,
  boxShadow: vars.shadow.sm,
})

export const cardHeader = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: vars.space.md,
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
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: vars.space.md,
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
