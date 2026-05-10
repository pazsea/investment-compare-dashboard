export const formatCurrencyValue = (value: number, currency = 'SEK') => {
  try {
    return new Intl.NumberFormat('sv-SE', {
      currency,
      maximumFractionDigits: 0,
      style: 'currency',
    }).format(value)
  } catch {
    return `${Math.round(value).toLocaleString('sv-SE')} ${currency}`
  }
}

export const formatRoundedChartTick = (value: unknown) => {
  return String(Math.round(Number(value)))
}

export const formatCompactCurrencyValue = (value: number, currency = 'SEK') => {
  try {
    return new Intl.NumberFormat('sv-SE', {
      currency,
      maximumFractionDigits: 1,
      notation: 'compact',
      style: 'currency',
    }).format(value)
  } catch {
    return `${Math.round(value).toLocaleString('sv-SE')} ${currency}`
  }
}

export const formatPercentChange = (value?: number) => {
  if (value === undefined) {
    return 'Saknas'
  }

  const prefix = value > 0 ? '+' : ''

  return `${prefix}${value.toFixed(2)}%`
}
