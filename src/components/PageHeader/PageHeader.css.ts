import { style } from '@vanilla-extract/css'

import { vars } from '../../styles/theme.css'

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
