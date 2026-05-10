/**
 * @vitest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import DataTable from './DataTable'
import type { Column } from './DataTable'

vi.mock('./DataTable.css', () => ({
  cell: 'cell',
  headerCell: 'headerCell',
  row: 'row',
  table: 'table',
  wrapper: 'wrapper',
}))

type Row = {
  name: string
  symbol: string
}

const rows: Row[] = [{ name: 'Apple Inc.', symbol: 'AAPL' }]

const columns: Column<Row>[] = [
  {
    id: 'name',
    header: 'Name',
    renderCell: (row) => row.name,
  },
  {
    id: 'symbol',
    header: 'Symbol',
    renderCell: (row) => row.symbol,
  },
]

const getRowKey = (row: Row) => {
  return row.symbol
}

describe('when showing tabular data', () => {
  it('should expose headers and cells through table semantics', () => {
    render(<DataTable columns={columns} getRowKey={getRowKey} rows={rows} />)

    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Symbol' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'Apple Inc.' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'AAPL' })).toBeInTheDocument()
  })
})
