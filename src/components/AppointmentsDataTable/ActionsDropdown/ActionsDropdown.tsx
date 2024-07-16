import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Appointment } from '../columns'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { useToggleVaccinated } from '@/hooks/use-toggle-vaccinated'
import { Link } from 'react-router-dom'

const ActionsDropdown = ({ appointment }: { appointment: Appointment }) => {
  const { toggleVaccinated, isLoading } = useToggleVaccinated()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => toggleVaccinated(appointment.id)}
          disabled={isLoading}
        >
          Marcar como{' '}
          {!appointment.vaccinationComplete ? 'vacinado' : 'não vacinado'}
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to={`/agendamentos/${appointment.id}/editar`}>Editar</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ActionsDropdown
