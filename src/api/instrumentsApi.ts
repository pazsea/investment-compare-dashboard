import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { FMP_API_KEY, FMP_BASE_URL, shouldUseFmpApi } from './config'
import { parseFmpQuoteResponse, parseFmpSearchResponse } from './fmpGuards'
import {
  isInstrument,
  isInstrumentQuote,
  mapQuoteToInstrumentQuote,
  mapSearchResultToInstrument,
} from './fmpMappers'
import { mergeSearchResults } from './fmpUtils'
import { findMockQuote, searchMockInstruments } from '../mocks/instruments'
import type { Instrument, InstrumentQuote } from '../types/instrument'

const baseQuery = fetchBaseQuery({
  baseUrl: FMP_BASE_URL,
})

const withApiKey = (params: Record<string, string>) => ({
  ...params,
  apikey: FMP_API_KEY,
})

const getFallbackSearch = (query: string) => ({ data: searchMockInstruments(query) })

const getFallbackQuote = (symbol: string) => ({ data: findMockQuote(symbol) })

export const instrumentsApi = createApi({
  reducerPath: 'instrumentsApi',
  baseQuery,
  endpoints: (builder) => ({
    searchInstruments: builder.query<Instrument[], string>({
      async queryFn(query, _api, _extraOptions, fetchWithBaseQuery) {
        const normalizedQuery = query.trim()

        if (!normalizedQuery) {
          return { data: [] }
        }

        if (!shouldUseFmpApi) {
          return getFallbackSearch(normalizedQuery)
        }

        const result = await fetchWithBaseQuery({
          url: '/stable/search-symbol',
          params: withApiKey({ query: normalizedQuery }),
        })
        const nameResult = await fetchWithBaseQuery({
          url: '/stable/search-name',
          params: withApiKey({ query: normalizedQuery }),
        })

        if (result.error && nameResult.error) {
          return getFallbackSearch(normalizedQuery)
        }

        const symbolResults = parseFmpSearchResponse(result.data)
        const nameResults = parseFmpSearchResponse(nameResult.data)
        const rawResults = mergeSearchResults(symbolResults, nameResults)

        return {
          data: rawResults.map(mapSearchResultToInstrument).filter(isInstrument),
        }
      },
    }),
    getInstrumentQuote: builder.query<InstrumentQuote | undefined, string>({
      async queryFn(symbol, _api, _extraOptions, fetchWithBaseQuery) {
        const normalizedSymbol = symbol.trim().toUpperCase()

        if (!normalizedSymbol) {
          return { data: undefined }
        }

        if (!shouldUseFmpApi) {
          return getFallbackQuote(normalizedSymbol)
        }

        const result = await fetchWithBaseQuery({
          url: '/stable/quote',
          params: withApiKey({ symbol: normalizedSymbol }),
        })

        if (result.error) {
          return getFallbackQuote(normalizedSymbol)
        }

        const rawQuotes = parseFmpQuoteResponse(result.data)

        return {
          data: rawQuotes.map(mapQuoteToInstrumentQuote).find(isInstrumentQuote),
        }
      },
    }),
  }),
})

export const { useSearchInstrumentsQuery, useGetInstrumentQuoteQuery } = instrumentsApi
