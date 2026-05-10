import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ComparePage from './features/compare/ComparePage'
import SearchPage from './features/search/SearchPage'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  )
}
