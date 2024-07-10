import { render, screen } from '@/utils/customRender'
import userEvent from '@testing-library/user-event'
import Navbar from './Navbar'

describe('Navbar', () => {
  it('renders the logo and app name', () => {
    render(<Navbar />)

    expect(screen.getByTestId('logo-icon')).toBeInTheDocument()
    expect(screen.getByText('Vacina Fácil')).toBeInTheDocument()
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

  it('renders mobile menu button on small screens', () => {
    render(<Navbar />)
    expect(
      screen.getByRole('button', { name: /abrir menu/i }),
    ).toBeInTheDocument()
  })

  it('opens mobile menu when menu button is clicked', async () => {
    render(<Navbar />)
    const menuButton = screen.getByRole('button', { name: /abrir menu/i })
    await userEvent.click(menuButton)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Menu')).toBeInTheDocument()
  })

  it('closes mobile menu when a link is clicked', async () => {
    render(<Navbar />)
    const menuButton = screen.getByRole('button', { name: /abrir menu/i })
    await userEvent.click(menuButton)
    const agendarLink = screen.getAllByText('Agendar')[1]
    await userEvent.click(agendarLink)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
