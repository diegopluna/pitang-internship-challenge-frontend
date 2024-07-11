import { render, screen } from '@/utils/customRender'
import Footer from './Footer'
import { COPYRIGHT_YEAR, APP_NAME } from '@/constants'

describe('Footer', () => {
  it('renders the footer with correct text and styling', () => {
    render(<Footer />)

    const footer = screen.getByRole('contentinfo')

    expect(footer).toBeInTheDocument()

    expect(footer).toHaveClass(
      'py-6',
      'w-full',
      'shrink-0',
      'items-center',
      'px-4',
      'md:px-6',
      'border-t',
      'mt-auto',
    )

    expect(footer.textContent).toContain(COPYRIGHT_YEAR.toString())

    expect(footer.textContent).toContain(APP_NAME)

    expect(footer.textContent).toMatch(/Todos os direitos reservados/i)

    const paragraph = footer.querySelector('p')
    expect(paragraph).toHaveClass('text-xs', 'text-muted-foreground')

    expect(footer.textContent).toMatch(
      new RegExp(
        `© ${COPYRIGHT_YEAR} ${APP_NAME}\\. Todos os direitos reservados\\.`,
      ),
    )
  })
})
