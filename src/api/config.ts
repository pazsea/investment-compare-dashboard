export const FMP_API_KEY = import.meta.env.VITE_FMP_API_KEY
export const FMP_BASE_URL = 'https://financialmodelingprep.com'

export const hasFmpApiKey = Boolean(FMP_API_KEY?.trim())
