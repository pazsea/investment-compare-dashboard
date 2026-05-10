import type { Instrument } from '../../types/instrument'

export type Props = {
  emptyMessage: string
  instruments: Instrument[]
  title: string
  to: string
}
