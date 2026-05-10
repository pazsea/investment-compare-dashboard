import { style } from '@vanilla-extract/css'

import { vars } from '../../styles/theme.css'

export const root = style({
  display: 'grid',
  gap: vars.space.sm,
})

export const text = style({
  margin: 0,
  color: vars.colors.textMuted,
  fontSize: vars.fontSize.md,
  lineHeight: 1.7,
})

export const clamped = style({
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 5,
})

export const button = style({
  width: 'fit-content',
  minHeight: '44px',
  border: 'none',
  background: 'transparent',
  color: vars.colors.primary,
  cursor: 'pointer',
  fontSize: vars.fontSize.sm,
  fontWeight: 700,
  padding: 0,
})
