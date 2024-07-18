import * as React from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  Calendar as CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Clock,
  X,
} from 'lucide-react'
import ReactDatePicker, { registerLocale } from 'react-datepicker'

import { cn } from '@/utils/cn'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

registerLocale('pt-BR', ptBR)

export interface DatePickerProps {
  onChange: (date: Date | null | undefined) => void
  selected: Date | null
  className?: string
  showYearDropdown?: boolean
  pastYears?: number
  futureYears?: number
  minMonth?: number
  maxMonth?: number
  minDay?: number
  maxDay?: number
  showTimeSelect?: boolean
  timeFormat?: string
  timeIntervals?: number
  timeCaption?: string
  minTime?: Date
  maxTime?: Date
  minDate?: Date
  maxDate?: Date
  filterDate?: (date: Date) => boolean
  filterTime?: (time: Date) => boolean
  ariaLabel?: string
  placeholder?: string
  isClearable?: boolean
}

const DatePicker: React.FC<DatePickerProps> = ({
  onChange,
  selected,
  className,
  showYearDropdown = false,
  pastYears = 130,
  futureYears = 70,
  minMonth = 0,
  maxMonth = 11,
  minDay = 1,
  maxDay = 31,
  showTimeSelect = false,
  timeFormat = 'HH:mm',
  timeIntervals = 30,
  timeCaption = 'Horário',
  minTime,
  maxTime,
  minDate,
  maxDate,
  filterDate,
  filterTime,
  ariaLabel,
  placeholder,
  isClearable = false,
}) => {
  const currentYear = new Date().getUTCFullYear()
  const yearRange = Array.from(
    { length: pastYears + futureYears + 1 },
    (_, i) => currentYear - pastYears + i,
  )

  const getLastDayOfMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !selected && 'text-muted-foreground',
              isClearable && 'pr-10',
              className,
            )}
            aria-label={ariaLabel}
            data-testid="date-picker-button"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selected ? (
              <>
                {format(selected, 'PPP', { locale: ptBR })}
                {showTimeSelect && (
                  <>
                    <Clock className="ml-2 mr-2 inline h-4 w-4" />
                    {format(selected, timeFormat)}
                  </>
                )}
              </>
            ) : placeholder ? (
              <span>{placeholder}</span>
            ) : (
              <span>Selecione uma data{showTimeSelect && ' e hora'}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 bg-transparent border-none shadow-none"
          align="start"
        >
          <ReactDatePicker
            minDate={
              minDate || new Date(currentYear - pastYears, minMonth, minDay)
            }
            maxDate={
              maxDate ||
              new Date(
                currentYear + futureYears,
                maxMonth,
                Math.min(
                  maxDay,
                  getLastDayOfMonth(currentYear + futureYears, maxMonth),
                ),
              )
            }
            selected={selected}
            onChange={onChange}
            showYearDropdown={showYearDropdown}
            inline
            locale="pt-BR"
            wrapperClassName="w-full"
            showTimeSelect={showTimeSelect}
            timeFormat={timeFormat}
            timeIntervals={timeIntervals}
            timeCaption={timeCaption}
            minTime={minTime}
            maxTime={maxTime}
            dateFormat={`PPP${showTimeSelect ? ` ${timeFormat}` : ''}`}
            calendarClassName="react-datepicker-custom"
            timeClassName={() => 'react-datepicker__time-custom'}
            showPopperArrow={false}
            filterDate={filterDate}
            filterTime={filterTime}
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div className="flex items-center justify-between px-2 py-2">
                <Button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                  variant="outline"
                  className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <div className="flex items-center space-x-2">
                  <Select
                    value={date.getMonth().toString()}
                    onValueChange={(value) => changeMonth(parseInt(value, 10))}
                  >
                    <SelectTrigger className="w-[110px]">
                      <SelectValue placeholder="Selecione o mês" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
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
                      ].map((month, index) => (
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
                      <SelectValue placeholder="Selecione o ano" />
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
                  className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
              </div>
            )}
          />
        </PopoverContent>
      </Popover>
      {isClearable && selected && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-muted p-0 hover:bg-muted-foreground/20"
          onClick={(e) => {
            e.stopPropagation()
            onChange(undefined)
          }}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear date</span>
        </Button>
      )}
    </div>
  )
}

export default DatePicker
