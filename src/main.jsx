import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import NicCageBingo from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NicCageBingo />
  </StrictMode>,
)
