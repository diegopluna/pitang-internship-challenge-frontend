import { describe, it, expect, vi } from 'vitest'
import { faker } from '@faker-js/faker'
import userEvent from '@testing-library/user-event'

import { render, screen } from '@/utils/customRender'
import ActionsDropdown from '@/components/ActionsDropdown'

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => vi.fn(),
  MemoryRouter: ({ children }: { children: React.ReactNode }) => children,
  Link: ({ children }: { children: React.ReactNode }) => children,
}))

vi.mock('@/hooks/use-toggle-vaccinated', () => ({
  useToggleVaccinated: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
}))

describe('<ActionsDropdown />', () => {
  const mockAppointment = {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    birthDay: faker.date.birthdate(),
    appointmentDate: faker.date.future(),
    vaccinationComplete: faker.datatype.boolean(),
  }

  const renderComponent = () => {
    return render(<ActionsDropdown appointment={mockAppointment} />)
  }

  it('should render the actions dropdown button', () => {
    renderComponent()
    const dropdownButton = screen.getByRole('button', { name: /Abrir menu/i })
    expect(dropdownButton).toBeInTheDocument()
  })

  it('should open the dropdown menu when clicked', async () => {
    renderComponent()
    const user = userEvent.setup()
    const dropdownButton = screen.getByRole('button', { name: /Abrir menu/i })
    expect(dropdownButton).toBeInTheDocument()

    await user.click(dropdownButton)

    const dropdownContent = screen.getByRole('menu')
    expect(dropdownContent).toBeInTheDocument()

    expect(screen.getByText('Ações')).toBeInTheDocument()

    const toggleVaccinationButton = screen.getByRole('menuitem', {
      name: mockAppointment.vaccinationComplete
        ? /Marcar como não vacinado/i
        : /Marcar como vacinado/i,
    })
    expect(toggleVaccinationButton).toBeInTheDocument()
  })
})
