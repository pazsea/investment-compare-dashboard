import type { Instrument } from '../types/instrument'
import { isRecord } from './sharedTypeguards'
import { isInstrumentType } from './typeguards'

export const isStoredInstrument = (value: unknown): value is Instrument => {
  if (!isRecord(value)) {
    return false
  }

  return (
    typeof value.symbol === 'string' &&
    typeof value.name === 'string' &&
    isInstrumentType(value.type)
  )
}
