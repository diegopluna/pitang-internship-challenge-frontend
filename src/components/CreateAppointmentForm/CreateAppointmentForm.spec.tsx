import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import CreateAppointmentForm from './CreateAppointmentForm'
import { ModalProvider } from '@/contexts/ModalContext'

vi.mock('@/utils/api', () => ({
  default: {
    post: vi.fn(),
  },
  getErrorMessage: vi.fn(),
}))

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}))

describe('<CreateAppointmentForm />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render the form correctly', () => {
    render(
      <ModalProvider>
        <CreateAppointmentForm />
      </ModalProvider>,
    )

    expect(
      screen.getByText('Agende sua vacina para a COVID-19'),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Nome Completo')).toBeInTheDocument()
    expect(screen.getByText('Data de nascimento')).toBeInTheDocument()
    expect(screen.getByText('Data e hora do agendamento')).toBeInTheDocument()
    expect(screen.getAllByText('Selecione uma data')[0]).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Agendar' })).toBeInTheDocument()
  })

  it('should display error messages for invalid inputs', async () => {
    render(
      <ModalProvider>
        <CreateAppointmentForm />
      </ModalProvider>,
    )

    await userEvent.click(screen.getByRole('button', { name: 'Agendar' }))

    await waitFor(() => {
      expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument()
      expect(
        screen.getByText('Data de nascimento é obrigatória'),
      ).toBeInTheDocument()
      expect(
        screen.getByText('Data da consulta é obrigatória'),
      ).toBeInTheDocument()
    })
  })
})
