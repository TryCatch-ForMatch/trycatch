import { isAxiosError } from 'axios';

type ApiErrorBody = {
  message?: string;
  error?: string;
};

export function getApiErrorMessage(error: unknown, fallback: string) {
  if (isAxiosError<ApiErrorBody>(error)) {
    const body = error.response?.data;
    return body?.message || body?.error || fallback;
  }

  return fallback;
}
