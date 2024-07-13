import { useState } from 'react'
import { format } from 'date-fns'
import api from '@/utils/api'

interface AppointmentData {
  name: string
  birthDay: Date
  appointmentDate: Date
}

export const useCreateAppointment = () => {
  const [isLoading, setIsLoading] = useState(false)

  const createAppointment = async (data: AppointmentData) => {
    setIsLoading(true)
    try {
      await api.post('/appointments', {
        name: data.name,
        birthDay: format(data.birthDay, 'yyyy-MM-dd'),
        appointmentDate: data.appointmentDate.getTime(),
      })
    } finally {
      setIsLoading(false)
    }
  }

  return { createAppointment, isLoading }
}