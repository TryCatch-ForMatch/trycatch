import { NextRequest } from 'next/server';

export function getIdFromRequest(request: NextRequest) {
  return request.nextUrl.pathname.match(/\/([^/]+)$/)?.[1];
}
