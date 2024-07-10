import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './Navbar'

describe('Navbar', () => {
  it('renders the logo and app name', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>,
    )

    const logoIcon = screen.getByTestId('logo-icon')
    expect(logoIcon).toBeInTheDocument()

    const appName = screen.getByText('Vacina Fácil')
    expect(appName).toBeInTheDocument()
  })

  it('has a link to the home page', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>,
    )

    const homeLink = screen.getByRole('link', { name: /Vacina Fácil/i })
    expect(homeLink).toHaveAttribute('href', '/')
  })
})
