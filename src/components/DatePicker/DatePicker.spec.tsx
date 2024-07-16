import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import DatePicker from './DatePicker'

describe('DatePicker', () => {
  const mockOnChange = vi.fn()

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2023, 3, 15))
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  it('renders correctly with default props', () => {
    render(<DatePicker onChange={mockOnChange} selected={null} />)
    expect(screen.getByText('Selecione uma data')).toBeInTheDocument()
  })

  it('displays selected date when provided', () => {
    const selectedDate = new Date(2023, 3, 15)
    render(<DatePicker onChange={mockOnChange} selected={selectedDate} />)
    expect(screen.getByText('15 de abril de 2023')).toBeInTheDocument()
  })

  it('opens the date picker when clicked', async () => {
    render(<DatePicker onChange={mockOnChange} selected={null} />)
    const button = screen.getByRole('button', { name: /selecione uma data/i })

    await act(async () => {
      fireEvent.click(button)
      vi.runAllTimers()
    })

    const monthElement = screen.getByText('Abril', { exact: false })
    expect(monthElement).toBeInTheDocument()

    const yearElement = screen.getByText('2023', { exact: false })
    expect(yearElement).toBeInTheDocument()
  })

  it('calls onChange when a date is selected', async () => {
    render(<DatePicker onChange={mockOnChange} selected={null} />)
    const button = screen.getByRole('button', { name: /selecione uma data/i })

    await act(async () => {
      fireEvent.click(button)
      vi.runAllTimers()
    })

    const dayElement = screen.getByText('15')

    await act(async () => {
      fireEvent.click(dayElement)
      vi.runAllTimers()
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

  it('displays time selection when showTimeSelect is true', () => {
    const selectedDate = new Date(2023, 3, 15, 14, 30)
    render(
      <DatePicker
        onChange={mockOnChange}
        selected={selectedDate}
        showTimeSelect={true}
      />,
    )

    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('14:30')
    expect(button).toHaveTextContent('15 de abril de 2023')
  })
})
