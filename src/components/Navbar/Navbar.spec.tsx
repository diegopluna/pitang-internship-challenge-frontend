import { render, screen } from '@/utils/customRender'
import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import Navbar from './Navbar'

describe('<Navbar />', () => {
  it('should render the logo and app name', () => {
    render(<Navbar />)

    expect(screen.getByTestId('logo-icon')).toBeInTheDocument()
    expect(screen.getByText('Vacina Fácil')).toBeInTheDocument()
  })

  it('should have a link to the home page', () => {
    render(<Navbar />)

    const homeLink = screen.getByRole('link', { name: /Vacina Fácil/i })
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('should render navigation links', () => {
    render(<Navbar />)

    const scheduleLink = screen.getByRole('link', { name: /Agendar/i })
    expect(scheduleLink).toBeInTheDocument()
    expect(scheduleLink).toHaveAttribute('href', '/agendamentos/criar')

    const listAppointmentsLink = screen.getByRole('link', {
      name: /Lista de agendamentos/i,
    })
    expect(listAppointmentsLink).toBeInTheDocument()
    expect(listAppointmentsLink).toHaveAttribute('href', '/agendamentos')
  })

  it('should apply active class to current route', () => {
    render(<Navbar />, {
      routerProps: { initialEntries: ['/agendamentos/criar'] },
    })

    const scheduleLink = screen.getByRole('link', { name: /Agendar/i })
    expect(scheduleLink).toHaveClass('text-primary')

    const listAppointmentsLink = screen.getByRole('link', {
      name: /Lista de agendamentos/i,
    })
    expect(listAppointmentsLink).not.toHaveClass('text-primary')
  })

  it('should render mobile menu button on small screens', () => {
    render(<Navbar />)
    expect(
      screen.getByRole('button', { name: /abrir menu/i }),
    ).toBeInTheDocument()
  })

  it('should open mobile menu when menu button is clicked', async () => {
    render(<Navbar />)
    const menuButton = screen.getByRole('button', { name: /abrir menu/i })
    await userEvent.click(menuButton)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Menu')).toBeInTheDocument()
  })

  it('should close mobile menu when a link is clicked', async () => {
    render(<Navbar />)
    const menuButton = screen.getByRole('button', { name: /abrir menu/i })
    await userEvent.click(menuButton)
    const agendarLink = screen.getAllByText('Agendar')[1]
    await userEvent.click(agendarLink)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
