import { MESSAGES, buildResponse } from '@/constants/messages';
import { logger } from '@/lib/logger';

import { AppError } from './app-error';

const DEFAULT_CONTEXT = 'API handler';

export function handleApiError(error: unknown, context = DEFAULT_CONTEXT) {
  if (error instanceof AppError) {
    return buildResponse({
      success: false,
      message: error.message,
      status: error.statusCode,
      errors: error.errors ?? null,
    });
  }

  logger.error('Erro inesperado na API:', context, {
    error: error instanceof Error ? error.message : String(error),
  });

  return buildResponse({
    success: false,
    message: MESSAGES.GENERAL.INTERNAL_ERROR,
    status: 500,
    errors: null,
  });
}
