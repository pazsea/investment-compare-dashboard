import { style } from '@vanilla-extract/css'

import { breakpoints, vars } from '../../styles/theme.css'

export const page = style({
  minHeight: '100vh',
  padding: vars.space.lg,
})

export const shell = style({
  display: 'grid',
  width: '100%',
  maxWidth: '980px',
  margin: '0 auto',
  gap: vars.space.xl,
  paddingTop: vars.space.xl,
})

export const panel = style({
  display: 'grid',
  gap: vars.space.xl,
  padding: vars.space.lg,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.md,
  background: vars.colors.surface,
  boxShadow: vars.shadow.md,

  '@media': {
    [`(min-width: ${breakpoints.tablet})`]: {
      padding: vars.space.xl,
    },
  },
})

export const hero = style({
  display: 'grid',
  gap: vars.space.lg,
})

export const heroHeader = style({
  display: 'grid',
  gap: vars.space.lg,

  '@media': {
    [`(min-width: ${breakpoints.tablet})`]: {
      gridTemplateColumns: 'minmax(0, 1fr) auto',
      alignItems: 'start',
    },
  },
})

export const header = style({
  display: 'grid',
  gap: vars.space.md,
})

export const symbol = style({
  color: vars.colors.primary,
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.sm,
  fontWeight: 700,
})

export const title = style({
  margin: 0,
  color: vars.colors.text,
  fontSize: vars.fontSize.xxl,
  lineHeight: 1.15,
})

export const meta = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space.sm,
})

export const badge = style({
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: '28px',
  borderRadius: vars.radii.full,
  background: vars.colors.surfaceElevated,
  color: vars.colors.textMuted,
  fontSize: vars.fontSize.xs,
  fontWeight: 700,
  padding: `${vars.space.xs} ${vars.space.sm}`,
})

export const heroMetrics = style({
  display: 'grid',
  gap: vars.space.xs,
})

export const heroPrice = style({
  color: vars.colors.text,
  fontSize: vars.fontSize.xxl,
  fontWeight: 800,
  lineHeight: 1.1,
})

export const heroPriceFallback = style({
  color: vars.colors.text,
  fontSize: vars.fontSize.xl,
  fontWeight: 700,
  lineHeight: 1.2,
})

export const heroChange = style({
  fontSize: vars.fontSize.md,
  fontWeight: 700,
})

export const heroCaption = style({
  color: vars.colors.textSubtle,
  fontSize: vars.fontSize.sm,
})

export const chartPanel = style({
  display: 'grid',
  gap: vars.space.lg,
  padding: vars.space.lg,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.md,
  background: vars.colors.surfaceElevated,
})

export const sectionHeader = style({
  display: 'grid',
  gap: vars.space.sm,

  '@media': {
    [`(min-width: ${breakpoints.tablet})`]: {
      gridTemplateColumns: 'minmax(0, 1fr) auto',
      alignItems: 'center',
    },
  },
})

export const sectionTitle = style({
  margin: 0,
  color: vars.colors.text,
  fontSize: vars.fontSize.lg,
})

export const sectionSummary = style({
  margin: 0,
  color: vars.colors.textMuted,
  fontSize: vars.fontSize.sm,
  lineHeight: 1.5,
})

export const chartSummary = style({
  display: 'grid',
  gap: vars.space.xs,
})

export const chartSummaryLabel = style({
  color: vars.colors.textSubtle,
  fontSize: vars.fontSize.xs,
  fontWeight: 700,
  textTransform: 'uppercase',
})

export const chartSummaryValue = style({
  color: vars.colors.text,
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.sm,
  fontWeight: 700,
})

export const chartCanvas = style({
  width: '100%',
  height: '220px',
})

export const priceGrid = style({
  display: 'grid',
  gap: vars.space.lg,

  '@media': {
    [`(min-width: ${breakpoints.tablet})`]: {
      gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    },
  },
})

export const metric = style({
  display: 'grid',
  gap: vars.space.xs,
  padding: vars.space.lg,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.md,
  background: vars.colors.surfaceElevated,
})

export const metricLabel = style({
  color: vars.colors.textSubtle,
  fontSize: vars.fontSize.xs,
  fontWeight: 700,
  textTransform: 'uppercase',
})

export const metricValue = style({
  color: vars.colors.text,
  fontSize: vars.fontSize.xl,
  fontWeight: 700,
})

export const metricValueSmall = style({
  color: vars.colors.text,
  fontSize: vars.fontSize.md,
  fontWeight: 700,
  lineHeight: 1.5,
})

export const positive = style({
  color: vars.colors.positive,
})

export const negative = style({
  color: vars.colors.negative,
})

export const actions = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: vars.space.sm,

  '@media': {
    [`(min-width: ${breakpoints.mobile})`]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
  },
})

export const button = style({
  minHeight: '44px',
  width: '100%',
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.sm,
  background: vars.colors.surfaceElevated,
  color: vars.colors.text,
  cursor: 'pointer',
  fontSize: vars.fontSize.sm,
  fontWeight: 700,
  padding: `${vars.space.sm} ${vars.space.lg}`,

  ':disabled': {
    color: vars.colors.textMuted,
    cursor: 'not-allowed',
  },

  '@media': {
    [`(min-width: ${breakpoints.mobile})`]: {
      width: 'auto',
    },
  },
})

export const selectedButton = style({
  borderColor: vars.colors.primary,
  background: vars.colors.primarySoft,
  color: vars.colors.primary,
})

export const actionLink = style([
  button,
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
  },
])

export const aboutPanel = style({
  display: 'grid',
  gap: vars.space.md,
  padding: vars.space.lg,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.md,
  background: vars.colors.surfaceElevated,
})

export const aboutLayout = style({
  display: 'grid',
  gap: vars.space.lg,

  '@media': {
    [`(min-width: ${breakpoints.tablet})`]: {
      gridTemplateColumns: 'minmax(0, 1fr) 220px',
      alignItems: 'start',
    },
  },
})

export const profileMeta = style({
  display: 'grid',
  gap: vars.space.md,
})

export const companyCard = style({
  display: 'grid',
  gap: vars.space.md,
  padding: vars.space.lg,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.md,
  background: vars.colors.surface,
})

export const companyMark = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.md,
})

export const companyImage = style({
  width: '48px',
  height: '48px',
  borderRadius: vars.radii.sm,
  objectFit: 'contain',
  background: vars.colors.surfaceElevated,
  padding: vars.space.xs,
})

export const companyInfo = style({
  display: 'grid',
  gap: vars.space.xs,
})

export const companyName = style({
  margin: 0,
  color: vars.colors.text,
  fontSize: vars.fontSize.md,
  fontWeight: 700,
})

export const companySubline = style({
  color: vars.colors.textMuted,
  fontSize: vars.fontSize.sm,
})

export const profileGrid = style({
  display: 'grid',
  gap: vars.space.md,

  '@media': {
    [`(min-width: ${breakpoints.mobile})`]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
  },
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
