import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MovieBookingApp from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MovieBookingApp />
  </StrictMode>,
)
