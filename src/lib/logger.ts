type LogLevel = 'info' | 'warn' | 'error';

interface LogPayload {
  level: LogLevel;
  message: string;
  context?: string;
  metadata?: unknown;
}

function log({ level, message, context, metadata }: LogPayload) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    context,
    message,
    metadata,
  };

  // Por enquanto usamos console, mas centralizado.
  // No futuro pode ser enviado para serviço externo.
  if (level === 'error') {
    console.error(JSON.stringify(logEntry));
  } else if (level === 'warn') {
    console.warn(JSON.stringify(logEntry));
  } else {
    console.info(JSON.stringify(logEntry));
  }
}

export const logger = {
  info: (message: string, context?: string, metadata?: unknown) =>
    log({ level: 'info', message, context, metadata }),

  warn: (message: string, context?: string, metadata?: unknown) =>
    log({ level: 'warn', message, context, metadata }),

  error: (message: string, context?: string, metadata?: unknown) =>
    log({ level: 'error', message, context, metadata }),
};
