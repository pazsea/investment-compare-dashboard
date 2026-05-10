import { BrowserRouter, Routes, Route } from 'react-router-dom'

import SearchPage from './features/search/SearchPage'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  )
}
