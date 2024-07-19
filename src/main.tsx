import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import AppRoutes from '@/routes.tsx'
import { ModalProvider } from '@/contexts/ModalContext.tsx'
import { ToastContextProvider } from '@/contexts/ToastContext.tsx'
import '@/index.css'
import '@/assets/fonts/fonts.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <ToastContextProvider>
          <AppRoutes />
        </ToastContextProvider>
      </ModalProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
