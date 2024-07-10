import axios, { AxiosError } from "axios";
import env from "./env";

const api = axios.create({
  baseURL: env.VITE_API_URL,
})

interface ErrorIssue {
  _errors: string[];
}

interface ErrorResponse {
  message: string;
  issues?: Record<string, ErrorIssue>;
}

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ErrorResponse;
    if (data?.message === 'Erro de validação' && data.issues) {
      for (const [key, value] of Object.entries(data.issues)) {
        if (key !== '_errors' && Array.isArray(value._errors)) {
          return value._errors[0];
        }
      }
    }
    return data?.message || 'Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.';
  }
  return 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.';
};

export default api