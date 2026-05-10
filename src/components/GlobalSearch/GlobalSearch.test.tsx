/**
 * @vitest-environment jsdom
 */
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { store } from '../../store'
import GlobalSearch from './GlobalSearch'

vi.mock('./GlobalSearch.css', () => ({
  activeResult: 'activeResult',
  emptyText: 'emptyText',
  input: 'input',
  panel: 'panel',
  resultBadge: 'resultBadge',
  resultButton: 'resultButton',
  resultList: 'resultList',
  resultMeta: 'resultMeta',
  resultName: 'resultName',
  resultTopRow: 'resultTopRow',
  section: 'section',
  sectionTitle: 'sectionTitle',
  shell: 'shell',
  shortcut: 'shortcut',
  skeletonBar: 'skeletonBar',
  skeletonItem: 'skeletonItem',
  skeletonList: 'skeletonList',
  trigger: 'trigger',
}))

const showGlobalSearch = () => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <GlobalSearch />
      </MemoryRouter>
    </Provider>,
  )
}

describe('when using the global search input', () => {
  afterEach(() => {
    window.localStorage.clear()
  })

  it('should show a query hint before the search threshold', async () => {
    const user = userEvent.setup()

    showGlobalSearch()

    await user.type(screen.getByRole('combobox', { name: 'Global instrumentsökning' }), 'a')

    expect(screen.getByText('Skriv minst två tecken för att söka.')).toBeInTheDocument()
  })
})
