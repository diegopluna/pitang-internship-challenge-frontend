import { Appointment } from '@/@types/appointment'
import ActionsDropdown from '@/components/ActionsDropdown'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { cn } from '@/utils/cn'
import { format } from 'date-fns'

interface AppointmentCardProps {
  appointment: Appointment
}

const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  return (
    <Card className="p-4 rounded-md">
      <div className="grid gap-4">
        <div className="font-semibold flex justify-between items-center">
          {appointment.name}
          <ActionsDropdown appointment={appointment} />
        </div>
        <div className="text-sm">
          Aniversário: {format(appointment.birthDay, 'dd/MM/yyyy')}
        </div>
        <Badge
          className={cn('px-2 py-1 rounded-full inline-block w-fit', {
            'bg-green-100 text-green-800': appointment.vaccinationComplete,
            'bg-red-100 text-red-800': !appointment.vaccinationComplete,
          })}
        >
          {appointment.vaccinationComplete ? 'Vacinado' : 'Não vacinado'}
        </Badge>
      </div>
    </Card>
  )
}

export default AppointmentCard
