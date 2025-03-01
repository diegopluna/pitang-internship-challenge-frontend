import { useQuery } from "@tanstack/react-query";

import api from "@/utils/api";
import { AppointmentResponse, Appointment } from "@/@types/appointment";

export const useGetAppointment = (id: string) => {
  return useQuery({
    queryKey: ["appointment", id],
    queryFn: async () => {
      const response = await api.get<{appointment: AppointmentResponse}>(`/appointments/${id}`)
      return {
        id: response.data.appointment.id,
        name: response.data.appointment.name,
        birthDay: new Date(response.data.appointment.birthDay),
        appointmentDate: new Date(response.data.appointment.appointmentDate),
        vaccinationComplete: response.data.appointment.vaccinationComplete,
      } as Appointment
    },
  });
};