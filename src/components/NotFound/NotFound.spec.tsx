import { render, screen } from '@/utils/customRender'
import { describe, it, expect } from 'vitest'
import NotFound from './NotFound'

describe('NotFound', () => {
  it('renders the main heading', () => {
    render(<NotFound />)
    const heading = screen.getByRole('heading', {
      name: /Ops, página não encontrada!/i,
    })
    expect(heading).toBeInTheDocument()
  })

  it('displays the subheading text', () => {
    render(<NotFound />)
    const subheading = screen.getByText(
      /A página que você está procurando parece não existir/i,
    )
    expect(subheading).toBeInTheDocument()
  })

  it('renders the "Ir para a Página Inicial" button with correct link', () => {
    render(<NotFound />)
    const homeButton = screen.getByRole('link', {
      name: /Ir para a Página Inicial/i,
    })
    expect(homeButton).toBeInTheDocument()
    expect(homeButton).toHaveAttribute('href', '/')
  })

  it('displays the 404 image', () => {
    render(<NotFound />)
    const image = screen.getByAltText('ilustração 404')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src')
    expect(image.getAttribute('src')).not.toBeNull()
  })
})
