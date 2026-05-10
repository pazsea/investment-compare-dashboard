export const fmpApiKey = import.meta.env.VITE_FMP_API_KEY ?? ''

export const hasFmpApiKey = fmpApiKey.trim().length > 0
