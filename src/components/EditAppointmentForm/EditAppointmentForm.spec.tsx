import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EditAppointmentForm from './EditAppointmentForm'
import { ModalProvider } from '@/contexts/ModalContext'
import { faker } from '@faker-js/faker'

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(),
}))

describe('<EditAppointmentForm />', () => {
  const appointment = {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    birthDay: faker.date.birthdate(),
    appointmentDate: faker.date.future(),
    vaccinationComplete: faker.datatype.boolean(),
  }

  it('should render the form correctly with pre-filled data', () => {
    const appointment = {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      birthDay: faker.date.birthdate(),
      appointmentDate: faker.date.future(),
      vaccinationComplete: faker.datatype.boolean(),
    }

    render(
      <ModalProvider>
        <EditAppointmentForm appointment={appointment} />
      </ModalProvider>,
    )

    expect(screen.getByText('Editar agendamento')).toBeInTheDocument()
    expect(screen.getByLabelText('Nome Completo')).toHaveValue(appointment.name)
    expect(screen.getByText('Data de nascimento')).toBeInTheDocument()
    expect(screen.getByText('Data e hora do agendamento')).toBeInTheDocument()
    expect(screen.getByText('Vacinação concluída')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Atualizar agendamento' }),
    ).toBeInTheDocument()
  })

  it('should display error messages for invalid inputs', async () => {
    render(
      <ModalProvider>
        <EditAppointmentForm appointment={appointment} />
      </ModalProvider>,
    )

    const nameInput = screen.getByLabelText('Nome Completo')
    await userEvent.clear(nameInput)

    await userEvent.click(
      screen.getByRole('button', { name: 'Atualizar agendamento' }),
    )

    await waitFor(() => {
      expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument()
    })
  })
})
