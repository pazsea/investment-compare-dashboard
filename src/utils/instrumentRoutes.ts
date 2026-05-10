export const getInstrumentDetailsPath = (symbol: string) => {
  return `/instrument/${encodeURIComponent(symbol)}`
}
