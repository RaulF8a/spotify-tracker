import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRouter } from './router/AppRouter.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
)
