import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { applyThemeToDocument } from './theme.js'
import './usethis.css'
import './index.css'
import App from './App.tsx'

applyThemeToDocument()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
