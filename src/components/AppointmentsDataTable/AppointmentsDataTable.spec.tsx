import { screen, fireEvent, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '@/utils/customRender'
import { columns } from '@/components/AppointmentsDataTable/columns'
import { DataTable } from '@/components/AppointmentsDataTable/AppointmentsDataTable'
import { faker } from '@faker-js/faker'
import { format } from 'date-fns'

const generateMockAppointments = (count: number) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    birthDay: faker.date.birthdate(),
    appointmentDate: faker.date.future(),
    vaccinationComplete: faker.datatype.boolean(),
  }))
}

describe('AppointmentsDataTable', () => {
  it('renders the table with correct headers and data', () => {
    const mockData = generateMockAppointments(5)
    render(<DataTable columns={columns} data={mockData} />)

    expect(screen.getByText('Nome')).toBeInTheDocument()
    expect(screen.getByText('Data de Nascimento')).toBeInTheDocument()
    expect(screen.getByText('Data e Hora do Agendamento')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Ações')).toBeInTheDocument()

    mockData.forEach((appointment) => {
      const row = screen.getByText(appointment.name).closest('tr')
      if (!row) throw new Error('Row not found')

      expect(within(row).getByText(appointment.name)).toBeInTheDocument()
      expect(
        within(row).getByText(format(appointment.birthDay, 'dd/MM/yyyy')),
      ).toBeInTheDocument()
      expect(
        within(row).getByText(
          format(appointment.appointmentDate, 'dd/MM/yyyy HH:mm'),
        ),
      ).toBeInTheDocument()
      expect(
        within(row).getByText(
          appointment.vaccinationComplete ? 'Vacinado' : 'Não vacinado',
        ),
      ).toBeInTheDocument()
    })
  })

  it('filters the table by name', async () => {
    const mockData = generateMockAppointments(10)
    render(<DataTable columns={columns} data={mockData} />)

    const filterInput = screen.getByPlaceholderText('Filtrar por nome')
    const targetName = mockData[0].name
    fireEvent.change(filterInput, { target: { value: targetName } })

    await waitFor(() => {
      expect(screen.getByText(targetName)).toBeInTheDocument()
      mockData.slice(1).forEach((appointment) => {
        expect(screen.queryByText(appointment.name)).not.toBeInTheDocument()
      })
    })
  })

  it('sorts the table by name', async () => {
    const user = userEvent.setup()
    const mockData = generateMockAppointments(10)
    render(<DataTable columns={columns} data={mockData} />)

    const nameHeader = screen.getByRole('button', { name: /nome/i })

    const originalNames = screen
      .getAllByRole('row')
      .slice(1) // Skip header row
      .map((row) => row.querySelector('td')?.textContent)
      .filter(Boolean)

    await user.click(nameHeader)

    await waitFor(
      () => {
        const sortedNames = [...mockData]
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((a) => a.name)
        const displayedNames = screen
          .getAllByRole('row')
          .slice(1)
          .map((row) => row.querySelector('td')?.textContent)
          .filter(Boolean)

        expect(displayedNames).toEqual(sortedNames)
      },
      { timeout: 2000 },
    )

    await user.click(nameHeader)

    await waitFor(
      () => {
        const sortedNames = [...mockData]
          .sort((a, b) => b.name.localeCompare(a.name))
          .map((a) => a.name)
        const displayedNames = screen
          .getAllByRole('row')
          .slice(1)
          .map((row) => row.querySelector('td')?.textContent)
          .filter(Boolean)

        expect(displayedNames).toEqual(sortedNames)
      },
      { timeout: 2000 },
    )

    await user.click(nameHeader)

    await waitFor(
      () => {
        const displayedNames = screen
          .getAllByRole('row')
          .slice(1)
          .map((row) => row.querySelector('td')?.textContent)
          .filter(Boolean)

        expect(displayedNames).toEqual(originalNames)
      },
      { timeout: 2000 },
    )
  })

  it('paginates the table', async () => {
    const mockData = generateMockAppointments(15)
    render(<DataTable columns={columns} data={mockData} />)

    expect(screen.getByText('Página 1 de 2')).toBeInTheDocument()
    expect(screen.getByText('Próxima')).toBeEnabled()
    expect(screen.getByText('Anterior')).toBeDisabled()

    fireEvent.click(screen.getByText('Próxima'))

    await waitFor(() => {
      expect(screen.getByText('Página 2 de 2')).toBeInTheDocument()
      expect(screen.getByText('Próxima')).toBeDisabled()
      expect(screen.getByText('Anterior')).toBeEnabled()
    })
  })
})
