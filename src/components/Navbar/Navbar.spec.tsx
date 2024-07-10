import { render, screen } from '@/utils/customRender'
import Navbar from './Navbar'

describe('Navbar', () => {
  it('renders the logo and app name', () => {
    render(<Navbar />)

    const logoIcon = screen.getByTestId('logo-icon')
    expect(logoIcon).toBeInTheDocument()

    const appName = screen.getByText('Vacina Fácil')
    expect(appName).toBeInTheDocument()
  })

  it('has a link to the home page', () => {
    render(<Navbar />)

    const homeLink = screen.getByRole('link', { name: /Vacina Fácil/i })
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('renders navigation links', () => {
    render(<Navbar />)

    const scheduleLink = screen.getByRole('link', { name: /Agendar/i })
    expect(scheduleLink).toBeInTheDocument()
    expect(scheduleLink).toHaveAttribute('href', '/schedule')

    const listAppointmentsLink = screen.getByRole('link', {
      name: /Lista de agendamentos/i,
    })
    expect(listAppointmentsLink).toBeInTheDocument()
    expect(listAppointmentsLink).toHaveAttribute('href', '/list-appointments')
  })

  it('applies active class to current route', () => {
    render(<Navbar />, { routerProps: { initialEntries: ['/schedule'] } })

    const scheduleLink = screen.getByRole('link', { name: /Agendar/i })
    expect(scheduleLink).toHaveClass('text-primary')

    const listAppointmentsLink = screen.getByRole('link', {
      name: /Lista de agendamentos/i,
    })
    expect(listAppointmentsLink).not.toHaveClass('text-primary')
  })
})
