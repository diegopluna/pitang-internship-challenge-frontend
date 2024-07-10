import { screen, fireEvent, act } from '@testing-library/react'
import { render } from '@/utils/customRender'
import Modal from './Modal'
import { ModalProvider, useModal } from '@/contexts/ModalContext'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}))

const TestComponent = () => {
  const { openModal } = useModal()

  return (
    <button onClick={() => openModal('Test message', false)}>Open Modal</button>
  )
}

describe('Modal', () => {
  it('renders correctly when opened', () => {
    render(
      <ModalProvider>
        <TestComponent />
        <Modal />
      </ModalProvider>,
    )

    fireEvent.click(screen.getByText('Open Modal'))

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Sucesso!')).toBeInTheDocument()
    expect(screen.getByText('Test message')).toBeInTheDocument()
  })

  it('renders error state correctly', () => {
    let openModalFunction: (message: string, isError: boolean) => void

    const TestComponentWithHook = () => {
      const { openModal } = useModal()
      openModalFunction = openModal
      return null
    }

    render(
      <ModalProvider>
        <TestComponentWithHook />
        <Modal />
      </ModalProvider>,
    )
    act(() => {
      openModalFunction('Error message', true)
    })

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Erro!')).toBeInTheDocument()
    expect(screen.getByText('Error message')).toBeInTheDocument()
  })

  it('closes when the close button is clicked', () => {
    render(
      <ModalProvider>
        <TestComponent />
        <Modal />
      </ModalProvider>,
    )

    fireEvent.click(screen.getByText('Open Modal'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /fechar/i }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('displays the correct icon based on error state', () => {
    let openModalFunction: (message: string, isError: boolean) => void

    const TestComponentWithHook = () => {
      const { openModal } = useModal()
      openModalFunction = openModal
      return null
    }

    render(
      <ModalProvider>
        <TestComponentWithHook />
        <Modal />
      </ModalProvider>,
    )

    act(() => {
      openModalFunction('Success message', false)
    })
    expect(screen.getByTestId('success-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('error-icon')).not.toBeInTheDocument()

    act(() => {
      openModalFunction('Error message', true)
    })
    expect(screen.getByTestId('error-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('success-icon')).not.toBeInTheDocument()
  })
})
