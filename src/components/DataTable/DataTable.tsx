import type { ReactNode } from 'react'

import * as styles from './DataTable.css'

export type Column<T> = {
  id: string
  header: string
  renderCell: (row: T) => ReactNode
}

export type Props<T> = {
  columns: Column<T>[]
  getRowKey: (row: T) => string
  rows: T[]
}

const DataTable = <T,>(props: Props<T>) => {
  const { columns, getRowKey, rows } = props

  const renderColumnHeader = (column: Column<T>) => {
    return (
      <th className={styles.headerCell} key={column.id} scope="col">
        {column.header}
      </th>
    )
  }

  const renderRow = (row: T) => {
    const renderCell = (column: Column<T>) => {
      return (
        <td className={styles.cell} key={column.id}>
          {column.renderCell(row)}
        </td>
      )
    }

    return (
      <tr className={styles.row} key={getRowKey(row)}>
        {columns.map(renderCell)}
      </tr>
    )
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>{columns.map(renderColumnHeader)}</tr>
        </thead>
        <tbody>{rows.map(renderRow)}</tbody>
      </table>
    </div>
  )
}

export default DataTable
