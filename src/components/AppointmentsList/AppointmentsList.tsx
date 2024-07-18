import DatePicker from 'react-datepicker'
import { Appointment } from '../AppointmentsDataTable/columns'
import { format } from 'date-fns'
import { Card } from '../ui/card'
import ActionsDropdown from '../AppointmentsDataTable/ActionsDropdown'
import { cn } from '@/utils/cn'
import { Badge } from '../ui/badge'
import { HighlightDate } from 'react-datepicker/dist/date_utils'
import useLocalStorage from '@/hooks/use-local-storage'
import { LIST_APPOINTMENTS_CALENDAR_KEY } from '@/constants'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import { Skeleton } from '../ui/skeleton'
import { Loader2 } from 'lucide-react'

type GroupedAppointments = {
  [date: string]: {
    [hour: string]: Appointment[]
  }
}

const AppointmentsList = ({
  appointments,
}: {
  appointments: Appointment[]
}) => {
  const [selectedDate, setSelectedDate] = useLocalStorage(
    LIST_APPOINTMENTS_CALENDAR_KEY,
    new Date(),
  )

  const formattedSelectedDate = format(selectedDate, 'dd/MM/yyyy')

  const groupedAppointments = appointments!.reduce((acc, appointment) => {
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
  }, {} as GroupedAppointments)

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

  return (
    <div className="flex h-[calc(100vh-8.1rem)] w-full">
      <div className="p-6 border-r bg-muted text-muted-foreground">
        <h2 className="text-lg font-semibold mb-4">Calendário</h2>
        <DatePicker
          locale="pt-BR"
          highlightDates={highlightedDays}
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date as Date)}
          inline
        />
        <div className="mt-4 space-y-2">
          <div className="text-sm text-muted-foreground">
            <span className="bg-yellow-100 w-3 h-3 inline-block rounded-full mr-2" />
            Dias parcialmente ocupados
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="bg-red-200 w-3 h-3 inline-block rounded-full mr-2" />
            Dias completamente ocupados
          </div>
        </div>
      </div>
      <div className="flex-1  p-6 flex flex-col ">
        <h2 className="text-xl font-semibold mb-4">
          Agendamentos para {format(selectedDate, 'dd/MM/yyyy')}
        </h2>
        <Separator className="my-4" />
        <ScrollArea className="flex-1">
          <div className="grid grid-cols-1 gap-4">
            {Object.entries(
              groupedAppointments[formattedSelectedDate] || {},
            ).map(([hour, appointments]) => (
              <>
                <div className="font-semibold text-xl ">{hour}</div>
                <div key={hour} className=" rounded-md p-4">
                  <div className="flex items-center justify-start">
                    <div className="flex items-center gap-2">
                      {appointments.map((appointment, index) => (
                        <Card key={index} className="p-4 rounded-md">
                          <div className="grid gap-4">
                            <div className="font-semibold flex justify-between items-center">
                              {appointment.name}
                              <ActionsDropdown appointment={appointment} />
                            </div>
                            <div className="text-sm">
                              Data de aniversário:{' '}
                              {format(appointment.birthDay, 'dd/MM/yyyy')}
                            </div>
                            <Badge
                              className={cn(
                                'px-2 py-1 rounded-full inline-block w-fit',
                                {
                                  'bg-green-100 text-green-800':
                                    appointment.vaccinationComplete,
                                  'bg-red-100 text-red-800':
                                    !appointment.vaccinationComplete,
                                },
                              )}
                            >
                              {appointment.vaccinationComplete
                                ? 'Vacinado'
                                : 'Não vacinado'}
                            </Badge>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
                <Separator className="my-4" />
              </>
            ))}
          </div>
        </ScrollArea>
        {Object.entries(groupedAppointments[formattedSelectedDate] || {})
          .length === 0 && (
          <div className="flex justify-center items-center h-full">
            <p className="text-muted-foreground">
              Nenhum agendamento encontrado
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

AppointmentsList.Skeleton = () => {
  return (
    <div className="flex h-[calc(100vh-8.1rem)] w-full">
      <div className="w-80 p-6 border-r bg-muted text-muted-foreground">
        <h2 className="text-lg font-semibold mb-4">Calendário</h2>
        <Skeleton className="h-60 bg-background w-full" />
        <div className="mt-4 space-y-2">
          <div className="text-sm text-muted-foreground">
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="text-sm text-muted-foreground">
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
      <div className="flex-1 p-6 flex flex-col">
        <h2 className="text-xl font-semibold mb-4">
          <Skeleton className="h-6 w-1/2" />
        </h2>
        <Separator className="my-4" />
        <div className="h-full w-full flex items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin" />
        </div>
      </div>
    </div>
  )
}

export default AppointmentsList
