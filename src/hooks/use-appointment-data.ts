import { useMemo } from 'react'
import { format } from 'date-fns'
import { HighlightDate } from 'react-datepicker/dist/date_utils'

import { LIST_APPOINTMENTS_CALENDAR_KEY } from '@/constants'
import { Appointment, GroupedAppointments } from '@/@types/appointment'
import useLocalStorage from '@/hooks/use-local-storage'

const useAppointmentData = (appointments: Appointment[]) => {
  const [selectedDate, setSelectedDate] = useLocalStorage(
    LIST_APPOINTMENTS_CALENDAR_KEY,
    new Date(),
  )

  const formattedSelectedDate = format(selectedDate, 'dd/MM/yyyy')

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

  const appointmentDates = appointments.map(
    (appointment) => new Date(appointment.appointmentDate),
  )

  const dateOccurrences = appointmentDates.reduce(
    (acc, date) => {
      const dateKey = format(date, 'yyyy-MM-dd')
      acc[dateKey] = (acc[dateKey] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const notFullDays: Date[] = []
  const fullDays: Date[] = []

  Object.entries(dateOccurrences).forEach(([date, count]) => {
    if (count === 20) {
      fullDays.push(new Date(date + 'T00:00:00'))
    } else if (count > 0 && count < 20) {
      notFullDays.push(new Date(date + 'T00:00:00'))
    }
  })

  const highlightedDays: HighlightDate[] = [
    {
      'react-datepicker__day--highlighted-full': fullDays,
    },
    {
      'react-datepicker__day--highlighted-not-full': notFullDays,
    },
  ]

  return {
    selectedDate,
    formattedSelectedDate,
    setSelectedDate,
    groupedAppointments,
    highlightedDays,
  }
}

export default useAppointmentData