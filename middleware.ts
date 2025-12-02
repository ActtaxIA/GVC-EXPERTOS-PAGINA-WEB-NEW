import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'gvc-expertos-admin-secret-key-2024'
)

// Rutas que requieren autenticación
const PROTECTED_ROUTES = ['/admin']
const PUBLIC_ADMIN_ROUTES = ['/admin/login']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Verificar si es una ruta protegida de admin
  const isProtectedRoute = PROTECTED_ROUTES.some(route => 
    pathname.startsWith(route) && !PUBLIC_ADMIN_ROUTES.includes(pathname)
  )

  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  // Verificar token de sesión
  const token = request.cookies.get('admin_session')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  try {
    await jwtVerify(token, JWT_SECRET)
    return NextResponse.next()
  } catch {
    // Token inválido o expirado
    const response = NextResponse.redirect(new URL('/admin/login', request.url))
    response.cookies.delete('admin_session')
    return response
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}
