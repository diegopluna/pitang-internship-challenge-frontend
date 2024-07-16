import { Appointment } from "@/components/AppointmentsDataTable/columns";
import { useModal } from "@/contexts/ModalContext";
import { useUpdateAppointment } from "./use-update-appointment";
import { z } from "zod";
import { APPOINTMENT_FORM_STORAGE_KEY_EDIT } from "@/constants";
import { usePersistedForm } from "./use-persisted-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { AppError } from "@/utils/api";



export const useUpdateAppointmentForm = (appointment: Appointment) => {
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
      openModal('Agendamento atualizado com sucesso!', false)
      localStorage.removeItem(APPOINTMENT_FORM_STORAGE_KEY_EDIT + '-' + appointment.id)
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
  }, [updateAppointment, openModal, form, appointment])

  return { form, onSubmit, isLoading }
}