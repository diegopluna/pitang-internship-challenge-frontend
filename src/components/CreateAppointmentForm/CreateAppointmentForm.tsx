import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCreateAppointmentForm } from '@/hooks/use-create-appointment-form'
import {
  getMinDate,
  getMinTime,
  getMaxTime,
  filterAppointmentTime,
} from '@/utils/dateUtils'
import FormLayout from '@/layouts/FormLayout'
import CustomDatePicker from '../CustomDatePicker'

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
                timeCaption="Horário"
                minDate={getMinDate()}
                selected={field.value || getMinDate()}
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
    </FormLayout>
  )
}

export default CreateAppointmentForm
