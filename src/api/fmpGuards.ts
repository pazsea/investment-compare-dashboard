import type { FmpProfileResponse, FmpSearchInstrumentResponse } from './fmpTypes'
import { isRecord } from '../utils/sharedTypeguards'

const isOptionalString = (value: unknown) => {
  return value === undefined || typeof value === 'string'
}

const isOptionalNumber = (value: unknown) => {
  return value === undefined || typeof value === 'number'
}

const isOptionalBoolean = (value: unknown) => {
  return value === undefined || typeof value === 'boolean'
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
    isOptionalString(value.exchangeShortName) &&
    isOptionalString(value.exchangeFullName) &&
    isOptionalString(value.stockExchange)
  )
}

export const isFmpProfileResponse = (value: unknown): value is FmpProfileResponse => {
  if (!isRecord(value)) {
    return false
  }

  return (
    isOptionalString(value.symbol) &&
    isOptionalNumber(value.price) &&
    isOptionalNumber(value.marketCap) &&
    isOptionalString(value.companyName) &&
    isOptionalString(value.currency) &&
    isOptionalString(value.exchangeFullName) &&
    isOptionalString(value.exchange) &&
    isOptionalString(value.industry) &&
    isOptionalString(value.website) &&
    isOptionalString(value.description) &&
    isOptionalString(value.ceo) &&
    isOptionalString(value.sector) &&
    isOptionalString(value.country) &&
    isOptionalString(value.fullTimeEmployees) &&
    isOptionalString(value.city) &&
    isOptionalString(value.state) &&
    isOptionalString(value.image) &&
    isOptionalBoolean(value.isEtf) &&
    isOptionalBoolean(value.isFund) &&
    isOptionalNumber(value.volume) &&
    isOptionalNumber(value.change) &&
    isOptionalNumber(value.changePercentage)
  )
}

export const parseFmpSearchResponse = (value: unknown): FmpSearchInstrumentResponse[] => {
  return Array.isArray(value) ? value.filter(isFmpSearchInstrumentResponse) : []
}

export const parseFmpProfileResponse = (value: unknown): FmpProfileResponse[] => {
  return Array.isArray(value) ? value.filter(isFmpProfileResponse) : []
}
