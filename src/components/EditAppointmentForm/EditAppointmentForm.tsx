import { Appointment } from '@/@types/appointment'
import { useUpdateAppointmentForm } from '@/hooks/use-update-appointment-form'
import FormLayout from '@/layouts/FormLayout'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  filterAppointmentTime,
  getMaxTime,
  getMinDate,
  getMinTime,
} from '@/utils/dateUtils'
import { Switch } from '@/components/ui/switch'
import CustomDatePicker from '@/components/CustomDatePicker'

const EditAppointmentForm = ({ appointment }: { appointment: Appointment }) => {
  const { form, onSubmit, isLoading } = useUpdateAppointmentForm(appointment)

  return (
    <FormLayout
      title="Editar agendamento"
      description="Edite os dados do agendamento"
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      loadingMessage="Atualizando agendamento..."
      submitMessage="Atualizar agendamento"
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
                /// Birthday cannot be in the future
                futureYears={0}
                timeZone="UTC"
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
                // Get the minimum allowed date for an appointment
                minDate={getMinDate()}
                selected={field.value}
                onChange={(date) => {
                  // if not date is selected return early
                  if (!date) return
                  // set minutes, seconds and ms to 0
                  date.setMinutes(0, 0, 0)
                  // get the earliest possible time for the appointment
                  const minTime = getMinTime(date)
                  // get the latest possible time for the appointment
                  const maxTime = getMaxTime()

                  // if the earliest possible time is after the latest possible time, return early
                  if (minTime.getHours() > maxTime.getHours()) {
                    return
                  }

                  // if the selected time is before the earliest possible time, set the earliest possible time
                  if (date.getHours() < minTime.getHours()) {
                    date.setHours(minTime.getHours())
                  }

                  // set the selected time
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
      <FormField
        control={form.control}
        name="vaccinationComplete"
        render={({ field }) => (
          <FormItem className="grid gap-2s">
            <FormLabel>Vacinação concluída</FormLabel>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </FormLayout>
  )
}

export default EditAppointmentForm
