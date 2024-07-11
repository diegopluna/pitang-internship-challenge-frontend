import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useModal } from '@/contexts/ModalContext'
import { CircleAlert, CircleCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

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
        <DialogFooter>
          <div>
            <Button variant="destructive" onClick={closeModal}>
              Fechar
            </Button>
          </div>
          {!isError && (
            <Button
              onClick={() => {
                closeModal()
                navigate('/list-appointments')
              }}
            >
              Ver Compromissos
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
