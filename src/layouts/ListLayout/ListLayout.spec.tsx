import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import ListLayout from './ListLayout'

describe('<ListLayout />', () => {
  it('should render the title and description correctly', () => {
    const title = 'Test Title'
    const description = 'Test Description'
    render(
      <ListLayout title={title} description={description}>
        <div>Child content</div>
      </ListLayout>,
    )

    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()
  })

  it('should render children content', () => {
    const childText = 'Child content'
    render(
      <ListLayout title="Test" description="Test">
        <div>{childText}</div>
      </ListLayout>,
    )

    expect(screen.getByText(childText)).toBeInTheDocument()
  })
})
