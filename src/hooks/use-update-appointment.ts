import { useState } from 'react'
import { format } from 'date-fns'
import api, { handleApiError } from '@/utils/api'

interface UpdateAppointmentData {
  id: string
  name: string
  birthDay: Date
  appointmentDate: Date
  vaccinationComplete: boolean
}

export const useUpdateAppointment = () => {
  const [isLoading, setIsLoading] = useState(false)

  const updateAppointment = async (data: UpdateAppointmentData) => {
    setIsLoading(true)
    try {
      await api.put(`/appointments/${data.id}`, {
        name: data.name,
        birthDay: format(data.birthDay, 'yyyy-MM-dd'),
        appointmentDate: data.appointmentDate.getTime(),
        vaccinationComplete: data.vaccinationComplete
      })
    } catch( error) {
      throw handleApiError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return { updateAppointment, isLoading }
}