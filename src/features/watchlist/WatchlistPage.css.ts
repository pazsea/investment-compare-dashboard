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

export const emptyState = style({
  padding: vars.space.xl,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.md,
  background: vars.colors.surface,
  color: vars.colors.textMuted,
  lineHeight: 1.5,
})

export const grid = style({
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
