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
})

export const header = style({
  display: 'grid',
  gap: vars.space.sm,
  paddingTop: vars.space.xl,
})

export const eyebrow = style({
  margin: 0,
  color: vars.colors.primary,
  fontSize: vars.fontSize.sm,
  fontWeight: 700,
  textTransform: 'uppercase',
})

export const title = style({
  maxWidth: '760px',
  margin: 0,
  color: vars.colors.text,
  fontSize: vars.fontSize.xxl,
  lineHeight: 1.15,
})

export const summary = style({
  maxWidth: '680px',
  margin: 0,
  color: vars.colors.textMuted,
  fontSize: vars.fontSize.md,
  lineHeight: 1.6,
})

export const searchPanel = style({
  display: 'grid',
  gap: vars.space.sm,
  padding: vars.space.lg,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.md,
  background: vars.colors.surface,
  boxShadow: vars.shadow.md,
})

export const label = style({
  color: vars.colors.text,
  fontSize: vars.fontSize.sm,
  fontWeight: 700,
})

export const input = style({
  minHeight: '48px',
  width: '100%',
  border: `1px solid ${vars.colors.borderStrong}`,
  borderRadius: vars.radii.sm,
  background: vars.colors.surfaceElevated,
  color: vars.colors.text,
  fontSize: vars.fontSize.md,
  padding: `${vars.space.md} ${vars.space.lg}`,

  '::placeholder': {
    color: vars.colors.textSubtle,
  },
})

export const helper = style({
  minHeight: '20px',
  margin: 0,
  color: vars.colors.textSubtle,
  fontSize: vars.fontSize.sm,
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

export const resultsHeader = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.space.md,
})

export const resultsTitle = style({
  margin: 0,
  color: vars.colors.text,
  fontSize: vars.fontSize.lg,
})

export const resultCount = style({
  color: vars.colors.textMuted,
  fontSize: vars.fontSize.sm,
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
