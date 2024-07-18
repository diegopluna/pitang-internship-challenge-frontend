import { format } from 'date-fns'
import { Loader2 } from 'lucide-react'

import { GroupedAppointments } from '@/@types/appointment'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import AppointmentCard from '@/components/AppointmentsCalendar/AppointmentCard'

interface ListSectionProps {
  selectedDate: Date
  groupedAppointments: GroupedAppointments
  formattedSelectedDate: string
}

const ListSection = ({
  selectedDate,
  groupedAppointments,
  formattedSelectedDate,
}: ListSectionProps) => {
  return (
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
          {Object.entries(groupedAppointments[formattedSelectedDate] || {}).map(
            ([hour, appointments]) => (
              <div key={hour}>
                <div className="font-semibold text-xl ">{hour}</div>
                <div className=" rounded-md p-4">
                  <div className="flex items-center justify-start">
                    <div className="flex items-center gap-2">
                      {appointments.map((appointment, index) => (
                        <AppointmentCard
                          key={index}
                          appointment={appointment}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <Separator className="my-4" />
              </div>
            ),
          )}
        </div>
      </ScrollArea>
      {Object.entries(groupedAppointments[formattedSelectedDate] || {})
        .length === 0 && (
        <div className="flex justify-center items-center h-full">
          <p className="text-muted-foreground">Nenhum agendamento encontrado</p>
        </div>
      )}
    </div>
  )
}

ListSection.Skeleton = () => (
  <div className="flex-1 p-6 flex flex-col">
    <h2 className="text-xl font-semibold mb-4">
      <Skeleton className="h-6 w-1/2" data-testid="skeleton" />
    </h2>
    <Separator className="my-4" />
    <div className="h-full w-full flex items-center justify-center">
      <Loader2 className="w-12 h-12 animate-spin" />
    </div>
  </div>
)

export default ListSection
