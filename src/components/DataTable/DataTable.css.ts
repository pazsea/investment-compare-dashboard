import { style } from '@vanilla-extract/css'

import { vars } from '../../styles/theme.css'

export const wrapper = style({
  overflowX: 'auto',
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.md,
  background: vars.colors.surface,
  boxShadow: vars.shadow.sm,
})

export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
})

export const headerCell = style({
  padding: vars.space.lg,
  borderBottom: `1px solid ${vars.colors.border}`,
  background: vars.colors.surfaceElevated,
  color: vars.colors.textMuted,
  fontSize: vars.fontSize.sm,
  fontWeight: 700,
  textAlign: 'left',
})

export const cell = style({
  padding: vars.space.lg,
  borderBottom: `1px solid ${vars.colors.border}`,
  color: vars.colors.text,
  fontSize: vars.fontSize.sm,
  verticalAlign: 'middle',
})

export const row = style({
  background: vars.colors.surface,
})
