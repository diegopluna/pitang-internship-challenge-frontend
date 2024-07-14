import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface ListLayoutProps {
  title: string
  description: string
  children: React.ReactNode
}

const ListLayout = ({ title, description, children }: ListLayoutProps) => (
  <Card className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 my-8">
    <CardHeader className="mb-6">
      <CardTitle className="text-3xl font-bold">{title}</CardTitle>
      <CardDescription className="text-muted-foreground">
        {description}
      </CardDescription>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
)

export default ListLayout
