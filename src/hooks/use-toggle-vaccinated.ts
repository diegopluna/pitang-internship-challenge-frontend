import { useState } from 'react'
import api, { handleApiError } from '@/utils/api'
import { useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/contexts/ToastContext'


export const useToggleVaccinated = () => {
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()

  const toggleVaccinated = async (id: string) => {
    setIsLoading(true)
    try {
      await api.patch(`/appointments/${id}/toggle-vaccinated`)
      queryClient.invalidateQueries({ queryKey: ['appointments'] })
      toast.success('Status de vacinação atualizado com sucesso!')
    } catch( error) {
      toast.error('Erro ao atualizar status de vacinação!')
      throw handleApiError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return { toggleVaccinated, isLoading }
}