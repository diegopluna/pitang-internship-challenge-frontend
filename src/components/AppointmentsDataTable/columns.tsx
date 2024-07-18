import { ColumnDef } from '@tanstack/react-table'
import { format, isSameDay } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Button } from '../ui/button'
import { ArrowUpDown } from 'lucide-react'
import { cn } from '@/utils/cn'
import ActionsDropdown from './ActionsDropdown'
import { Appointment } from '@/@types/appointment'

export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <div className="w-[200px]">
          <Button variant="ghost" onClick={() => column.toggleSorting()}>
            Nome
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.name}</div>
      </div>
    ),
  },
  {
    accessorKey: 'birthDay',
    header: ({ column }) => {
      return (
        <div className="w-[200px]">
          <Button variant="ghost" onClick={() => column.toggleSorting()}>
            Data de Nascimento
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => <div>{format(row.original.birthDay, 'dd/MM/yyyy')}</div>,
  },
  {
    accessorKey: 'appointmentDate',
    header: ({ column }) => {
      return (
        <div className="w-[200px]">
          <Button variant="ghost" onClick={() => column.toggleSorting()}>
            Data e Hora do Agendamento
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => (
      <div>{format(row.original.appointmentDate, 'dd/MM/yyyy HH:mm')}</div>
    ),
    filterFn: (row, id, value) => {
      return isSameDay(new Date(row.getValue(id)), value)
    },
  },
  {
    accessorKey: 'vaccinationComplete',
    header: ({ column }) => {
      return (
        <div className="w-[200px]">
          <Button variant="ghost" onClick={() => column.toggleSorting()}>
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => (
      <Badge
        className={cn('px-2 py-1 rounded-full inline-block', {
          'bg-green-100 text-green-800': row.original.vaccinationComplete,
          'bg-red-100 text-red-800': !row.original.vaccinationComplete,
        })}
      >
        {row.original.vaccinationComplete ? 'Vacinado' : 'Não vacinado'}
      </Badge>
    ),
    filterFn: (row, columnId, filterValue) => {
      if (filterValue === 'all') return true
      const rowValue = row.getValue(columnId)
      if (filterValue === 'true') return rowValue === true
      if (filterValue === 'false') return rowValue === false
      return true
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-right">Ações</div>,
    cell: ({ row }) => {
      const appointment = row.original
      return (
        <div className="text-right">
          <ActionsDropdown appointment={appointment} />
        </div>
      )
    },
  },
]
