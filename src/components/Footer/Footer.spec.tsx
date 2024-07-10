import { render, screen } from '@/utils/customRender'
import Footer from './Footer'

describe('Footer', () => {
  it('renders the footer with correct text', () => {
    render(<Footer />)

    const footerText = screen.getByText(
      /© 2024 Vácina Fácil. Todos os direitos reservados./i,
    )
    expect(footerText).toBeInTheDocument()
  })

  it('has the correct base styling', () => {
    render(<Footer />)

    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('py-6', 'w-full', 'mt-auto')
  })
})
