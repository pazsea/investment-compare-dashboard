import { style } from '@vanilla-extract/css'

import { vars } from '../../styles/theme.css'

export const root = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space.md,
})

export const mark = style({
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  alignItems: 'end',
  gap: vars.space.xs,
  width: '32px',
  height: '32px',
  padding: vars.space.xs,
  borderRadius: vars.radii.md,
  background: vars.colors.primarySoft,
  boxShadow: vars.shadow.sm,
})

export const markBar = style({
  borderRadius: vars.radii.full,
  background: vars.colors.primary,
})

export const markBarShort = style([
  markBar,
  {
    height: '10px',
  },
])

export const markBarMedium = style([
  markBar,
  {
    height: '16px',
  },
])

export const markBarTall = style([
  markBar,
  {
    height: '22px',
  },
])

export const pulse = style({
  position: 'absolute',
  left: vars.space.xs,
  right: vars.space.xs,
  top: '15px',
  height: '2px',
  borderRadius: vars.radii.full,
  background: vars.colors.surface,
  opacity: 0.9,
})

export const copy = style({
  display: 'grid',
  gap: '2px',
})

export const name = style({
  color: vars.colors.text,
  fontSize: vars.fontSize.md,
  fontWeight: 800,
  lineHeight: 1.1,
})

export const tag = style({
  color: vars.colors.textSubtle,
  fontSize: vars.fontSize.xs,
  fontWeight: 700,
  letterSpacing: 0,
  textTransform: 'uppercase',
})
