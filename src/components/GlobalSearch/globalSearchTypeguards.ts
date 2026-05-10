import { isNode, isRecord } from '../../utils/sharedTypeguards'
import { isInstrumentType } from '../../utils/typeguards'
import type { SearchHistoryItem } from './globalSearchTypes'

export const isSearchHistoryItem = (value: unknown): value is SearchHistoryItem => {
  if (!isRecord(value)) {
    return false
  }

  return (
    typeof value.symbol === 'string' &&
    typeof value.name === 'string' &&
    isInstrumentType(value.type)
  )
}

export const isSearchInteractionTarget = (value: unknown): value is Node => {
  return isNode(value)
}
