import type { FC } from 'react'

import { ErrorState } from '../../components/ErrorState'
import type { Props } from './CompareApiNotice.types'

const CompareApiNotice: FC<Props> = (props) => {
  const unsupportedList = props.unsupportedSymbols.join(', ')

  return (
    <ErrorState
      title="Begränsning i gratisversionen"
      message={`Jämförelse med live-data är bara tillgänglig för vissa symboler i gratisversionen av API:t. Följande valda instrument stöds inte för jämförelse just nu: ${unsupportedList}.`}
    />
  )
}

export default CompareApiNotice
