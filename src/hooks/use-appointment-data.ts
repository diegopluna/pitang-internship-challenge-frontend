import { useMemo } from 'react'
import { format } from 'date-fns'
import { HighlightDate } from 'react-datepicker/dist/date_utils'

import { LIST_APPOINTMENTS_CALENDAR_KEY } from '@/constants'
import { Appointment, GroupedAppointments } from '@/@types/appointment'
import useLocalStorage from '@/hooks/use-local-storage'

// hook to return data for the appointment list
const useAppointmentData = (appointments: Appointment[]) => {
  
  // get the selected date from local storage
  const [selectedDate, setSelectedDate] = useLocalStorage(
    LIST_APPOINTMENTS_CALENDAR_KEY,
    new Date(),
  )

  // format the selected date
  const formattedSelectedDate = format(selectedDate, 'dd/MM/yyyy')

  // group the appointments by date and hour
  const groupedAppointments = useMemo(
    () =>
      appointments!.reduce((acc, appointment) => {
        const date = new Date(appointment.appointmentDate)
        const dateKey = format(date, 'dd/MM/yyyy')
        const hourKey = format(date, 'HH:mm')

        if (!acc[dateKey]) {
          acc[dateKey] = {}
        }

        if (!acc[dateKey][hourKey]) {
          acc[dateKey][hourKey] = []
        }

        acc[dateKey][hourKey].push(appointment)

        return acc
      }, {} as GroupedAppointments),
    [appointments],
  )

  // get the dates of the appointments
  const appointmentDates = appointments.map(
    (appointment) => new Date(appointment.appointmentDate),
  )

  // count the occurrences of the dates
  const dateOccurrences = appointmentDates.reduce(
    (acc, date) => {
      const dateKey = format(date, 'yyyy-MM-dd')
      acc[dateKey] = (acc[dateKey] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // get the dates of the full and not full days
  const notFullDays: Date[] = []
  const fullDays: Date[] = []

  Object.entries(dateOccurrences).forEach(([date, count]) => {
    if (count === 20) {
      fullDays.push(new Date(date + 'T00:00:00'))
    } else if (count > 0 && count < 20) {
      notFullDays.push(new Date(date + 'T00:00:00'))
    }
  })

  // get the highlighted days
  const highlightedDays: HighlightDate[] = [
    {
      'react-datepicker__day--highlighted-full': fullDays,
    },
    {
      'react-datepicker__day--highlighted-not-full': notFullDays,
    },
  ]

  // return the data
  return {
    selectedDate,
    formattedSelectedDate,
    setSelectedDate,
    groupedAppointments,
    highlightedDays,
  }
}

export default useAppointmentData