import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'

import BaseLayout from './BaseLayout'

vi.mock('@/components/Footer', () => ({
  default: () => <div data-testid="mock-footer">Footer</div>,
}))

vi.mock('@/components/Modal', () => ({
  default: () => <div data-testid="mock-modal">Modal</div>,
}))

vi.mock('@/components/Navbar', () => ({
  default: () => <div data-testid="mock-navbar">Navbar</div>,
}))

describe('<BaseLayout />', () => {
  it('should render all components correctly', () => {
    render(
      <MemoryRouter>
        <BaseLayout />
      </MemoryRouter>,
    )

    expect(screen.getByTestId('mock-navbar')).toBeInTheDocument()
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument()
    expect(screen.getByTestId('mock-modal')).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('should render outlet content', () => {
    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom')
      return {
        ...actual,
        Outlet: () => <div data-testid="mock-outlet">Outlet Content</div>,
      }
    })

    render(
      <MemoryRouter>
        <BaseLayout />
      </MemoryRouter>,
    )

    expect(screen.getByTestId('mock-outlet')).toBeInTheDocument()
  })
})
