import { ptBR } from 'date-fns/locale'
import DatePicker, { DatePickerProps, registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import CustomInput, { CustomInputProps } from './CustomInput'
import CustomHeader from './CustomHeader'
import './CustomDatePicker.css'

registerLocale('pt-BR', ptBR)

export type CustomDatePickerProps = {
  pastYears?: number
  futureYears?: number
  minMonth?: number
  maxMonth?: number
} & DatePickerProps

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
        <CustomInput
          placeholderText={props.placeholderText}
          isClearable={props.isClearable}
          selected={props.selected}
          showTimeSelect={props.showTimeSelect}
          onChange={props.onChange as CustomInputProps['onChange']}
        />
      }
      renderCustomHeader={(props) => (
        <CustomHeader
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
