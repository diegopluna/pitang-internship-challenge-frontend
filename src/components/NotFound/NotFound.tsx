import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import NotFoundImage from '@/assets/images/404.svg'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md text-center pt-10">
      <img
        src={NotFoundImage}
        width={200}
        height={200}
        alt="ilustração 404"
        className="mx-auto"
      />
      <h1 className="mt-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Ops, página não encontrada!
      </h1>
      <p className="mt-4 text-muted-foreground">
        A página que você está procurando parece não existir. Não se preocupe,
        você pode voltar para a página inicial e tentar novamente.
      </p>
      <div className="mt-6">
        <Button asChild>
          <Link to="/">Ir para a Página Inicial</Link>
        </Button>
      </div>
    </div>
  )
}
