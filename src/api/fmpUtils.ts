import type { FmpSearchInstrumentResponse } from './fmpTypes'

export const mergeSearchResults = (
  firstResults: FmpSearchInstrumentResponse[],
  secondResults: FmpSearchInstrumentResponse[],
) => {
  const mergedResults = [...firstResults, ...secondResults]
  const uniqueResults = new Map<string, FmpSearchInstrumentResponse>()

  mergedResults.forEach((result) => {
    if (result.symbol) {
      uniqueResults.set(result.symbol, result)
    }
  })

  return Array.from(uniqueResults.values())
}
