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
                futureYears={0}
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
                timeIntervals={60}
                pastYears={0}
                minDate={getMinDate()}
                selected={field.value}
                onChange={(date) => {
                  if (!date) return
                  date.setMinutes(0, 0, 0)
                  const minTime = getMinTime(date)
                  const maxTime = getMaxTime()

                  if (minTime.getHours() > maxTime.getHours()) {
                    return
                  }

                  if (date.getHours() < minTime.getHours()) {
                    date.setHours(minTime.getHours())
                  } else if (date.getHours() === minTime.getHours()) {
                    date.setHours
                  }

                  field.onChange(date)
                }}
                minTime={getMinTime(field.value)}
                maxTime={getMaxTime()}
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
