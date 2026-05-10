export const isRecord = (value: unknown): value is Record<string, unknown> => {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

export const isNode = (value: unknown): value is Node => {
  return value instanceof Node
}
