export const FMP_API_KEY = import.meta.env.VITE_FMP_API_KEY
export const FMP_BASE_URL = 'https://financialmodelingprep.com'
export const USE_FMP_API = import.meta.env.VITE_USE_FMP_API === 'true'

export const hasFmpApiKey = Boolean(FMP_API_KEY?.trim())
export const shouldUseFmpApi = USE_FMP_API && hasFmpApiKey
