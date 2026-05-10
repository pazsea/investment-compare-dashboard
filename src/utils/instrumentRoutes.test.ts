import { describe, expect, it } from 'vitest'

import { getInstrumentDetailsPath } from './instrumentRoutes'

describe('when building instrument routes', () => {
  it('should encode symbols safely', () => {
    expect(getInstrumentDetailsPath('SAVE.ST')).toBe('/instrument/SAVE.ST')
    expect(getInstrumentDetailsPath('BRK B')).toBe('/instrument/BRK%20B')
  })
})
