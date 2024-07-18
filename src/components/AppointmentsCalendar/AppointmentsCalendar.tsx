import { Appointment } from '@/@types/appointment'
import { format } from 'date-fns'
import { Card } from '../ui/card'
import ActionsDropdown from '../ActionsDropdown'
import { cn } from '@/utils/cn'
import { Badge } from '../ui/badge'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import { Skeleton } from '../ui/skeleton'
import { Loader2 } from 'lucide-react'
import CustomDatePicker from '../CustomDatePicker'
import useAppointmentData from '@/hooks/use-appointment-data'

const AppointmentsCalendar = ({
  appointments,
}: {
  appointments: Appointment[]
}) => {
  const {
    selectedDate,
    formattedSelectedDate,
    setSelectedDate,
    groupedAppointments,
    highlightedDays,
  } = useAppointmentData(appointments)

  return (
    <div className="flex min-h-[calc(100vh+8.1rem)] md:min-h-0 md:h-[calc(100vh-8.1rem)] flex-col md:flex-row md:flex-1 w-full">
      <div className="bg-muted text-muted-foreground p-4 border-b md:border-b-0 md:border-r md:p-6">
        <h2 className="text-lg font-semibold mb-4 md:text-xl">Calendário</h2>
        <div className="flex items-center justify-center">
          <CustomDatePicker
            highlightDates={highlightedDays}
            inline
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date as Date)}
          />
        </div>
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
      <div
        data-testid="appointments-list"
        className="flex-1 p-4 flex flex-col md:p-6 overflow-y-auto md:overflow-y-hidden"
      >
        <h2 className="text-lg font-semibold mb-4 md:text-xl">
          Agendamentos para {format(selectedDate, 'dd/MM/yyyy')}
        </h2>
        <Separator className="my-4" />
        <ScrollArea className="flex-1 max-h-full">
          <div className="grid grid-cols-1 gap-4">
            {Object.entries(
              groupedAppointments[formattedSelectedDate] || {},
            ).map(([hour, appointments]) => (
              <div key={hour}>
                <div className="font-semibold text-xl ">{hour}</div>
                <div className=" rounded-md p-4">
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
                              Aniversário:{' '}
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
              </div>
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

AppointmentsCalendar.Skeleton = () => {
  return (
    <div className="flex min-h-[calc(100vh+8.1rem)] md:min-h-0 md:h-[calc(100vh-8.1rem)] flex-col md:flex-row md:flex-1 w-full">
      <div className="bg-muted text-muted-foreground p-4 border-b md:border-b-0 md:border-r md:p-6 md:w-80">
        <h2 className="text-lg font-semibold mb-4 md:text-xl">Calendário</h2>
        <Skeleton
          className="h-60 bg-background w-full"
          data-testid="skeleton"
        />
        <div className="mt-4 space-y-2">
          <div className="text-sm text-muted-foreground">
            <Skeleton className="h-4 w-3/4" data-testid="skeleton" />
          </div>
          <div className="text-sm text-muted-foreground">
            <Skeleton className="h-4 w-3/4" data-testid="skeleton" />
          </div>
        </div>
      </div>
      <div className="flex-1 p-6 flex flex-col">
        <h2 className="text-xl font-semibold mb-4">
          <Skeleton className="h-6 w-1/2" data-testid="skeleton" />
        </h2>
        <Separator className="my-4" />
        <div className="h-full w-full flex items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin" />
        </div>
      </div>
    </div>
  )
}

export default AppointmentsCalendar
