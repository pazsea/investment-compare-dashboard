import { style } from '@vanilla-extract/css'

import { vars } from '../../styles/theme.css'

export const container = style({
  display: 'grid',
  gap: vars.space.sm,
  padding: vars.space.xl,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.md,
  background: vars.colors.surface,
  color: vars.colors.textMuted,
  lineHeight: 1.5,
})

export const title = style({
  margin: 0,
  color: vars.colors.text,
  fontSize: vars.fontSize.lg,
})

export const message = style({
  margin: 0,
  color: vars.colors.textMuted,
  fontSize: vars.fontSize.md,
})
