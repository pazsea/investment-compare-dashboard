import type { FmpProfileResponse, FmpSearchInstrumentResponse } from './fmpTypes'
import { isRecord } from '../utils/sharedTypeguards'

const isOptionalString = (value: unknown) => {
  return value === undefined || typeof value === 'string'
}

const isNullableOptionalString = (value: unknown) => {
  return value === null || isOptionalString(value)
}

const isOptionalNumber = (value: unknown) => {
  return value === undefined || typeof value === 'number'
}

const isNullableOptionalNumber = (value: unknown) => {
  return value === null || isOptionalNumber(value)
}

const isOptionalBoolean = (value: unknown) => {
  return value === undefined || typeof value === 'boolean'
}

const isNullableOptionalBoolean = (value: unknown) => {
  return value === null || isOptionalBoolean(value)
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
    isNullableOptionalString(value.symbol) &&
    isNullableOptionalNumber(value.price) &&
    isNullableOptionalNumber(value.marketCap) &&
    isNullableOptionalString(value.companyName) &&
    isNullableOptionalString(value.currency) &&
    isNullableOptionalString(value.exchangeFullName) &&
    isNullableOptionalString(value.exchange) &&
    isNullableOptionalString(value.industry) &&
    isNullableOptionalString(value.website) &&
    isNullableOptionalString(value.description) &&
    isNullableOptionalString(value.ceo) &&
    isNullableOptionalString(value.sector) &&
    isNullableOptionalString(value.country) &&
    isNullableOptionalString(value.fullTimeEmployees) &&
    isNullableOptionalString(value.city) &&
    isNullableOptionalString(value.state) &&
    isNullableOptionalString(value.image) &&
    isNullableOptionalBoolean(value.isEtf) &&
    isNullableOptionalBoolean(value.isFund) &&
    isNullableOptionalNumber(value.volume) &&
    isNullableOptionalNumber(value.change) &&
    isNullableOptionalNumber(value.changePercentage)
  )
}

export const parseFmpSearchResponse = (value: unknown): FmpSearchInstrumentResponse[] => {
  return Array.isArray(value) ? value.filter(isFmpSearchInstrumentResponse) : []
}

export const parseFmpProfileResponse = (value: unknown): FmpProfileResponse[] => {
  return Array.isArray(value) ? value.filter(isFmpProfileResponse) : []
}
