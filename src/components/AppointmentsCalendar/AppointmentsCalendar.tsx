import { Appointment } from '@/@types/appointment'
import { Separator } from '../ui/separator'
import { Skeleton } from '../ui/skeleton'
import { Loader2 } from 'lucide-react'
import useAppointmentData from '@/hooks/use-appointment-data'
import CalendarSection from './CalendarSection'
import ListSection from './ListSection'

interface AppointmentsCalendarProps {
  appointments: Appointment[]
}

const AppointmentsCalendar = ({ appointments }: AppointmentsCalendarProps) => {
  const {
    selectedDate,
    formattedSelectedDate,
    setSelectedDate,
    groupedAppointments,
    highlightedDays,
  } = useAppointmentData(appointments)

  return (
    <div className="flex min-h-[calc(100vh+8.1rem)] md:min-h-0 md:h-[calc(100vh-8.1rem)] flex-col md:flex-row md:flex-1 w-full">
      <CalendarSection
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        highlightedDays={highlightedDays}
      />
      <ListSection
        groupedAppointments={groupedAppointments}
        selectedDate={selectedDate}
        formattedSelectedDate={formattedSelectedDate}
      />
    </div>
  )
}

AppointmentsCalendar.Skeleton = () => {
  return (
    <div className="flex min-h-[calc(100vh+8.1rem)] md:min-h-0 md:h-[calc(100vh-8.1rem)] flex-col md:flex-row md:flex-1 w-full">
      <CalendarSection.Skeleton />
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
