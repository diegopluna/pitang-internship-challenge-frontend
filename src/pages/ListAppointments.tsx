import { columns } from '@/components/AppointmentsDataTable/columns'
import {
  DataTable,
  DataTableSkeleton,
} from '@/components/AppointmentsDataTable/AppointmentsDataTable'
import ErrorState from '@/components/ErrorState'
import { useGetAppointments } from '@/hooks/use-get-appointments'
import ListLayout from '@/layouts/ListLayout'
import { useQueryClient } from '@tanstack/react-query'

const ListAppointments = () => {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useGetAppointments()

  const handleRetry = () => {
    queryClient.refetchQueries({ queryKey: ['appointments'] })
  }

  if (isLoading)
    return (
      <ListLayout
        title="Agendamentos de Vacinação"
        description="Carregando seus agendamentos de vacinação..."
      >
        <DataTableSkeleton />
      </ListLayout>
    )

  if (error) return <ErrorState onRetry={handleRetry} />

  return (
    <ListLayout
      title="Agendamentos de Vacinação"
      description="Gerencie e visualize seus agendamentos de vacinação."
    >
      <DataTable data={data!} columns={columns} />
    </ListLayout>
  )
}

export default ListAppointments
