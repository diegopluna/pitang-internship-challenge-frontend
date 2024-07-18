import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import FormLayout from './FormLayout'
import { useForm } from 'react-hook-form'

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(),
}))

describe('<FormLayout />', () => {
  const mockOnSubmit = vi.fn()

  const TestComponent = () => {
    const form = useForm()
    return (
      <FormLayout
        title="Test Form"
        description="This is a test form"
        form={form}
        onSubmit={mockOnSubmit}
        isLoading={false}
        loadingMessage="Submitting..."
        submitMessage="Submit"
      >
        <input type="text" {...form.register('testInput')} />
      </FormLayout>
    )
  }

  it('should render the form with correct title and description', () => {
    render(<TestComponent />)
    expect(screen.getByText('Test Form')).toBeInTheDocument()
    expect(screen.getByText('This is a test form')).toBeInTheDocument()
  })

  it('should render children components', () => {
    render(<TestComponent />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('should render submit button with correct text', () => {
    render(<TestComponent />)
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  })

  it('should call onSubmit when form is submitted', async () => {
    render(<TestComponent />)
    const submitButton = screen.getByRole('button', { name: 'Submit' })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled()
    })
  })

  it('should disable submit button and show loading message when isLoading is true', () => {
    const LoadingComponent = () => {
      const form = useForm()
      return (
        <FormLayout
          title="Test Form"
          description="This is a test form"
          form={form}
          onSubmit={mockOnSubmit}
          isLoading={true}
          loadingMessage="Submitting..."
          submitMessage="Submit"
        >
          <input type="text" {...form.register('testInput')} />
        </FormLayout>
      )
    }

    render(<LoadingComponent />)
    const submitButton = screen.getByRole('button', { name: 'Submitting...' })
    expect(submitButton).toBeDisabled()
    expect(screen.getByText('Submitting...')).toBeInTheDocument()
  })
})
