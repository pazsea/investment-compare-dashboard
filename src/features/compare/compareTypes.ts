import type { Instrument, InstrumentMarketCapPoint, InstrumentProfile } from '../../types/instrument'

export type CompareMetricEntry = {
  instrument: Instrument
  marketCapHistory: InstrumentMarketCapPoint[]
  monthlyChangePercentage?: number
  profile?: InstrumentProfile
}
