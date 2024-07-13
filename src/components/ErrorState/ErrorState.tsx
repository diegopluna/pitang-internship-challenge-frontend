import { Button } from '@/components/ui/button'

interface ErrorStateProps {
  onRetry: () => void
}

const ErrorState: React.FC<ErrorStateProps> = ({ onRetry }) => {
  return (
    <div className="mx-auto max-w-md text-center">
      <div className="mx-auto h-12 w-12 text-primary" />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Ops, algo deu errado!
      </h1>
      <p className="mt-4 text-muted-foreground">
        Lamentamos, mas não conseguimos buscar os dados que você solicitou. Por
        favor, tente novamente mais tarde.
      </p>
      <div className="mt-6">
        <Button
          className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          onClick={onRetry}
        >
          Tentar novamente
        </Button>
      </div>
    </div>
  )
}

export default ErrorState
