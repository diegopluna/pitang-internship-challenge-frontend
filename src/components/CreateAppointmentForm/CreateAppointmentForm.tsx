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
import api, { getErrorMessage } from '@/utils/api'
import { useModal } from '@/contexts/ModalContext'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: 'Nome é obrigatório',
  }),
  birthDay: z
    .date({
      message: 'Data de nascimento é obrigatória',
    })
    .max(new Date(), {
      message: 'Data de nascimento não pode ser maior que a data atual',
    }),
  appointmentDate: z
    .date({
      message: 'Data da consulta é obrigatória',
    })
    .min(new Date(new Date()), {
      message: 'Data da consulta não pode ser menor que a data atual',
    }),
})

const CreateAppointmentForm = () => {
  const { openModal } = useModal()
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      birthDay: undefined,
      appointmentDate: undefined,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, birthDay, appointmentDate } = values
    setIsLoading(true)
    await api
      .post('/appointments', {
        name,
        birthDay: format(birthDay, 'yyyy-MM-dd'),
        appointmentDate: appointmentDate.getTime(),
      })
      .then(() => {
        setIsLoading(false)
        openModal('Agendamento realizado com sucesso', false)
        form.reset()
      })
      .catch((error) => {
        setIsLoading(false)
        const message = getErrorMessage(error)
        openModal(message, true)
      })
  }

  const getLocalizedMinTime = () => {
    const date = new Date()
    date.setUTCHours(9, 0, 0, 0)
    return date
  }

  const getLocalizedMaxTime = () => {
    const date = new Date()
    date.setUTCHours(22, 0, 0, 0)
    return date
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
                      minTime={getLocalizedMinTime()}
                      maxTime={getLocalizedMaxTime()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              disabled={isLoading || !form.formState.isValid}
            >
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
