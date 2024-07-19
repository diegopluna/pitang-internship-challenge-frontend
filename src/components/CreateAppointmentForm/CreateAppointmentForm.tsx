import { useCreateAppointmentForm } from '@/hooks/use-create-appointment-form'
import {
  getMinDate,
  getMinTime,
  getMaxTime,
  filterAppointmentTime,
} from '@/utils/dateUtils'
import FormLayout from '@/layouts/FormLayout'
import CustomDatePicker from '@/components/CustomDatePicker'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const CreateAppointmentForm = () => {
  const { form, onSubmit, isLoading } = useCreateAppointmentForm()

  return (
    <FormLayout
      title="Agende sua vacina para a COVID-19"
      description="Preencha o formulário para marcar sua vacinação."
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      loadingMessage="Agendando..."
      submitMessage="Agendar"
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome Completo</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="birthDay"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Data de nascimento</FormLabel>
            <FormControl>
              <CustomDatePicker
                futureYears={0}
                // Birthday cannot be in the future
                maxDate={new Date()}
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                ariaDescribedBy="Data de nascimento"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="appointmentDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Data e hora do agendamento</FormLabel>
            <FormControl>
              <CustomDatePicker
                showTimeSelect
                // Only allow time intervals of 60 minutes
                timeIntervals={60}
                // Past years are not allowed
                pastYears={0}
                timeCaption="Horário"
                // Get the minimum allowed date for an appointment
                minDate={getMinDate()}
                // If no date is selected, set the minimum date
                selected={field.value || getMinDate()}
                onChange={(date) => {
                  // if not date is selected return early
                  if (!date) return
                  // set minutes, seconds and ms to 0
                  date.setMinutes(0, 0, 0)
                  // get the earliest possible time for the appointment
                  const minTime = getMinTime(date)
                  // get the latest possible time for the appointment
                  const maxTime = getMaxTime()

                  // If the earliest possible time is after the latest possible time, return early
                  if (minTime.getHours() > maxTime.getHours()) {
                    return
                  }

                  // If the selected time is before the earliest possible time, set the earliest possible time
                  if (date.getHours() < minTime.getHours()) {
                    date.setHours(minTime.getHours())
                  }

                  // Set the selected time
                  field.onChange(date)
                }}
                // Get the minimum allowed time for an appointment
                minTime={getMinTime(field.value)}
                // Get the maximum allowed time for an appointment
                maxTime={getMaxTime()}
                // Filter the time for an appointment based on the selected date
                filterTime={(time) =>
                  filterAppointmentTime(time, field.value || new Date())
                }
                ariaDescribedBy="Data e hora do agendamento"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </FormLayout>
  )
}

export default CreateAppointmentForm
