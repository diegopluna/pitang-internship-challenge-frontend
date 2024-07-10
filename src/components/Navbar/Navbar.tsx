import { Cross } from 'lucide-react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-background px-4 shadow-md">
      <Link to="/" className="flex items-center gap-2">
        <Cross className="size-6" />
        <span className="font-bold">Vacina Fácil</span>
      </Link>
    </header>
  )
}

export default Navbar
