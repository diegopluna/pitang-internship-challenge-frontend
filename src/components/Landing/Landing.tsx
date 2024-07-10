import { Link } from 'react-router-dom'
import landingImage from '@/assets/images/landing.svg'

const Landing = () => {
  return (
    <main className="flex-1">
      <section className="w-full pt-12 md:pt-24 lg:pt-32">
        <div className="container grid gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4rem]">
                Agende sua vacina da COVID-19 com facilidade
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Não espere, agende sua vacina para a COVID-19 hoje. Nosso
                agendador fácil de usar torna simples encontrar um horário
                conveniente.
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                to="/schedule"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary 
                px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 
                focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Agendar Vacina
              </Link>
              <Link
                to="/list-appointments"
                className="inline-flex h-10 items-center justify-center rounded-md bg-secondary
                px-8 text-sm font-medium text-secondary-foreground shadow transition-colors hover:bg-secondary/90 
                focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Ver Agendamentos
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={landingImage}
              width="600"
              height="600"
              alt="Ilustração da vacinação"
              className="mx-auto aspect-square w-full object-cover object-center"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Designed by{' '}
              <a
                href="https://www.freepik.com"
                target="_blank"
                className="hover:underline"
              >
                Freepik
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Landing
