import type { Instrument } from '../../types/instrument'
import { isStoredInstrument } from '../../utils/storedInstrument'
import { isRecord } from '../../utils/sharedTypeguards'

export type DetailsLocationState = {
  instrument?: Instrument
}

export const isDetailsLocationState = (value: unknown): value is DetailsLocationState => {
  if (!isRecord(value)) {
    return false
  }

  return value.instrument === undefined || isStoredInstrument(value.instrument)
}
