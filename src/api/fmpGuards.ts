import type { FmpQuoteResponse, FmpSearchInstrumentResponse } from './fmpTypes'

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

const isOptionalString = (value: unknown) => {
  return value === undefined || typeof value === 'string'
}

const isOptionalNumber = (value: unknown) => {
  return value === undefined || typeof value === 'number'
}

export const isFmpSearchInstrumentResponse = (
  value: unknown,
): value is FmpSearchInstrumentResponse => {
  if (!isRecord(value)) {
    return false
  }

  return (
    isOptionalString(value.symbol) &&
    isOptionalString(value.name) &&
    isOptionalString(value.currency) &&
    isOptionalString(value.exchange) &&
    isOptionalString(value.exchangeFullName) &&
    isOptionalString(value.stockExchange)
  )
}

export const isFmpQuoteResponse = (value: unknown): value is FmpQuoteResponse => {
  if (!isRecord(value)) {
    return false
  }

  return (
    isOptionalString(value.symbol) &&
    isOptionalString(value.name) &&
    isOptionalNumber(value.price) &&
    isOptionalNumber(value.change) &&
    isOptionalNumber(value.changePercentage) &&
    isOptionalNumber(value.changesPercentage) &&
    isOptionalString(value.currency) &&
    isOptionalString(value.exchange)
  )
}

export const parseFmpSearchResponse = (value: unknown): FmpSearchInstrumentResponse[] => {
  return Array.isArray(value) ? value.filter(isFmpSearchInstrumentResponse) : []
}

export const parseFmpQuoteResponse = (value: unknown): FmpQuoteResponse[] => {
  return Array.isArray(value) ? value.filter(isFmpQuoteResponse) : []
}
