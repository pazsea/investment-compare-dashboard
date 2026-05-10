import { globalStyle } from '@vanilla-extract/css'

import { vars } from './theme.css'

globalStyle('*', {
  boxSizing: 'border-box',
})

globalStyle('*::before', {
  boxSizing: 'border-box',
})

globalStyle('*::after', {
  boxSizing: 'border-box',
})

globalStyle('html, body, #root', {
  minHeight: '100%',
  width: '100%',
})

globalStyle('body', {
  margin: 0,
  background: vars.colors.background,
  color: vars.colors.text,
  fontFamily: vars.font.body,
  fontSize: vars.fontSize.md,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
})

globalStyle('#root', {
  minHeight: '100vh',
})

globalStyle('button', {
  font: 'inherit',
})

globalStyle('a', {
  color: 'inherit',
})

globalStyle(':focus-visible', {
  outline: `3px solid ${vars.colors.focus}`,
  outlineOffset: '3px',
})
