import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { APPOINTMENT_FORM_STORAGE_KEY_EDIT } from "@/constants";
import { AppError } from "@/utils/api";
import { Appointment } from "@/@types/appointment";
import { useModal } from "@/contexts/ModalContext";
import { useToast } from "@/contexts/ToastContext";
import { usePersistedForm } from "./use-persisted-form";
import { useUpdateAppointment } from "./use-update-appointment";



export const useUpdateAppointmentForm = (appointment: Appointment) => {
  const toast = useToast()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { openModal } = useModal()
  const { updateAppointment, isLoading } = useUpdateAppointment()


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
  appointmentDate: z.union([
    z.date({
      message: 'Data da consulta é obrigatória',
    })
    .min(new Date(), {
      message: 'Data da consulta não pode ser menor que a data atual',
    }),
    z.date()
  ]),
  vaccinationComplete: z.boolean({
    message: "Estado da vacinação é obrigatório"
  })
})

  type FormData = z.infer<typeof formSchema>

  const form = usePersistedForm<FormData>(APPOINTMENT_FORM_STORAGE_KEY_EDIT + '-' + appointment.id, {
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: appointment.name,
      birthDay: appointment.birthDay,
      appointmentDate: appointment.appointmentDate,
      vaccinationComplete: appointment.vaccinationComplete
    },
  })

  const onSubmit = useCallback(async (data: FormData) => {
    const appointmentData = {
      ...data,
      id: appointment.id
    }

    try {
      await updateAppointment(appointmentData)
      localStorage.removeItem(APPOINTMENT_FORM_STORAGE_KEY_EDIT + '-' + appointment.id)
      toast.success('Agendamento atualizado com sucesso!')
      navigate('/agendamentos')
      queryClient.invalidateQueries({ queryKey: ['appointment', appointment.id] })
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
  }, [updateAppointment, openModal, form, appointment, navigate, toast, queryClient])

  return { form, onSubmit, isLoading }
}