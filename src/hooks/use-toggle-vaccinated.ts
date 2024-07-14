import { useState } from 'react'
import api, { handleApiError } from '@/utils/api'
import { useQueryClient } from '@tanstack/react-query'


export const useToggleVaccinated = () => {
  const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()

  const toggleVaccinated = async (id: string) => {
    setIsLoading(true)
    try {
      await api.patch(`/appointments/${id}/toggle-vaccinated`)
      queryClient.invalidateQueries({ queryKey: ['appointments'] })
    } catch( error) {
      throw handleApiError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return { toggleVaccinated, isLoading }
}