import { Calendar, Table } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'

import { LIST_APPOINTMENTS_VIEW_KEY } from '@/constants'
import { useGetAppointments } from '@/hooks/use-get-appointments'
import useLocalStorage from '@/hooks/use-local-storage'
import ErrorState from '@/components/ErrorState'
import ListLayout from '@/layouts/ListLayout'
import { columns } from '@/components/AppointmentsDataTable/columns'
import AppointmentsDataTable from '@/components/AppointmentsDataTable'
import AppointmentsCalendar from '@/components/AppointmentsCalendar'
import { Button } from '@/components/ui/button'

const ListAppointments = () => {
  const [view, setView] = useLocalStorage<'table' | 'calendar'>(
    LIST_APPOINTMENTS_VIEW_KEY,
    'calendar',
  )
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useGetAppointments()

  const handleRetry = () => {
    queryClient.refetchQueries({ queryKey: ['appointments'] })
  }

  const tabButton = (
    <div className="flex flex-col-reverse gap-y-3 z-[8000] fixed">
      <div className="relative">
        <Button
          variant="default"
          className="fixed bottom-20 right-6 rounded-full shadow-lg"
          onClick={() => setView(view === 'table' ? 'calendar' : 'table')}
        >
          {view === 'table' ? (
            <Calendar className="size-6" />
          ) : (
            <Table className="size-6" />
          )}
        </Button>
      </div>
    </div>
  )

  if (isLoading)
    return view === 'calendar' ? (
      <AppointmentsCalendar.Skeleton />
    ) : (
      <ListLayout
        title="Agendamentos de Vacinação"
        description="Carregando seus agendamentos de vacinação..."
      >
        <AppointmentsDataTable.Skeleton />
      </ListLayout>
    )

  if (error) return <ErrorState onRetry={handleRetry} />

  const sortedData = data!.sort((a, b) => {
    const dateComparison =
      new Date(a.appointmentDate).getTime() -
      new Date(b.appointmentDate).getTime()
    if (dateComparison !== 0) return dateComparison
    return a.name.localeCompare(b.name)
  })

  return view === 'calendar' ? (
    <>
      {tabButton}
      <AppointmentsCalendar appointments={sortedData} />
    </>
  ) : (
    <>
      {tabButton}
      <ListLayout
        title="Agendamentos de Vacinação"
        description="Gerencie e visualize seus agendamentos de vacinação."
      >
        <AppointmentsDataTable data={sortedData} columns={columns} />
      </ListLayout>
    </>
  )
}

export default ListAppointments
