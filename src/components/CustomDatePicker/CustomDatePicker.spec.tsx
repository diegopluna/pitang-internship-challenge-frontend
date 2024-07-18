import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CustomDatePicker from './CustomDatePicker'

describe('<CustomDatePicker />', () => {
  const mockOnChange = vi.fn()

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2023, 3, 15))
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  it('should render correctly with default props', () => {
    render(<CustomDatePicker onChange={mockOnChange} selected={null} />)
    expect(screen.getByText('Selecione uma data')).toBeInTheDocument()
  })

  it('should display selected date when provided', () => {
    const selectedDate = new Date(2023, 3, 15)
    render(<CustomDatePicker onChange={mockOnChange} selected={selectedDate} />)
    expect(screen.getByText('15 de abril de 2023')).toBeInTheDocument()
  })

  it('should open the date picker when clicked', async () => {
    render(<CustomDatePicker onChange={mockOnChange} selected={null} />)
    const button = screen.getByRole('button', { name: /selecione uma data/i })

    await act(async () => {
      fireEvent.click(button)
    })

    expect(screen.getByText('Abril')).toBeInTheDocument()
    expect(screen.getByText('2023')).toBeInTheDocument()
  })

  it('should call onChange when a date is selected', async () => {
    render(<CustomDatePicker onChange={mockOnChange} selected={null} />)
    const button = screen.getByRole('button', { name: /selecione uma data/i })

    await act(async () => {
      fireEvent.click(button)
    })

    const dayElement = screen.getByText('15')

    await act(async () => {
      fireEvent.click(dayElement)
    })

    expect(mockOnChange).toHaveBeenCalledWith(
      expect.any(Date),
      expect.objectContaining({
        type: 'click',
        target: expect.any(Object),
      }),
    )

    const [calledDate] = mockOnChange.mock.calls[0]
    expect(calledDate.getFullYear()).toBe(2023)
    expect(calledDate.getMonth()).toBe(3)
    expect(calledDate.getDate()).toBe(15)
  })

  it('should display time selection when showTimeSelect is true', () => {
    const selectedDate = new Date(2023, 3, 15, 14, 30)
    render(
      <CustomDatePicker
        onChange={mockOnChange}
        selected={selectedDate}
        showTimeSelect={true}
      />,
    )

    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('14:30')
    expect(button).toHaveTextContent('15 de abril de 2023')
  })

  it('should respects minDate and maxDate props', () => {
    const minDate = new Date(2023, 3, 10)
    const maxDate = new Date(2023, 3, 20)
    render(
      <CustomDatePicker
        onChange={mockOnChange}
        selected={null}
        minDate={minDate}
        maxDate={maxDate}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: /selecione uma data/i }))

    expect(screen.getByText('9')).toHaveAttribute('aria-disabled', 'true')
    expect(screen.getByText('10')).not.toHaveAttribute('aria-disabled', 'true')
    expect(screen.getByText('20')).not.toHaveAttribute('aria-disabled', 'true')
    expect(screen.getByText('21')).toHaveAttribute('aria-disabled', 'true')
  })
})
