import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/assets/fonts/fonts.css'
import './index.css'
import AppRoutes from './routes.tsx'
import { ModalProvider } from './contexts/ModalContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContextProvider } from './contexts/ToastContext.tsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <ToastContextProvider>
          <AppRoutes />
          <ReactQueryDevtools buttonPosition="bottom-left" />
        </ToastContextProvider>
      </ModalProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
