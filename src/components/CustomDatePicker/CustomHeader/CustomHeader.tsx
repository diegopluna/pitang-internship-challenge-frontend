import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type CustomDatePickerHeaderProps = {
  date: Date
  changeYear: (value: number) => void
  pastYears: number
  futureYears: number
  changeMonth: (value: number) => void
  decreaseMonth: () => void
  increaseMonth: () => void
  prevMonthButtonDisabled: boolean
  nextMonthButtonDisabled: boolean
  minMonth: number
  maxMonth: number
}

const CustomHeader = ({
  date,
  changeYear,
  pastYears,
  futureYears,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  minMonth,
  maxMonth,
}: CustomDatePickerHeaderProps) => {
  const currentYear = new Date().getFullYear()
  const yearRange = Array.from(
    { length: pastYears + futureYears + 1 },
    (_, i) => currentYear - pastYears + i,
  )

  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]

  return (
    <div className="flex items-center justify-between px-2 py-2">
      <Button
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        variant="outline"
        className="size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
      >
        <ChevronLeft className="size-4" />
      </Button>
      <div
        className="flex items-center space-x-2"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <Select
          value={date.getMonth().toString()}
          onValueChange={(value) => changeMonth(parseInt(value, 10))}
        >
          <SelectTrigger className="w-[110px]">
            <SelectValue placeholder="Mês" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month, index) => (
              <SelectItem
                key={month}
                value={index.toString()}
                disabled={index < minMonth || index > maxMonth}
              >
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={date.getFullYear().toString()}
          onValueChange={(value) => changeYear(parseInt(value, 10))}
        >
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder="Ano" />
          </SelectTrigger>
          <SelectContent>
            {yearRange.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        variant="outline"
        className="size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  )
}

export default CustomHeader
