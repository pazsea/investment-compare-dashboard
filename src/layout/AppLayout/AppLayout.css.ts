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
      gridTemplateColumns: 'auto 1fr auto',
      alignItems: 'center',
    },
  },
})

export const brand = style({
  color: vars.colors.text,
  fontSize: vars.fontSize.lg,
  fontWeight: 800,
  textDecoration: 'none',
})

export const links = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space.sm,
})

export const link = style({
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: vars.radii.sm,
  color: vars.colors.textMuted,
  fontSize: vars.fontSize.sm,
  fontWeight: 700,
  padding: `${vars.space.sm} ${vars.space.md}`,
  textDecoration: 'none',
})

export const themeButton = style({
  minHeight: '44px',
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.sm,
  background: vars.colors.surfaceElevated,
  color: vars.colors.text,
  cursor: 'pointer',
  fontSize: vars.fontSize.sm,
  fontWeight: 700,
  padding: `${vars.space.sm} ${vars.space.lg}`,
})
