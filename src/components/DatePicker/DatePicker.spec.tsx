import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import DatePicker from './DatePicker'

describe('DatePicker', () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date(2023, 3, 15)) // April 15, 2023
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.clearAllMocks()
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
    const button = screen.getByRole('button')
    fireEvent.click(button)
    await waitFor(() => {
      expect(screen.getByText('Abril')).toBeInTheDocument()
      expect(screen.getByText('2023')).toBeInTheDocument()
    })
  })

  it('calls onChange when a date is selected', async () => {
    render(<DatePicker onChange={mockOnChange} selected={null} />)
    const button = screen.getByRole('button', { name: /selecione uma data/i })
    fireEvent.click(button)

    await waitFor(() => {
      const dayElements = screen.getAllByText(/^(0?[1-9]|[12][0-9]|3[01])$/)
      const dayElement = dayElements.find(
        (element) => element.textContent === '15',
      )
      if (dayElement) {
        fireEvent.click(dayElement)
      } else {
        throw new Error('Day element not found')
      }
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
