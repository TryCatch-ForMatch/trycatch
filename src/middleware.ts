import { NextRequest, NextResponse, MiddlewareConfig } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

const rotasPublicas = [
  { path: '/login', autenticado: 'redirect' },
  { path: '/register', autenticado: 'redirect' },
  { path: '/signup', autenticado: 'redirect' },
  { path: '/', autenticado: 'next' },
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname; //pega o path da requisição

  //pega o token do usuário logado
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  //encontra a rota pública
  const rotaPublica = rotasPublicas.find((rota) => path == rota.path);

  //se não tiver token e for rota publica, deixa passar
  if (!token && rotaPublica) return NextResponse.next();

  //se não tiver token e não for rota pblica, redireciona para login
  if (!token && !rotaPublica) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  //se tiver token e for rota pblica login/register, redireciona para dashboard
  if (token && rotaPublica && rotaPublica.autenticado === 'redirect') {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Desta forma iremos executar o middleware em todas as rotas, exceto:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
