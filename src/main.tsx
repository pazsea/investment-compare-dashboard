import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import { lightThemeClass } from './styles/theme.css'
import { store } from './store/index'
import './styles/global.css'
import { App } from './App.tsx'

document.body.classList.add(lightThemeClass)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
