import { useMutation, useQueryClient } from '@tanstack/react-query'
import api, { handleApiError } from '@/utils/api'

import { useToast } from '@/contexts/ToastContext'


export const useToggleVaccinated = () => {
  const toast = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => api.patch(`/appointments/${id}/toggle-vaccinated`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] })
      toast.success('Status de vacinação atualizado com sucesso!')
    },
    onError: (error) => {
      toast.error('Erro ao atualizar status de vacinação!')
      throw handleApiError(error)
    }
  })
}