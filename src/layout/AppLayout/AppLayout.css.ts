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

export const themeToggle = style({
  display: 'inline-grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  width: '100%',
  gap: vars.space.xs,
  padding: vars.space.xs,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.full,
  background: vars.colors.surfaceElevated,

  '@media': {
    [`(min-width: ${breakpoints.tablet})`]: {
      width: 'auto',
    },
  },
})

export const themeOption = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '36px',
  minWidth: '36px',
  border: 0,
  borderRadius: vars.radii.full,
  background: 'transparent',
  color: vars.colors.textSubtle,
  cursor: 'pointer',
  transition: 'border-color 180ms ease, background-color 180ms ease, color 180ms ease',

  ':hover': {
    color: vars.colors.text,
  },
})

export const activeThemeOption = style([
  themeOption,
  {
    background: vars.colors.surface,
    color: vars.colors.primary,
    boxShadow: vars.shadow.sm,
  },
])

export const themeIcon = style({
  flexShrink: 0,
  width: '16px',
  height: '16px',
})
