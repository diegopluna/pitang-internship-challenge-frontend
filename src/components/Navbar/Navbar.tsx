import { cn } from '@/utils/cn'
import { APP_NAME } from '@/constants'
import { Cross, MenuIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const Navbar = () => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-background px-4 shadow-md">
      <Link to="/" className="flex items-center gap-2">
        <Cross className="size-6" data-testid="logo-icon" />
        <span className="font-bold">{APP_NAME}</span>
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
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="md:hidden">
            <MenuIcon className="size-6" />
            <span className="sr-only">Abrir Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-3/4 md:hidden">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription className="sr-only">
              Navegação principal do Vacina Fácil. Inclui links para agendar
              vacinas e ver lista de agendamentos.
            </SheetDescription>
          </SheetHeader>
          <nav className="grid gap-4 p-4">
            <Link
              to="/schedule"
              className={cn(
                'text-muted-foreground hover:text-primary',
                location.pathname === '/schedule' && 'text-primary',
              )}
              onClick={handleLinkClick}
            >
              Agendar
            </Link>
            <Link
              to="/list-appointments"
              className={cn(
                'text-muted-foreground hover:text-primary',
                location.pathname === '/list-appointments' && 'text-primary',
              )}
              onClick={handleLinkClick}
            >
              Lista de agendamentos
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}

export default Navbar
