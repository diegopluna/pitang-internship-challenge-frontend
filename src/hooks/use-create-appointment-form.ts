import { useCallback } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { APPOINTMENT_FORM_STORAGE_KEY } from '@/constants'
import { AppError } from '@/utils/api'
import { usePersistedForm } from '@/hooks/use-persisted-form'
import { useModal } from '@/contexts/ModalContext'
import { useCreateAppointment } from '@/hooks/use-create-appointment'

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: 'Nome é obrigatório',
  }),
  birthDay: z
    .date({
      message: 'Data de nascimento é obrigatória',
    })
    .max(new Date(), {
      message: 'Data de nascimento não pode ser maior que a data atual',
    }),
  appointmentDate: z
    .date({
      message: 'Data da consulta é obrigatória',
    })
    .min(new Date(), {
      message: 'Data da consulta não pode ser menor que a data atual',
    }),
})

type FormData = z.infer<typeof formSchema>

export const useCreateAppointmentForm = () => {
  const { openModal } = useModal()
  const { createAppointment, isLoading } = useCreateAppointment()

  const form = usePersistedForm<FormData>(APPOINTMENT_FORM_STORAGE_KEY, {
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      birthDay: undefined,
      appointmentDate: undefined,
    },
  })

  const onSubmit = useCallback(async (data: FormData) => {
    try {
      await createAppointment(data)
      openModal('Agendamento realizado com sucesso!', false)
      form.reset({
        name: '',
        birthDay: undefined,
        appointmentDate: undefined,
      })
      localStorage.removeItem(APPOINTMENT_FORM_STORAGE_KEY)
    } catch (error ) {
      if (error instanceof AppError) {
        openModal(error.message, true)
        if (error.details) {
          Object.entries(error.details).forEach(([field, messages]) => {
            form.setError(field as keyof FormData, {
              type: 'manual',
              message: messages[0],
            })
          })
        }
      } else {
        openModal('Ocorreu um erro inesperado. Por favor, tente novamente.', true)
      }
    }
  }, [createAppointment, openModal, form])

  return {
    form,
    onSubmit,
    isLoading,
  }
}