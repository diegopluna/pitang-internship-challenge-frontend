import axios, { AxiosError } from "axios";

import env from "./env";

const api = axios.create({
  baseURL: env.VITE_API_URL,
})

interface ApiErrorResponse {
  message: string
  errors?: Record<string, string[]>
}

export class AppError extends Error {
  constructor(
    public message: string,
    public code?: string,
    public details?: Record<string, string[]>
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export function handleApiError(error: unknown): AppError {
  if (error instanceof AxiosError && error.response) {
    const data = error.response.data as ApiErrorResponse
    return new AppError(
      data.message || 'Ocorreu um erro inesperado',
      error.response.status.toString(),
      data.errors
    )
  } else if (error instanceof Error) {
    return new AppError(error.message)
  } else {
    return new AppError('Ocorreu um erro inesperado')
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) {
    return error.message
  } else if (error instanceof Error) {
    return error.message
  } else {
    return 'Ocorreu um erro inesperado'
  }
}

export default api