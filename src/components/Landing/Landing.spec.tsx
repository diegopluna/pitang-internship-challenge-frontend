import { render, screen } from '@/utils/customRender'
import Landing from './Landing'

describe('Landing', () => {
  it('renders the main heading', () => {
    render(<Landing />)
    const heading = screen.getByRole('heading', {
      name: /Agende sua vacina da COVID-19 com facilidade/i,
    })
    expect(heading).toBeInTheDocument()
  })

  it('displays the subheading text', () => {
    render(<Landing />)
    const subheading = screen.getByText(
      /Não espere, agende sua vacina para a COVID-19 hoje/i,
    )
    expect(subheading).toBeInTheDocument()
  })

  it('renders the "Agendar Vacina" button with correct link', () => {
    render(<Landing />)
    const scheduleButton = screen.getByRole('link', { name: /Agendar Vacina/i })
    expect(scheduleButton).toBeInTheDocument()
    expect(scheduleButton).toHaveAttribute('href', '/schedule')
  })

  it('renders the "Ver Agendamentos" button with correct link', () => {
    render(<Landing />)
    const listAppointmentsButton = screen.getByRole('link', {
      name: /Ver Agendamentos/i,
    })
    expect(listAppointmentsButton).toBeInTheDocument()
    expect(listAppointmentsButton).toHaveAttribute('href', '/list-appointments')
  })

  it('shows the image attribution', () => {
    render(<Landing />)
    const attribution = screen.getByText(/Designed by/i)
    expect(attribution).toBeInTheDocument()
    const attributionLink = screen.getByRole('link', { name: /Freepik/i })
    expect(attributionLink).toHaveAttribute('href', 'https://www.freepik.com')
  })
})
