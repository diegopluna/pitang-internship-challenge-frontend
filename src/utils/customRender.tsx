import { ModalProvider } from '@/contexts/ModalContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom'

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  routerProps?: MemoryRouterProps
}

interface AppProvidersProps {
  children: React.ReactNode
  routerProps?: MemoryRouterProps
}

const queryClient = new QueryClient()

const AppProviders = ({ children, routerProps }: AppProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <MemoryRouter {...routerProps}>{children}</MemoryRouter>
      </ModalProvider>
    </QueryClientProvider>
  )
}

const customRender = (
  ui: ReactElement,
  { routerProps, ...options }: CustomRenderOptions = {},
) =>
  render(ui, {
    wrapper: (props) => <AppProviders {...props} routerProps={routerProps} />,
    ...options,
  })

export * from '@testing-library/react'

export { customRender as render }
