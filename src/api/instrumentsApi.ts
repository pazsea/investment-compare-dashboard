import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { FMP_API_KEY, FMP_BASE_URL, shouldUseFmpApi } from './config'
import {
  parseFmpHistoricalMarketCapResponse,
  parseFmpProfileResponse,
  parseFmpSearchResponse,
} from './fmpGuards'
import {
  isInstrument,
  isInstrumentMarketCapPoint,
  isInstrumentProfile,
  mapHistoricalMarketCapToPoint,
  mapProfileToInstrumentProfile,
  mapSearchResultToInstrument,
} from './fmpMappers'
import { mergeSearchResults } from './fmpUtils'
import {
  findMockMarketCapHistory,
  findMockProfile,
  searchMockInstruments,
} from '../mocks/instruments'
import type {
  Instrument,
  InstrumentMarketCapPoint,
  InstrumentProfile,
} from '../types/instrument'

const baseQuery = fetchBaseQuery({
  baseUrl: FMP_BASE_URL,
})

const withApiKey = (params: Record<string, string>) => ({
  ...params,
  apikey: FMP_API_KEY,
})

const getFallbackSearch = (query: string) => ({ data: searchMockInstruments(query) })
const getFallbackProfile = (symbol: string) => ({ data: findMockProfile(symbol) })

const createHistoricalWindow = () => {
  const to = new Date()
  const from = new Date(to)
  from.setUTCMonth(from.getUTCMonth() - 1)

  return {
    from: from.toISOString().slice(0, 10),
    to: to.toISOString().slice(0, 10),
  }
}

const normalizeSymbols = (symbols: string[]) => {
  return Array.from(
    new Set(
      symbols
        .map((symbol) => symbol.trim().toUpperCase())
        .filter(Boolean),
    ),
  )
}

const hasInstrumentProfile = (
  entry: [string, InstrumentProfile | undefined],
): entry is [string, InstrumentProfile] => {
  return Boolean(entry[1])
}

const hasMarketCapHistory = (
  entry: [string, InstrumentMarketCapPoint[]],
) => {
  return entry[1].length > 0
}

const hasFetchedMarketCapHistory = (
  result:
    | {
        symbol: string
        error: unknown
      }
    | {
        symbol: string
        points: InstrumentMarketCapPoint[]
      },
): result is {
  symbol: string
  points: InstrumentMarketCapPoint[]
} => {
  return 'points' in result && result.points.length > 0
}

const getFallbackProfiles = (symbols: string[]) => {
  return {
    data: Object.fromEntries(
      symbols
        .map((symbol): [string, InstrumentProfile | undefined] => [symbol, findMockProfile(symbol)])
        .filter(hasInstrumentProfile),
    ),
  }
}

const getFallbackMarketCapHistory = (symbols: string[]) => {
  return {
    data: Object.fromEntries(
      symbols
        .map((symbol): [string, InstrumentMarketCapPoint[]] => [symbol, findMockMarketCapHistory(symbol)])
        .filter(hasMarketCapHistory),
    ),
  }
}

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
          return {
            error: result.error,
          }
        }

        const symbolResults = parseFmpSearchResponse(result.data)
        const nameResults = parseFmpSearchResponse(nameResult.data)
        const rawResults = mergeSearchResults(symbolResults, nameResults)

        return {
          data: rawResults.map(mapSearchResultToInstrument).filter(isInstrument),
        }
      },
    }),
    getInstrumentProfile: builder.query<InstrumentProfile | undefined, string>({
      async queryFn(symbol, _api, _extraOptions, fetchWithBaseQuery) {
        const normalizedSymbol = symbol.trim().toUpperCase()

        if (!normalizedSymbol) {
          return { data: undefined }
        }

        if (!shouldUseFmpApi) {
          return getFallbackProfile(normalizedSymbol)
        }

        const result = await fetchWithBaseQuery({
          url: '/stable/profile',
          params: withApiKey({ symbol: normalizedSymbol }),
        })

        if (result.error) {
          return {
            error: result.error,
          }
        }

        const rawProfiles = parseFmpProfileResponse(result.data)

        return {
          data: rawProfiles.map(mapProfileToInstrumentProfile).find(isInstrumentProfile),
        }
      },
    }),
    getInstrumentProfiles: builder.query<Record<string, InstrumentProfile>, string[]>({
      async queryFn(symbols, _api, _extraOptions, fetchWithBaseQuery) {
        const normalizedSymbols = normalizeSymbols(symbols)

        if (normalizedSymbols.length === 0) {
          return { data: {} }
        }

        if (!shouldUseFmpApi) {
          return getFallbackProfiles(normalizedSymbols)
        }

        const results = await Promise.all(
          normalizedSymbols.map(async (symbol) => {
            const result = await fetchWithBaseQuery({
              url: '/stable/profile',
              params: withApiKey({ symbol }),
            })

            if (result.error) {
              return { symbol, error: result.error }
            }

            const rawProfiles = parseFmpProfileResponse(result.data)
            const profile = rawProfiles.map(mapProfileToInstrumentProfile).find(isInstrumentProfile)

            return { symbol, profile }
          }),
        )

        const profileEntries = results
          .filter(
            (
              result,
            ): result is {
              symbol: string
              profile: InstrumentProfile
            } => Boolean('profile' in result && result.profile),
          )
          .map((result): [string, InstrumentProfile] => [result.symbol, result.profile])

        if (profileEntries.length === 0) {
          const failedResult = results.find((result) => 'error' in result)

          return {
            error: failedResult?.error ?? {
              status: 'CUSTOM_ERROR',
              error: 'Inga profiler kunde hämtas.',
            },
          }
        }

        return {
          data: Object.fromEntries(profileEntries),
        }
      },
    }),
    getInstrumentMarketCapHistory: builder.query<Record<string, InstrumentMarketCapPoint[]>, string[]>({
      async queryFn(symbols, _api, _extraOptions, fetchWithBaseQuery) {
        const normalizedSymbols = normalizeSymbols(symbols)

        if (normalizedSymbols.length === 0) {
          return { data: {} }
        }

        if (!shouldUseFmpApi) {
          return getFallbackMarketCapHistory(normalizedSymbols)
        }

        const historicalWindow = createHistoricalWindow()
        const results = await Promise.all(
          normalizedSymbols.map(async (symbol) => {
            const result = await fetchWithBaseQuery({
              url: '/stable/historical-market-capitalization',
              params: withApiKey({
                symbol,
                from: historicalWindow.from,
                to: historicalWindow.to,
              }),
            })

            if (result.error) {
              return { symbol, error: result.error }
            }

            const rawPoints = parseFmpHistoricalMarketCapResponse(result.data)
            const points = rawPoints
              .map(mapHistoricalMarketCapToPoint)
              .filter(isInstrumentMarketCapPoint)
              .sort((leftPoint, rightPoint) => leftPoint.date.localeCompare(rightPoint.date))

            return { symbol, points }
          }),
        )

        const historyEntries = results
          .filter(hasFetchedMarketCapHistory)
          .map((result): [string, InstrumentMarketCapPoint[]] => [result.symbol, result.points])

        if (historyEntries.length === 0) {
          const failedResult = results.find((result) => 'error' in result)

          return {
            error: failedResult?.error ?? {
              status: 'CUSTOM_ERROR',
              error: 'Ingen historik kunde hämtas.',
            },
          }
        }

        return {
          data: Object.fromEntries(historyEntries),
        }
      },
    }),
  }),
})

export const {
  useSearchInstrumentsQuery,
  useGetInstrumentProfileQuery,
  useGetInstrumentProfilesQuery,
  useGetInstrumentMarketCapHistoryQuery,
} = instrumentsApi
