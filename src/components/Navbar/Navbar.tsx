import { cn } from '@/utils/cn'
import { Cross } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-background px-4 shadow-md">
      <Link to="/" className="flex items-center gap-2">
        <Cross className="size-6" data-testid="logo-icon" />
        <span className="font-bold">Vacina Fácil</span>
      </Link>
      <nav className="ml-auto hidden md:flex md:gap-4">
        <Link
          to="/schedule"
          className={cn(
            'text-muted-foreground hover:text-primary',
            location.pathname === '/schedule' && 'text-primary',
          )}
        >
          Agendar
        </Link>
        <Link
          to="/list-appointments"
          className={cn(
            'text-muted-foreground hover:text-primary',
            location.pathname === '/list-appointments' && 'text-primary',
          )}
        >
          Lista de agendamentos
        </Link>
      </nav>
    </header>
  )
}

export default Navbar
