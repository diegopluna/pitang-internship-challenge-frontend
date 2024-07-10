import { cn } from '@/utils/cn'

export const buttonStyles = {
  primary: cn(
    'inline-flex h-10 items-center justify-center rounded-md bg-primary',
    'px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90',
    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
  ),
  secondary: cn(
    'inline-flex h-10 items-center justify-center rounded-md bg-secondary',
    'px-8 text-sm font-medium text-secondary-foreground shadow transition-colors hover:bg-secondary/90',
    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
  ),
}