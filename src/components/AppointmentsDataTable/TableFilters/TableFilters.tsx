import { Table } from '@tanstack/react-table'

import CustomDatePicker from '@/components/CustomDatePicker'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface TableFiltersProps<TData> {
  table: Table<TData>
}

const TableFilters = <TData,>({ table }: TableFiltersProps<TData>) => {
  return (
    <div className="px-6 py-4 border-b">
      <div className="flex items-center justify-between gap-4 sm:flex-row flex-col sm:justify-start sm:items-start">
        <Input
          placeholder="Filtrar por nome"
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
        />
        <div className="w-full sm:w-auto">
          <CustomDatePicker
            isClearable
            selected={
              (table.getColumn('appointmentDate')?.getFilterValue() as Date) ??
              null
            }
            onChange={(date) => {
              if (!date) {
                table.getColumn('appointmentDate')?.setFilterValue(undefined)
              } else {
                table.getColumn('appointmentDate')?.setFilterValue(date)
              }
            }}
            placeholderText="Filtrar por data de agendamento"
            data-testid="date-picker-button"
          />
        </div>
        <Select
          value={
            (table
              .getColumn('vaccinationComplete')
              ?.getFilterValue() as string) ?? 'all'
          }
          onValueChange={(value) => {
            table.getColumn('vaccinationComplete')?.setFilterValue(value)
          }}
        >
          <SelectTrigger aria-label="Filtrar por status de vacinação">
            <SelectValue>
              {(() => {
                const value = table
                  .getColumn('vaccinationComplete')
                  ?.getFilterValue()
                if (value === 'all' || value === undefined) return 'Todos'
                return value === 'true' ? 'Vacinado' : 'Não vacinado'
              })()}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="true">Vacinado</SelectItem>
            <SelectItem value="false">Não vacinado</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default TableFilters
