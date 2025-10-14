import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { applyThemeToDocument } from './theme.js'
import './index.css'
import App from './App.tsx'
import { AthletePortalModalProvider } from './features/auth/AthletePortalModalContext'

applyThemeToDocument()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AthletePortalModalProvider>
      <App />
    </AthletePortalModalProvider>
  </StrictMode>,
)
