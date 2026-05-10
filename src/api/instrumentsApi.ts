import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { FMP_API_KEY, FMP_BASE_URL, hasFmpApiKey } from './config'
import { findMockQuote, searchMockInstruments } from '../mocks/instruments'
import type { Instrument, InstrumentQuote } from '../types/instrument'

export type FmpSearchInstrumentResponse = {
  symbol?: string
  name?: string
  currency?: string
  exchange?: string
  exchangeFullName?: string
  stockExchange?: string
}

export type FmpQuoteResponse = {
  symbol?: string
  name?: string
  price?: number
  change?: number
  changePercentage?: number
  changesPercentage?: number
  currency?: string
  exchange?: string
}

const baseQuery = fetchBaseQuery({
  baseUrl: FMP_BASE_URL,
})

const withApiKey = (params: Record<string, string>) => ({
  ...params,
  apikey: FMP_API_KEY,
})

const mapSearchResultToInstrument = (result: FmpSearchInstrumentResponse): Instrument | undefined => {
  if (!result.symbol || !result.name) {
    return undefined
  }

  const exchange = result.exchange ?? result.exchangeFullName ?? result.stockExchange

  return {
    type: inferInstrumentType(result.symbol, result.name),
    symbol: result.symbol,
    name: result.name,
    currency: result.currency,
    exchange,
  }
}

const mapQuoteToInstrumentQuote = (quote: FmpQuoteResponse): InstrumentQuote | undefined => {
  if (!quote.symbol || !quote.name || quote.price === undefined) {
    return undefined
  }

  return {
    symbol: quote.symbol,
    name: quote.name,
    price: quote.price,
    change: quote.change ?? 0,
    changesPercentage: quote.changesPercentage ?? quote.changePercentage ?? 0,
    currency: quote.currency,
    exchange: quote.exchange,
  }
}

const inferInstrumentType = (symbol: string, name: string): Instrument['type'] => {
  const normalizedSymbol = symbol.toUpperCase()
  const normalizedName = name.toLowerCase()

  if (normalizedSymbol.endsWith('USD') && !normalizedSymbol.includes('.')) {
    return 'crypto'
  }

  if (normalizedName.includes(' etf') || normalizedName.includes('exchange traded fund')) {
    return 'etf'
  }

  if (normalizedName.includes('fund')) {
    return 'fund'
  }

  return 'stock'
}

const getFallbackSearch = (query: string) => ({ data: searchMockInstruments(query) })

const getFallbackQuote = (symbol: string) => ({ data: findMockQuote(symbol) })

export const instrumentsApi = createApi({
  reducerPath: 'instrumentsApi',
  baseQuery: baseQuery as BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
  endpoints: (builder) => ({
    searchInstruments: builder.query<Instrument[], string>({
      async queryFn(query, _api, _extraOptions, fetchWithBaseQuery) {
        const normalizedQuery = query.trim()

        if (!normalizedQuery) {
          return { data: [] }
        }

        if (!hasFmpApiKey) {
          return getFallbackSearch(normalizedQuery)
        }

        const result = await fetchWithBaseQuery({
          url: '/stable/search-symbol',
          params: withApiKey({ query: normalizedQuery }),
        })

        if (result.error) {
          return getFallbackSearch(normalizedQuery)
        }

        const rawResults = Array.isArray(result.data)
          ? (result.data as FmpSearchInstrumentResponse[])
          : []

        return {
          data: rawResults
            .map(mapSearchResultToInstrument)
            .filter((instrument): instrument is Instrument => Boolean(instrument)),
        }
      },
    }),
    getInstrumentQuote: builder.query<InstrumentQuote | undefined, string>({
      async queryFn(symbol, _api, _extraOptions, fetchWithBaseQuery) {
        const normalizedSymbol = symbol.trim().toUpperCase()

        if (!normalizedSymbol) {
          return { data: undefined }
        }

        if (!hasFmpApiKey) {
          return getFallbackQuote(normalizedSymbol)
        }

        const result = await fetchWithBaseQuery({
          url: '/stable/quote',
          params: withApiKey({ symbol: normalizedSymbol }),
        })

        if (result.error) {
          return getFallbackQuote(normalizedSymbol)
        }

        const rawQuotes = Array.isArray(result.data) ? (result.data as FmpQuoteResponse[]) : []

        return {
          data: rawQuotes.map(mapQuoteToInstrumentQuote).find(Boolean),
        }
      },
    }),
  }),
})

export const { useSearchInstrumentsQuery, useGetInstrumentQuoteQuery } = instrumentsApi
