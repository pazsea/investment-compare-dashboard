import { style } from '@vanilla-extract/css'

import { breakpoints, vars } from '../../styles/theme.css'

export const shell = style({
  minHeight: '100vh',
})

export const header = style({
  position: 'sticky',
  top: 0,
  zIndex: 1,
  borderBottom: `1px solid ${vars.colors.border}`,
  background: vars.colors.surface,
  boxShadow: vars.shadow.sm,
})

export const nav = style({
  display: 'grid',
  width: '100%',
  maxWidth: '1180px',
  margin: '0 auto',
  gap: vars.space.md,
  padding: vars.space.lg,

  '@media': {
    [`(min-width: ${breakpoints.tablet})`]: {
      gridTemplateColumns: 'auto minmax(260px, 420px) 1fr auto',
      alignItems: 'center',
    },
  },
})

export const search = style({
  width: '100%',
})

export const brand = style({
  display: 'inline-flex',
  alignItems: 'center',
  color: vars.colors.text,
  textDecoration: 'none',
})

export const links = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: vars.space.sm,

  '@media': {
    [`(min-width: ${breakpoints.tablet})`]: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  },
})

export const link = style({
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: vars.radii.sm,
  color: vars.colors.textMuted,
  fontSize: vars.fontSize.sm,
  fontWeight: 700,
  padding: `${vars.space.sm} ${vars.space.md}`,
  textDecoration: 'none',

  '@media': {
    [`(min-width: ${breakpoints.tablet})`]: {
      justifyContent: 'flex-start',
    },
  },
})

export const themeButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space.sm,
  minHeight: '44px',
  width: '100%',
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.sm,
  background: vars.colors.surfaceElevated,
  color: vars.colors.text,
  cursor: 'pointer',
  fontSize: vars.fontSize.sm,
  fontWeight: 700,
  padding: `${vars.space.sm} ${vars.space.lg}`,
  transition: 'border-color 180ms ease, background-color 180ms ease, color 180ms ease',

  ':hover': {
    borderColor: vars.colors.borderStrong,
  },

  '@media': {
    [`(min-width: ${breakpoints.tablet})`]: {
      width: 'auto',
    },
  },
})

export const themeIcon = style({
  flexShrink: 0,
  width: '16px',
  height: '16px',
})
