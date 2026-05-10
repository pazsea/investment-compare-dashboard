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

export const hero = style({
  display: 'grid',
  gap: vars.space.lg,
  padding: vars.space.xl,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.md,
  background: vars.colors.surface,
  boxShadow: vars.shadow.md,
  transition: 'box-shadow 180ms ease, border-color 180ms ease',

  '@media': {
    [`(min-width: ${breakpoints.desktop})`]: {
      gridTemplateColumns: 'minmax(0, 1fr) auto',
      alignItems: 'center',
    },
  },
})

export const heroCopy = style({
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

export const cta = style({
  display: 'inline-flex',
  minHeight: '44px',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: vars.radii.sm,
  background: vars.colors.primary,
  color: vars.colors.surface,
  fontSize: vars.fontSize.sm,
  fontWeight: 700,
  padding: `${vars.space.sm} ${vars.space.lg}`,
  textDecoration: 'none',
  transition: 'transform 180ms ease, background-color 180ms ease, box-shadow 180ms ease',

  ':hover': {
    transform: 'translateY(-1px)',
    background: vars.colors.primaryHover,
    boxShadow: vars.shadow.md,
  },
})

export const grid = style({
  display: 'grid',
  gap: vars.space.lg,

  '@media': {
    [`(min-width: ${breakpoints.desktop})`]: {
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    },
  },
})

export const panel = style({
  display: 'grid',
  alignContent: 'start',
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

export const panelHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.space.md,
})

export const panelTitle = style({
  margin: 0,
  color: vars.colors.text,
  fontSize: vars.fontSize.lg,
})

export const panelLink = style({
  color: vars.colors.primary,
  fontSize: vars.fontSize.sm,
  fontWeight: 700,
  textDecoration: 'none',
  transition: 'color 180ms ease',

  ':hover': {
    color: vars.colors.primaryHover,
  },
})

export const emptyText = style({
  margin: 0,
  color: vars.colors.textMuted,
  fontSize: vars.fontSize.sm,
  lineHeight: 1.5,
})

export const list = style({
  display: 'grid',
  gap: vars.space.md,
  margin: 0,
  padding: 0,
  listStyle: 'none',
})

export const item = style({
  display: 'grid',
  gap: vars.space.xs,
  padding: vars.space.md,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.sm,
  background: vars.colors.surfaceElevated,
  transition: 'transform 180ms ease, border-color 180ms ease, background-color 180ms ease',

  ':hover': {
    transform: 'translateY(-1px)',
    borderColor: vars.colors.borderStrong,
  },
})

export const itemLink = style({
  color: vars.colors.text,
  fontSize: vars.fontSize.md,
  fontWeight: 700,
  textDecoration: 'none',
  transition: 'color 180ms ease',

  ':hover': {
    color: vars.colors.primary,
  },
})

export const meta = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space.sm,
  color: vars.colors.textMuted,
  fontSize: vars.fontSize.sm,
})

export const popularSection = style({
  display: 'grid',
  gap: vars.space.lg,
})

export const popularGrid = style({
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
