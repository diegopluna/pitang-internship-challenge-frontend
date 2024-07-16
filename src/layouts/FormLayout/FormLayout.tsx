import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { Loader2 } from 'lucide-react'
import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form'

interface FormLayoutProps<T> {
  title: string
  description: string
  form: UseFormReturn<T extends FieldValues ? T : FieldValues>
  onSubmit: SubmitHandler<T extends FieldValues ? T : FieldValues>
  isLoading: boolean
  loadingMessage: string
  submitMessage: string
  children: React.ReactNode
}

const FormLayout = <T,>({
  title,
  description,
  form,
  onSubmit,
  isLoading,
  loadingMessage,
  submitMessage,
  children,
}: FormLayoutProps<T>) => {
  return (
    <Card className="max-w-md mx-auto p-6 sm:p-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">{children}</CardContent>
          <CardFooter>
            <Button className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="size-4 mr-2 animate-spin" />}
              {isLoading ? loadingMessage : submitMessage}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export default FormLayout
