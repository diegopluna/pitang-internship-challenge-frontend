import { useToast } from '@/contexts/ToastContext'
import { cn } from '@/utils/cn'
import { cva } from 'class-variance-authority'
import { AlertTriangle, Check, Info, X, XCircle } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

export const toastVariants = cva(
  'flex items-center rounded-md shadow p-4 relative w-80 overflow-hidden animate-slide-in',
  {
    variants: {
      variant: {
        info: 'bg-blue-100',
        success: 'bg-green-100',
        warning: 'bg-yellow-100',
        destructive: 'bg-red-100',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  },
)

const toastIcons = {
  info: <Info className="size-5" data-testid="info-icon" />,
  success: <Check className="size-5" data-testid="success-icon" />,
  warning: <AlertTriangle className="size-5" data-testid="warning-icon" />,
  destructive: <XCircle className="size-5" data-testid="destructive-icon" />,
}

export interface ToastProps {
  id: number
  message: string
  variant: 'info' | 'success' | 'warning' | 'destructive'
}

const Toast = ({ id, message, variant }: ToastProps) => {
  const [dismissed, setDismissed] = useState(false)
  const Icon: React.ReactNode = toastIcons[variant]
  const toast = useToast()
  const timerID = useRef<NodeJS.Timeout | null>(null)
  const progressRef = useRef<HTMLDivElement | null>(null)

  const handleDismiss = useCallback(() => {
    setDismissed(true),
      setTimeout(() => {
        toast.remove(id)
      }, 400)
  }, [toast, id])

  const handleMouseEnter = () => {
    clearTimeout(timerID.current!)
    progressRef.current!.style.animationPlayState = 'paused'
  }

  const handleMouseLeave = () => {
    const remainingTime =
      (progressRef.current!.offsetWidth /
        progressRef.current!.parentElement!.offsetWidth) *
      4000

    progressRef.current!.style.animationPlayState = 'running'

    timerID.current = setTimeout(() => {
      handleDismiss()
    }, remainingTime)
  }

  useEffect(() => {
    timerID.current = setTimeout(() => {
      handleDismiss()
    }, 4000)

    return () => {
      clearTimeout(timerID.current!)
    }
  }, [handleDismiss])

  return (
    <div
      role="alert"
      className={cn(
        toastVariants({ variant }),
        dismissed && 'animate-slide-out',
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={cn(
          'text-white p-2 rounded-md mr-4',
          variant === 'success' ? 'bg-green-500' : '',
          variant === 'warning' ? 'bg-yellow-500' : '',
          variant === 'destructive' ? 'bg-red-500' : '',
          variant === 'info' ? 'bg-blue-500' : '',
        )}
      >
        {Icon}
      </div>
      <div className="flex-1">
        <h3
          className={cn(
            'font-medium',
            variant === 'success' ? 'text-green-600' : '',
            variant === 'warning' ? 'text-yellow-600' : '',
            variant === 'destructive' ? 'text-red-600' : '',
            variant === 'info' ? 'text-blue-600' : '',
          )}
        >
          {(() => {
            switch (variant) {
              case 'success':
                return 'Sucesso'
              case 'warning':
                return 'Atenção'
              case 'destructive':
                return 'Erro'
              case 'info':
                return 'Informação'
              default:
                return ''
            }
          })()}
        </h3>
        <p
          className={cn(
            'text-foreground',
            variant === 'destructive' ? 'text-red-800' : '',
            variant === 'warning' ? 'text-yellow-800' : '',
            variant === 'success' ? 'text-green-800' : '',
            variant === 'info' ? 'text-blue-800' : '',
          )}
        >
          {message}
        </p>
      </div>
      <button
        className={cn(
          'focus:outline-none',
          variant === 'destructive' ? 'text-red-600 hover:text-red-800' : '',
          variant === 'warning' ? 'text-yellow-600 hover:text-yellow-800' : '',
          variant === 'success' ? 'text-green-600 hover:text-green-800' : '',
          variant === 'info' ? 'text-blue-600 hover:text-blue-800' : '',
        )}
        onClick={handleDismiss}
      >
        <X className="size-5" />
      </button>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-background/10">
        <div
          data-testid="progress-bar"
          ref={progressRef}
          className={cn(
            'h-full animate-progress-bar',
            variant === 'success' ? 'bg-green-500' : '',
            variant === 'warning' ? 'bg-yellow-500' : '',
            variant === 'destructive' ? 'bg-destructive' : '',
            variant === 'info' ? 'bg-primary' : '',
          )}
        ></div>
      </div>
    </div>
  )
}

export default Toast
