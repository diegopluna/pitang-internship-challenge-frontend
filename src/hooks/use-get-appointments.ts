import { useQuery } from '@tanstack/react-query'
import api from '@/utils/api'
import { AppointmentResponse, Appointment } from '@/@types/appointment'

export const useGetAppointments = () => {
  return useQuery({
    queryKey: ['appointments'],
    queryFn: async () => {
      const response = await api.get<{ appointments: AppointmentResponse[] }>('/appointments')
      return response.data.appointments.map((rawAppointment) => ({
        ...rawAppointment,
        birthDay: new Date(rawAppointment.birthDay),
        appointmentDate: new Date(rawAppointment.appointmentDate),
      } as Appointment))
    },
  })
}