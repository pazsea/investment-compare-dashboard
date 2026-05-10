import type { ChangeEvent } from 'react'

import type { CompareScenarioEntry } from './compareTypes'

export type Props = {
  investmentAmount: string
  onAmountChange: (event: ChangeEvent<HTMLInputElement>) => void
  scenarios: CompareScenarioEntry[]
  startingAmount: number
}
