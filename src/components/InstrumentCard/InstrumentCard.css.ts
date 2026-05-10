import { style } from '@vanilla-extract/css'

import { breakpoints, vars } from '../../styles/theme.css'

export const card = style({
  display: 'flex',
  minHeight: '180px',
  flexDirection: 'column',
  justifyContent: 'space-between',
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

export const header = style({
  display: 'grid',
  gap: vars.space.sm,
})

export const symbolRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.space.md,
})

export const symbol = style({
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.sm,
  fontWeight: 700,
  color: vars.colors.primary,
})

export const type = style({
  minHeight: '28px',
  padding: `${vars.space.xs} ${vars.space.sm}`,
  borderRadius: vars.radii.full,
  background: vars.colors.primarySoft,
  color: vars.colors.primary,
  fontSize: vars.fontSize.xs,
  fontWeight: 700,
  textTransform: 'uppercase',
})

export const name = style({
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

export const actions = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
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

export const action = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '44px',
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.sm,
  background: vars.colors.surfaceElevated,
  color: vars.colors.text,
  cursor: 'pointer',
  fontSize: vars.fontSize.sm,
  fontWeight: 700,
  padding: `${vars.space.sm} ${vars.space.md}`,
  textAlign: 'center',
  textDecoration: 'none',
  transition: 'transform 180ms ease, border-color 180ms ease, background-color 180ms ease, color 180ms ease',

  ':hover': {
    borderColor: vars.colors.borderStrong,
    transform: 'translateY(-1px)',
  },

  ':disabled': {
    color: vars.colors.textMuted,
    cursor: 'not-allowed',
  },
})

export const button = style([action])

export const selectedButton = style({
  borderColor: vars.colors.primary,
  background: vars.colors.primarySoft,
  color: vars.colors.primary,
})
