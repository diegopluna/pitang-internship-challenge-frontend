import { useMutation } from '@tanstack/react-query'
import { format } from 'date-fns'

import api, { handleApiError } from '@/utils/api'
import { AppointmentInputData } from '@/@types/appointment'


export const useCreateAppointment = () => {
  return useMutation({
    mutationFn: (data: AppointmentInputData) => api.post('/appointments', {
      name: data.name,
      birthDay: format(data.birthDay, 'yyyy-MM-dd'),
      appointmentDate: data.appointmentDate.getTime(),
    }),
    onError: (error) => {
      throw handleApiError(error)
    },
  })
}