import { Appointment } from "@/@types/appointment";

export function sortAppointments(appointments: Appointment[] | undefined) {
  if (!appointments) return []

  return appointments.sort((a, b) => {
    const dateComparison =
      new Date(a.appointmentDate).getTime() -
      new Date(b.appointmentDate).getTime()
    if (dateComparison !== 0) return dateComparison
    return a.name.localeCompare(b.name)
  })
}