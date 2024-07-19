import { forwardRef } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, Clock, X } from 'lucide-react'
import { registerLocale } from 'react-datepicker'

import { cn } from '@/utils/cn'
import { Button } from '@/components/ui/button'
import { formatInTimeZone } from 'date-fns-tz'

registerLocale('pt-BR', ptBR)

export interface CustomInputProps {
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
  timeZone?: string
}

const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
  (
    {
      onClick,
      isClearable,
      showTimeSelect,
      placeholderText,
      selected,
      onChange,
      timeZone,
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
          'w-full justify-start text-left font-normal h-fit text-wrap md:h-10 md:text-nowrap',
          !selected && 'text-muted-foreground',
          isClearable && 'pr-10',
        )}
      >
        <CalendarIcon className="mr-2 size-4" />
        {selected ? (
          <>
            {timeZone
              ? formatInTimeZone(selected, timeZone, 'PPP', { locale: ptBR })
              : format(selected, 'PPP', { locale: ptBR })}
            {showTimeSelect && (
              <>
                <Clock className="ml-2 mr-2 inline h-4 w-4" />
                {timeZone
                  ? formatInTimeZone(selected, timeZone, 'HH:mm')
                  : format(selected, 'HH:mm')}
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
          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-muted p-0 hover:bg-accent"
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

export default CustomInput
