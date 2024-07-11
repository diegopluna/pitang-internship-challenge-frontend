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
import { z } from 'zod'
import DatePicker from '@/components/DatePicker'
import { format } from 'date-fns'
import api, { getErrorMessage } from '@/utils/api'
import { useModal } from '@/contexts/ModalContext'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { usePersistedForm } from '@/hooks/usePersistedForm'
import { APPOINTMENT_FORM_STORAGE_KEY } from '@/constants'

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
    .min(new Date(), {
      message: 'Data da consulta não pode ser menor que a data atual',
    }),
})

const CreateAppointmentForm = () => {
  const { openModal } = useModal()
  const [isLoading, setIsLoading] = useState(false)

  const form = usePersistedForm<z.infer<typeof formSchema>>(
    APPOINTMENT_FORM_STORAGE_KEY,
    {
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: '',
        birthDay: undefined,
        appointmentDate: undefined,
      },
    },
  )

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
        form.reset({
          name: '',
          birthDay: undefined,
          appointmentDate: undefined,
        })
        localStorage.removeItem(APPOINTMENT_FORM_STORAGE_KEY)
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

  const getMinTime = (selectedDate: Date | null) => {
    const now = new Date()
    if (selectedDate && selectedDate.toDateString() === now.toDateString()) {
      const minTime = getLocalizedMinTime()
      if (now > minTime) {
        return now
      }
      return minTime
    }
    return getLocalizedMinTime()
  }

  const getMinDate = () => {
    const now = new Date()
    const maxTime = getLocalizedMaxTime()

    if (now > maxTime) {
      now.setDate(now.getDate() + 1)
      now.setUTCHours(0, 0, 0, 0)
    }

    return now
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
                      maxDate={new Date()}
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
                      minDate={getMinDate()}
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      minTime={getMinTime(field.value)}
                      maxTime={getLocalizedMaxTime()}
                      filterTime={(time) => {
                        const selectedDate = field.value || new Date()
                        const now = new Date()
                        if (
                          selectedDate.toDateString() === now.toDateString()
                        ) {
                          return time >= getMinTime(selectedDate)
                        }
                        return true
                      }}
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
