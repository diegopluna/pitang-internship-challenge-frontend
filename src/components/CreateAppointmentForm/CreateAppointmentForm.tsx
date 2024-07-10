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
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import DatePicker from '@/components/DatePicker'
import { format } from 'date-fns'
import axios from 'axios'

const formSchema = z.object({
  name: z.string().trim().min(1),
  birthDay: z.date().max(new Date(), {
    message: 'Data de nascimento não pode ser maior que a data atual',
  }),
  appointmentDate: z.date().min(new Date(), {
    message: 'Data da consulta não pode ser menor que a data atual',
  }),
})

const CreateAppointmentForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      birthDay: undefined,
      appointmentDate: undefined,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    const { name, birthDay, appointmentDate } = values
    const response = await axios.post(
      'http://localhost:3000/api/appointments/',
      {
        name,
        birthDay: format(birthDay, 'yyyy-MM-dd'),
        appointmentDate: appointmentDate.getTime(),
      },
    )
    console.log(response)
  }

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
                      maxMonth={new Date().getMonth()}
                      maxDay={31}
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
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
                      minMonth={new Date().getMonth()}
                      minDay={new Date().getDate()}
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      minTime={new Date(0, 0, 0, 6, 0)}
                      maxTime={new Date(0, 0, 0, 20, 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button className="w-full">Agendar</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export default CreateAppointmentForm
