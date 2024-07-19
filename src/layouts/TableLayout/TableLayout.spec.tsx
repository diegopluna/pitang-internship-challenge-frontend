import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import TableLayout from './TableLayout'

describe('<TableLayout />', () => {
  it('should render the title and description correctly', () => {
    const title = 'Test Title'
    const description = 'Test Description'
    render(
      <TableLayout title={title} description={description}>
        <div>Child content</div>
      </TableLayout>,
    )

    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()
  })

  it('should render children content', () => {
    const childText = 'Child content'
    render(
      <TableLayout title="Test" description="Test">
        <div>{childText}</div>
      </TableLayout>,
    )

    expect(screen.getByText(childText)).toBeInTheDocument()
  })
})
