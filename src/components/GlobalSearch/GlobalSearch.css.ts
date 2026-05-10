import { style } from '@vanilla-extract/css'

import { breakpoints, vars } from '../../styles/theme.css'

export const shell = style({
  position: 'relative',
  display: 'grid',
  gap: vars.space.sm,
})

export const trigger = style({
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  alignItems: 'center',
  gap: vars.space.sm,
  minHeight: '48px',
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.md,
  background: vars.colors.surfaceElevated,
  boxShadow: vars.shadow.sm,
  padding: `${vars.space.sm} ${vars.space.md}`,

  ':focus-within': {
    borderColor: vars.colors.focus,
  },
})

export const input = style({
  width: '100%',
  border: 0,
  background: 'transparent',
  color: vars.colors.text,
  fontFamily: vars.font.body,
  fontSize: vars.fontSize.md,
  outline: 'none',

  '::placeholder': {
    color: vars.colors.textSubtle,
  },
})

export const shortcut = style({
  display: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '28px',
  minWidth: '28px',
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.sm,
  background: vars.colors.surface,
  color: vars.colors.textSubtle,
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.xs,
  padding: `0 ${vars.space.sm}`,

  '@media': {
    [`(min-width: ${breakpoints.tablet})`]: {
      display: 'inline-flex',
    },
  },
})

export const panel = style({
  position: 'absolute',
  top: 'calc(100% + 8px)',
  left: 0,
  right: 0,
  zIndex: 3,
  display: 'grid',
  gap: vars.space.md,
  padding: vars.space.md,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.md,
  background: vars.colors.surface,
  boxShadow: vars.shadow.lg,
})

export const section = style({
  display: 'grid',
  gap: vars.space.xs,
})

export const sectionTitle = style({
  margin: 0,
  color: vars.colors.textSubtle,
  fontSize: vars.fontSize.xs,
  fontWeight: 700,
  textTransform: 'uppercase',
})

export const resultList = style({
  display: 'grid',
  gap: vars.space.xs,
})

export const resultButton = style({
  display: 'grid',
  gap: vars.space.xs,
  width: '100%',
  border: 0,
  borderRadius: vars.radii.sm,
  background: 'transparent',
  color: vars.colors.text,
  cursor: 'pointer',
  padding: vars.space.md,
  textAlign: 'left',
})

export const activeResult = style({
  background: vars.colors.primarySoft,
})

export const resultTopRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.space.sm,
})

export const resultName = style({
  color: vars.colors.text,
  fontSize: vars.fontSize.sm,
  fontWeight: 700,
})

export const resultMeta = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space.sm,
  color: vars.colors.textMuted,
  fontSize: vars.fontSize.xs,
})

export const resultBadge = style({
  color: vars.colors.primary,
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.xs,
  fontWeight: 700,
})

export const emptyText = style({
  margin: 0,
  color: vars.colors.textMuted,
  fontSize: vars.fontSize.sm,
  lineHeight: 1.5,
  padding: vars.space.sm,
})

export const skeletonList = style({
  display: 'grid',
  gap: vars.space.sm,
})

export const skeletonItem = style({
  display: 'grid',
  gap: vars.space.sm,
  padding: vars.space.md,
  borderRadius: vars.radii.sm,
  background: vars.colors.surfaceElevated,
})

export const skeletonBar = style({
  height: '12px',
  borderRadius: vars.radii.full,
  background: vars.colors.border,
})
