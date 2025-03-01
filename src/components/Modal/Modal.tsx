import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CircleAlert, CircleCheck } from 'lucide-react'

import { useModal } from '@/contexts/ModalContext'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const Modal: React.FC = () => {
  const { isOpen, message, isError, closeModal } = useModal()
  const navigate = useNavigate()

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col items-center justify-center gap-4 py-8">
          {isError ? (
            <CircleAlert
              className="text-destructive size-12"
              data-testid="error-icon"
            />
          ) : (
            <CircleCheck
              className="text-green-600 size-12"
              data-testid="success-icon"
            />
          )}
          <DialogHeader>
            <DialogTitle>{isError ? 'Erro!' : 'Sucesso!'}</DialogTitle>
          </DialogHeader>
          <DialogDescription>{message}</DialogDescription>
        </div>
        <DialogFooter className=" flex flex-row gap-2 justify-end">
          <div>
            <Button variant="destructive" onClick={closeModal}>
              Fechar
            </Button>
          </div>
          {!isError && (
            <Button
              onClick={() => {
                closeModal()
                navigate('/agendamentos')
              }}
            >
              Ver Agendamentos
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
