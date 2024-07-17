import { cn } from '@/utils/cn'
import Toast, { ToastProps } from './Toast'

interface ToastContainerProps {
  toasts: ToastProps[]
  position: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'
}

const ToastsContainer = ({
  toasts,
  position = 'bottom-right',
}: ToastContainerProps) => {
  return (
    <div
      className={cn(
        'flex flex-col-reverse gap-y-3 z-[9999] fixed',
        position === 'top-right' && 'top-4 right-4',
        position === 'top-left' && 'top-4 left-4',
        position === 'bottom-left' && 'bottom-4 left-4',
        position === 'bottom-right' && 'bottom-4 right-4',
      )}
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  )
}

export default ToastsContainer
