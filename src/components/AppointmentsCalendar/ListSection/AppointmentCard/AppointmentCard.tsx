import { Appointment } from '@/@types/appointment'
import { cn } from '@/utils/cn'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import ActionsDropdown from '@/components/ActionsDropdown'
import { formatInTimeZone } from 'date-fns-tz'

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
          Aniversário:{' '}
          {formatInTimeZone(appointment.birthDay, 'UTC', 'dd/MM/yyyy')}
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
