import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { URL_PARAMETRO } from './app/_lib/constantes'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Redirigir /unidad sin slug a /buscar?categoria=todas
  if (pathname === '/unidad') {
    return NextResponse.redirect(new URL('/buscar?categoria=todas', request.url), 308);
  }

  // Redirigir /buscar a /buscar?categoria=todas
  if (
    request.nextUrl.pathname === '/buscar'
    && !request.nextUrl.searchParams
      .keys()
      .some(key => [URL_PARAMETRO.CATEGORIA, URL_PARAMETRO.TERMINO, URL_PARAMETRO.MARCA].includes(key as URL_PARAMETRO))
  ) {
    return NextResponse.redirect(new URL('/buscar?categoria=todas', request.url), 308);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/unidad', '/buscar'],
}
