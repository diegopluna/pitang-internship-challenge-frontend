import { COPYRIGHT_YEAR, APP_NAME } from '@/constants'

const Footer = () => {
  return (
    <footer className="bg-background py-6 w-full shrink-0 items-center px-4 md:px-6 border-t mt-auto">
      <p className="text-xs text-muted-foreground">
        &copy; {COPYRIGHT_YEAR} {APP_NAME}. Todos os direitos reservados.
      </p>
    </footer>
  )
}

export default Footer
