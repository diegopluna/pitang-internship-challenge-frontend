import { ToastProps } from '@/components/Toast/Toast'
import { createContext, useContext, useReducer } from 'react'
import ToastsContainer from '@/components/Toast/ToastsContainer'

interface ToastState {
  toasts: ToastProps[]
}

interface AddToastAction {
  type: 'ADD_TOAST'
  payload: ToastProps
}

interface RemoveToastAction {
  type: 'REMOVE_TOAST'
  payload: { id: number }
}

interface UnknownAction {
  type: 'UNKNOWN'
  payload: never
}

type Action = AddToastAction | RemoveToastAction | UnknownAction

export const toastReducer = (state: ToastState, action: Action) => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      }
    case 'REMOVE_TOAST': {
      const updatedToasts = state.toasts.filter(
        (toast: ToastProps) => toast.id !== action.payload.id,
      )
      return {
        ...state,
        toasts: updatedToasts,
      }
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const initialState = {
  toasts: [],
}

export type ToastContextType = {
  success: (message: string) => void
  error: (message: string) => void
  info: (message: string) => void
  warning: (message: string) => void
  remove: (id: number) => void
}

export const ToastContext = createContext<ToastContextType>({
  success: () => {},
  error: () => {},
  info: () => {},
  warning: () => {},
  remove: () => {},
})

export const ToastContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [state, dispatch] = useReducer(toastReducer, initialState)

  const addToast = (variant: ToastProps['variant'], message: string) => {
    const id = Math.floor(Math.random() * 10000000)
    dispatch({ type: 'ADD_TOAST', payload: { id, message, variant } })
  }

  const remove = (id: number) => {
    dispatch({ type: 'REMOVE_TOAST', payload: { id } })
  }

  const success = (message: string) => {
    addToast('success', message)
  }
  const error = (message: string) => {
    addToast('destructive', message)
  }
  const info = (message: string) => {
    addToast('info', message)
  }
  const warning = (message: string) => {
    addToast('warning', message)
  }

  const value = { success, warning, info, error, remove }

  return (
    <ToastContext.Provider value={value}>
      <ToastsContainer toasts={state.toasts} position="bottom-right" />
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
