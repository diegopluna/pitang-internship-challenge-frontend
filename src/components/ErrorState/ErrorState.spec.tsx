import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ErrorState from './ErrorState'

describe('<ErrorState />', () => {
  const mockOnRetry = vi.fn()

  beforeEach(() => {
    mockOnRetry.mockClear()
  })

  it('should render the error message correctly', () => {
    render(<ErrorState onRetry={mockOnRetry} />)

    expect(screen.getByText('Ops, algo deu errado!')).toBeInTheDocument()
    expect(
      screen.getByText(/Lamentamos, mas não conseguimos buscar os dados/),
    ).toBeInTheDocument()
  })

  it('should render the retry button', () => {
    render(<ErrorState onRetry={mockOnRetry} />)

    const retryButton = screen.getByRole('button', {
      name: /Tentar novamente/i,
    })
    expect(retryButton).toBeInTheDocument()
  })

  it('should call onRetry when the retry button is clicked', () => {
    render(<ErrorState onRetry={mockOnRetry} />)

    const retryButton = screen.getByRole('button', {
      name: /Tentar novamente/i,
    })
    fireEvent.click(retryButton)

    expect(mockOnRetry).toHaveBeenCalledTimes(1)
  })

  it('should apply the correct CSS classes', () => {
    render(<ErrorState onRetry={mockOnRetry} />)

    const container = screen.getByTestId('error-state-container')
    expect(container).toHaveClass('mx-auto max-w-md text-center')

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveClass(
      'mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl',
    )

    const message = screen.getByText(
      /Lamentamos, mas não conseguimos buscar os dados/,
    )
    expect(message).toHaveClass('mt-4 text-muted-foreground')

    const button = screen.getByRole('button', { name: /Tentar novamente/i })
    expect(button).toHaveClass(
      'inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
    )
  })
})
