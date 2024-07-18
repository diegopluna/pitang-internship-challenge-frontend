import { forwardRef } from 'react'
import DatePicker, { DatePickerProps, registerLocale } from 'react-datepicker'
import { Button } from '../ui/button'
import { cn } from '@/utils/cn'
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, X } from 'lucide-react'
import { format } from 'date-fns'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { ptBR } from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css'
import './CustomDatePicker.css'

registerLocale('pt-BR', ptBR)

export type CustomDatePickerProps = {
  pastYears?: number
  futureYears?: number
  minMonth?: number
  maxMonth?: number
} & DatePickerProps

interface CustomInputProps {
  value?: string
  onClick?: () => void
  isClearable?: boolean
  showTimeSelect?: boolean
  placeholderText?: string
  selected?: Date | null
  onChange?: (
    date: Date | null,
    event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
  ) => void
}

const CustomDatePickerInput = forwardRef<HTMLButtonElement, CustomInputProps>(
  (
    {
      onClick,
      isClearable,
      showTimeSelect,
      placeholderText,
      selected,
      onChange,
    },
    ref,
  ) => (
    <div className="relative w-full">
      <Button
        variant="outline"
        type="button"
        onClick={onClick}
        ref={ref}
        className={cn(
          'w-full justify-start text-left font-normal',
          !selected && 'text-muted-foreground',
          isClearable && 'pr-10',
        )}
      >
        <CalendarIcon className="mr-2 size-4" />
        {selected ? (
          <>
            {format(selected, 'PPP', { locale: ptBR })}
            {showTimeSelect && (
              <>
                <Clock className="ml-2 mr-2 inline h-4 w-4" />
                {format(selected, 'HH:mm')}
              </>
            )}
          </>
        ) : placeholderText ? (
          <span>{placeholderText}</span>
        ) : (
          <span>Selecione uma data{showTimeSelect && ' e hora'}</span>
        )}
      </Button>
      {isClearable && selected && onChange && (
        <Button
          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-muted p-0 hover:bg-muted-foreground/20"
          variant="outline"
          size="icon"
          onClick={(e) => {
            e.stopPropagation()
            onChange(null)
          }}
        >
          <X className="size-4" />
        </Button>
      )}
    </div>
  ),
)

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

const CustomDatePickerHeader = ({
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

const CustomDatePicker = ({
  pastYears = 130,
  futureYears = 70,
  minMonth = 0,
  maxMonth = 11,
  ...props
}: CustomDatePickerProps) => {
  const currentYear = new Date().getFullYear()
  const maxDay = props.maxDate?.getDate() || 31
  const minDay = props.minDate?.getDate() || 1
  const getLastDayOfMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }
  return (
    <DatePicker
      {...props}
      minDate={
        props.minDate || new Date(currentYear - pastYears, minMonth, minDay)
      }
      maxDate={
        props.maxDate ||
        new Date(
          currentYear + futureYears,
          maxMonth,
          Math.min(
            maxDay,
            getLastDayOfMonth(currentYear + futureYears, maxMonth),
          ),
        )
      }
      wrapperClassName="w-full"
      locale="pt-BR"
      isClearable={false}
      customInput={
        <CustomDatePickerInput
          placeholderText={props.placeholderText}
          isClearable={props.isClearable}
          selected={props.selected}
          showTimeSelect={props.showTimeSelect}
          onChange={props.onChange as CustomInputProps['onChange']}
        />
      }
      renderCustomHeader={(props) => (
        <CustomDatePickerHeader
          {...props}
          pastYears={pastYears}
          futureYears={futureYears}
          minMonth={minMonth}
          maxMonth={maxMonth}
        />
      )}
    />
  )
}

export default CustomDatePicker
