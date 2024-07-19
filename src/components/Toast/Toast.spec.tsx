import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'

import { ToastContext, ToastContextType } from '@/contexts/ToastContext'
import Toast, { toastVariants, ToastProps } from './Toast'

describe('<Toast />', () => {
  const mockRemove = vi.fn()
  const defaultProps: ToastProps = {
    id: 1,
    message: 'Test message',
    variant: 'info',
  }

  beforeEach(() => {
    vi.useFakeTimers()
    mockRemove.mockClear()
    document.body.innerHTML = ''
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  const renderToast = (props: Partial<ToastProps> = {}) => {
    const contextValue: Partial<ToastContextType> = { remove: mockRemove }
    return render(
      <ToastContext.Provider value={contextValue as ToastContextType}>
        <Toast {...defaultProps} {...props} />
      </ToastContext.Provider>,
    )
  }

  it('should render the toast with correct message and variant', () => {
    renderToast()
    expect(screen.getByText('Test message')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveClass('bg-blue-100')
  })

  it('should call remove function after 4 + 0.4(animation) seconds', () => {
    renderToast()
    act(() => {
      vi.advanceTimersByTime(4400)
    })
    expect(mockRemove).toHaveBeenCalled()
    expect(mockRemove.mock.calls[0][0]).toBe(1)
  })

  it('should dismiss the toast when close button is clicked', async () => {
    renderToast()
    const closeButton = screen.getByRole('button')
    fireEvent.click(closeButton)

    await act(async () => {
      await vi.advanceTimersByTime(400)
    })

    expect(mockRemove).toHaveBeenCalledWith(1)
  })

  it('should pause the progress bar on mouse enter', () => {
    renderToast()
    const toast = screen.getByRole('alert')
    fireEvent.mouseEnter(toast)
    const progressBar = screen.getByTestId('progress-bar')
    expect(progressBar).toHaveStyle('animation-play-state: paused')
  })

  it('should resume the progress bar on mouse leave', () => {
    renderToast()
    const toast = screen.getByRole('alert')
    fireEvent.mouseEnter(toast)
    fireEvent.mouseLeave(toast)
    const progressBar = screen.getByTestId('progress-bar')
    expect(progressBar).toHaveStyle('animation-play-state: running')
  })

  it('should apply correct variant classes', () => {
    renderToast({ variant: 'success' })
    expect(screen.getByRole('alert')).toHaveClass('bg-green-100')
  })

  it('should render correct icon and class for each variant', () => {
    const variants = ['info', 'success', 'warning', 'destructive'] as const
    variants.forEach((variant) => {
      const { unmount } = renderToast({ variant })
      const alert = screen.getByRole('alert')
      expect(alert).toHaveClass(toastVariants({ variant }))
      expect(screen.getByTestId(`${variant}-icon`)).toBeInTheDocument()
      unmount()
    })
  })
})
