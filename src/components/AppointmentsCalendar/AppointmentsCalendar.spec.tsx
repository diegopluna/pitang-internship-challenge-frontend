import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker'

import { Appointment } from '@/@types/appointment'
import { render, screen } from '@/utils/customRender'
import AppointmentsCalendar from '@/components/AppointmentsCalendar'

describe('<AppointmentsCalendar />', () => {
  const mockAppointments: Appointment[] = [
    {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      birthDay: faker.date.birthdate(),
      appointmentDate: new Date(),
      vaccinationComplete: false,
    },
    {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      birthDay: faker.date.birthdate(),
      appointmentDate: new Date(),
      vaccinationComplete: true,
    },
  ]

  it('should render the calendar and appointments list', () => {
    render(<AppointmentsCalendar appointments={mockAppointments} />)

    expect(screen.getByText('Calendário')).toBeInTheDocument()
    expect(
      screen.getByRole('dialog', { name: 'Choose Date' }),
    ).toBeInTheDocument()
    expect(screen.getByTestId('appointments-list')).toBeInTheDocument()
  })

  it('displays "Nenhum agendamento encontrado" when there are no appointments for the selected date', () => {
    const emptyAppointments: Appointment[] = []
    render(<AppointmentsCalendar appointments={emptyAppointments} />)

    expect(
      screen.getByText('Nenhum agendamento encontrado'),
    ).toBeInTheDocument()
  })

  it('renders the correct variant for vaccination status', () => {
    render(<AppointmentsCalendar appointments={mockAppointments} />)

    const notVaccinatedBadge = screen.getByText('Não vacinado')
    const vaccinatedBadge = screen.getByText('Vacinado')

    expect(notVaccinatedBadge).toHaveClass('bg-red-100 text-red-800')
    expect(vaccinatedBadge).toHaveClass('bg-green-100 text-green-800')
  })

  it('renders the Skeleton component when in loading state', () => {
    render(<AppointmentsCalendar.Skeleton />)

    const skeletonElements = screen.getAllByTestId('skeleton')
    expect(skeletonElements.length).toBeGreaterThan(0)
  })
})
