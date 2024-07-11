import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/assets/fonts/fonts.css'
import './index.css'
import AppRoutes from './routes.tsx'
import { ModalProvider } from './contexts/ModalContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ModalProvider>
      <AppRoutes />
    </ModalProvider>
  </React.StrictMode>,
)
