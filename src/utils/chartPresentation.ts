export const formatRoundedChartTick = (value: unknown) => {
  return String(Math.round(Number(value)))
}

export const getRoundedChartDomainMin = (value: number) => {
  return Math.floor(value)
}

export const getRoundedChartDomainMax = (value: number) => {
  return Math.ceil(value)
}
