import { render, screen } from '@testing-library/react'
import App from '@/App'

test('demo', () => {
  expect(true).toBe(true)
})

describe('render', () => {
  it('renders the main page', () => {
    render(<App />)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
  })

  it('has correct button text', () => {
    render(<App />)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toHaveTextContent('Click me')
  })
})
