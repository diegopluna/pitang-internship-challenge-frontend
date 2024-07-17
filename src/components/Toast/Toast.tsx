import { useToast } from '@/contexts/ToastContext'
import { cn } from '@/utils/cn'
import { cva } from 'class-variance-authority'
import { AlertTriangle, Check, Info, X, XCircle } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

export const toastVariants = cva(
  'flex items-center border bg-background shadow-md p-4 relative w-80 overflow-hidden animate-slide-in',
  {
    variants: {
      variant: {
        info: 'text-primary',
        success: 'text-green-500',
        warning: 'text-yellow-500',
        destructive: 'text-destructive',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  },
)

const toastIcons = {
  info: <Info data-testid="info-icon" />,
  success: <Check data-testid="success-icon" />,
  warning: <AlertTriangle data-testid="warning-icon" />,
  destructive: <XCircle data-testid="destructive-icon" />,
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
      <span className="mr-2">{Icon}</span>
      <p className="text-foreground">{message}</p>
      <button
        className="cursor-pointer border-none bg-none ml-auto text-foreground/20 hover:text-foreground"
        onClick={handleDismiss}
      >
        <X />
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
