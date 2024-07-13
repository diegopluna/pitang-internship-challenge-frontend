import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import DatePicker from '@/components/DatePicker'
import { Loader2 } from 'lucide-react'
import { useCreateAppointmentForm } from '@/hooks/use-create=appointment-form'
import {
  getMinDate,
  getMinTime,
  getMaxTime,
  filterAppointmentTime,
} from '@/utils/date-utils'

const CreateAppointmentForm = () => {
  const { form, onSubmit, isLoading } = useCreateAppointmentForm()

  return (
    <Card className="max-w-md mx-auto p-6 sm:p-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Agende sua vacina para a COVID-19
        </CardTitle>
        <CardDescription>
          Preencha o formulário para marcar sua vacinação.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
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
                    <DatePicker
                      showYearDropdown
                      futureYears={0}
                      maxDate={new Date()}
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      ariaLabel="Data de nascimento"
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
                    <DatePicker
                      showYearDropdown
                      showTimeSelect
                      timeIntervals={60}
                      pastYears={0}
                      minDate={getMinDate()}
                      selected={field.value || getMinDate()}
                      onChange={(date) => field.onChange(date)}
                      minTime={getMinTime(field.value)}
                      maxTime={getMaxTime()}
                      filterTime={(time) =>
                        filterAppointmentTime(time, field.value || new Date())
                      }
                      ariaLabel="Data e hora do agendamento"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="size-4 mr-2 animate-spin" />}
              {isLoading ? 'Agendando...' : 'Agendar'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export default CreateAppointmentForm
