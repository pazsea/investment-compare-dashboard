import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ComparePage from './features/compare/ComparePage'
import InstrumentDetailsPage from './features/details/InstrumentDetailsPage'
import SearchPage from './features/search/SearchPage'
import WatchlistPage from './features/watchlist/WatchlistPage'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/instrument/:symbol" element={<InstrumentDetailsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
      </Routes>
    </BrowserRouter>
  )
}
