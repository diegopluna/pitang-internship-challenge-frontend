import { describe, it, expect } from 'vitest'
import { render, screen } from '@/utils/customRender'

import NotFound from './NotFound'

describe('<NotFound />', () => {
  it('should render the main heading', () => {
    render(<NotFound />)
    const heading = screen.getByRole('heading', {
      name: /Ops, página não encontrada!/i,
    })
    expect(heading).toBeInTheDocument()
  })

  it('should display the subheading text', () => {
    render(<NotFound />)
    const subheading = screen.getByText(
      /A página que você está procurando parece não existir/i,
    )
    expect(subheading).toBeInTheDocument()
  })

  it('should render the "Ir para a Página Inicial" button with correct link', () => {
    render(<NotFound />)
    const homeButton = screen.getByRole('link', {
      name: /Ir para a Página Inicial/i,
    })
    expect(homeButton).toBeInTheDocument()
    expect(homeButton).toHaveAttribute('href', '/')
  })

  it('should display the 404 image', () => {
    render(<NotFound />)
    const image = screen.getByAltText('ilustração 404')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src')
    expect(image.getAttribute('src')).not.toBeNull()
  })
})
