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
})
