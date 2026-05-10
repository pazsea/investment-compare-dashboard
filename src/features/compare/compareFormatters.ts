export const formatSekCurrency = (value: number) => {
  return new Intl.NumberFormat('sv-SE', {
    currency: 'SEK',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(value)
}

export const formatRoundedChartTick = (value: unknown) => {
  return String(Math.round(Number(value)))
}
