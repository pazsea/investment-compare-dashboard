import { describe, expect, it } from 'vitest'

import { mockInstruments, mockProfiles } from '../../mocks/instruments'
import {
  getDetailsSeries,
  getInstrumentFocus,
  getInstrumentNarrative,
  getTrendLabel,
} from './detailsPerformance'

describe('when building details chart data', () => {
  it('should create a visible intraday series', () => {
    const series = getDetailsSeries(mockProfiles[0])

    expect(series).toHaveLength(6)
    expect(series[0]?.label).toBe('Öppning')
    expect(typeof series[0]?.price).toBe('number')
  })
})

describe('when describing instrument focus', () => {
  it('should explain the focus for stocks funds and crypto', () => {
    expect(getInstrumentFocus(mockInstruments[0])).toEqual({
      label: 'Sektor',
      value: 'Technology',
    })
    expect(getInstrumentFocus(mockInstruments[4])).toEqual({
      label: 'Kategori',
      value: 'Large Blend',
    })
    expect(getInstrumentFocus(mockInstruments[5])).toEqual({
      label: 'Nätverk',
      value: 'Digital tillgångsmarknad',
    })
  })
})

describe('when creating instrument narratives', () => {
  it('should return readable copy for different instrument types', () => {
    expect(getInstrumentNarrative(mockInstruments[0])).toContain('bolagseksponering')
    expect(getInstrumentNarrative(mockInstruments[3])).toContain('diversifierad exponering')
    expect(getInstrumentNarrative(mockInstruments[5])).toContain('digital tillgång')
  })
})

describe('when summarizing the latest trend', () => {
  it('should distinguish positive negative and sideways sessions', () => {
    expect(getTrendLabel({ ...mockProfiles[0], changesPercentage: 1.2 })).toBe('Positiv handelsdag')
    expect(getTrendLabel({ ...mockProfiles[0], changesPercentage: -1.2 })).toBe('Negativ handelsdag')
    expect(getTrendLabel({ ...mockProfiles[0], changesPercentage: 0.3 })).toBe('Sidledes handelsdag')
  })
})
