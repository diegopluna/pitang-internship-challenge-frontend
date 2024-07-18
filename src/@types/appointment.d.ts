export type Appointment = {
  id: string
  name: string
  birthDay: Date
  appointmentDate: Date
  vaccinationComplete: boolean
}

type GroupedAppointments = {
  [date: string]: {
    [hour: string]: Appointment[]
  }
}

export type AppointmentInputData = {
  name: string
  birthDay: Date
  appointmentDate: Date
}

export type AppointmentResponse = {
  id: string
  name: string
  birthDay: string
  appointmentDate: string
  vaccinationComplete: boolean
}