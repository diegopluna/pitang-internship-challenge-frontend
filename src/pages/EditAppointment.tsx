import { useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

import { useGetAppointment } from '@/hooks/use-get-appointment'
import EditAppointmentForm from '@/components/EditAppointmentForm'
import ErrorState from '@/components/ErrorState'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const EditAppointment = () => {
  const { id } = useParams()
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useGetAppointment(id!)

  const handleRetry = () => {
    queryClient.refetchQueries({ queryKey: ['appointment', id!] })
  }

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-8.1rem)]">
        <Card className="max-w-md mx-auto p-6 sm:p-8">
          <CardHeader>
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-72" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10" />
            </div>
            <div className="grid gap-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-10" />
            </div>
            <div className="grid gap-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-10" />
            </div>
            <div className="grid gap-2 flex-row items-center">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      </div>
    )

  if (error) return <ErrorState onRetry={handleRetry} />

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
      <EditAppointmentForm appointment={data!} />
    </div>
  )
}

export default EditAppointment
