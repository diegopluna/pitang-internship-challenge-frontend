import { HighlightDate } from 'react-datepicker/dist/date_utils'

import CustomDatePicker from '@/components/CustomDatePicker'
import { Skeleton } from '@/components/ui/skeleton'

interface CalendarSectionProps {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
  highlightedDays: HighlightDate[]
}

const CalendarSection = ({
  selectedDate,
  setSelectedDate,
  highlightedDays,
}: CalendarSectionProps) => {
  return (
    <div className="bg-muted text-muted-foreground p-4 border-b md:border-b-0 md:border-r md:p-6">
      <h2 className="text-lg font-semibold mb-4 md:text-xl">Calendário</h2>
      <div className="flex items-center justify-center">
        <CustomDatePicker
          highlightDates={highlightedDays}
          inline
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date as Date)}
        />
      </div>
      <div className="mt-4 space-y-2">
        <div className="text-sm text-muted-foreground">
          <span className="bg-yellow-100 w-3 h-3 inline-block rounded-full mr-2" />
          Dias parcialmente ocupados
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="bg-red-200 w-3 h-3 inline-block rounded-full mr-2" />
          Dias completamente ocupados
        </div>
      </div>
    </div>
  )
}

CalendarSection.Skeleton = () => (
  <div className="bg-muted text-muted-foreground p-4 border-b md:border-b-0 md:border-r md:p-6 md:w-80">
    <h2 className="text-lg font-semibold mb-4 md:text-xl">Calendário</h2>
    <Skeleton className="h-60 bg-background w-full" data-testid="skeleton" />
    <div className="mt-4 space-y-2">
      <div className="text-sm text-muted-foreground">
        <Skeleton className="h-4 w-3/4" data-testid="skeleton" />
      </div>
      <div className="text-sm text-muted-foreground">
        <Skeleton className="h-4 w-3/4" data-testid="skeleton" />
      </div>
    </div>
  </div>
)

export default CalendarSection
