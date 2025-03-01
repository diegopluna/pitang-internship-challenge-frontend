import { MoreHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Appointment } from '@/@types/appointment'
import { useToggleVaccinated } from '@/hooks/use-toggle-vaccinated'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

interface ActionsDropdownProps {
  appointment: Appointment
}

const ActionsDropdown = ({ appointment }: ActionsDropdownProps) => {
  const mutation = useToggleVaccinated()
  const navigate = useNavigate()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[8500]" align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => mutation.mutate(appointment.id)}
          disabled={mutation.isPending}
        >
          Marcar como{' '}
          {!appointment.vaccinationComplete ? 'vacinado' : 'não vacinado'}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => navigate(`/agendamentos/${appointment.id}/editar`)}
        >
          Editar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ActionsDropdown
