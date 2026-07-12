import { handleApiError } from './handle-api-error';

type AsyncRouteHandler<TArgs extends unknown[]> = (
  ...args: TArgs
) => Promise<Response>;

export function withErrorHandling<TArgs extends unknown[]>(
  handler: AsyncRouteHandler<TArgs>,
  context?: string
) {
  return async (...args: TArgs) => {
    try {
      return await handler(...args);
    } catch (error) {
      return handleApiError(error, context);
    }
  };
}
