import { BrowserRouter, Routes, Route } from 'react-router-dom'

function Home() {
  return (
    <div>
      <h1>Investment Compare Dashboard</h1>
      <p>Compare investment instruments side by side.</p>
    </div>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
