import React, { createContext, useState, useContext, ReactNode } from 'react'

type ModalContextType = {
  isOpen: boolean
  message: string
  isError: boolean
  openModal: (message: string, isError: boolean) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const openModal = (message: string, isError: boolean) => {
    setMessage(message)
    setIsError(isError)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <ModalContext.Provider
      value={{ isOpen, message, isError, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}
