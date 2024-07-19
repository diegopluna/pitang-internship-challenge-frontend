import { Calendar, Table } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'

import { LIST_APPOINTMENTS_VIEW_KEY } from '@/constants'
import { sortAppointments } from '@/utils/sortAppointments'
import { useGetAppointments } from '@/hooks/use-get-appointments'
import useLocalStorage from '@/hooks/use-local-storage'
import ErrorState from '@/components/ErrorState'
import TableLayout from '@/layouts/TableLayout'
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

  const toggleView = () => setView(view === 'table' ? 'calendar' : 'table')

  if (isLoading) return <LoadingState view={view} />
  if (error) return <ErrorState onRetry={handleRetry} />

  const sortedData = sortAppointments(data)

  return (
    <>
      <ViewToggleButton view={view} onToggle={toggleView} />
      {view === 'calendar' ? (
        <AppointmentsCalendar appointments={sortedData} />
      ) : (
        <TableLayout
          title="Agendamentos de Vacinação"
          description="Gerencie e visualize seus agendamentos de vacinação."
        >
          <AppointmentsDataTable data={sortedData} columns={columns} />
        </TableLayout>
      )}
    </>
  )
}

const LoadingState = ({ view }: { view: 'table' | 'calendar' }) =>
  view === 'calendar' ? (
    <AppointmentsCalendar.Skeleton />
  ) : (
    <TableLayout
      title="Agendamentos de Vacinação"
      description="Carregando seus agendamentos de vacinação..."
    >
      <AppointmentsDataTable.Skeleton />
    </TableLayout>
  )

const ViewToggleButton = ({
  view,
  onToggle,
}: {
  view: 'table' | 'calendar'
  onToggle: () => void
}) => (
  <div className="flex flex-col-reverse gap-y-3 z-[8000] fixed">
    <div className="relative">
      <Button
        variant="default"
        className="fixed bottom-20 right-6 rounded-full shadow-lg"
        onClick={onToggle}
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

export default ListAppointments
