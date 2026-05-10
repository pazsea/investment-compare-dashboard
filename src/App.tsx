import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ComparePage from './features/compare/ComparePage'
import DashboardPage from './features/dashboard/DashboardPage'
import InstrumentDetailsPage from './features/details/InstrumentDetailsPage'
import SearchPage from './features/search/SearchPage'
import WatchlistPage from './features/watchlist/WatchlistPage'
import { AppLayout } from './layout/AppLayout'

export function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/instrument/:symbol" element={<InstrumentDetailsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}
