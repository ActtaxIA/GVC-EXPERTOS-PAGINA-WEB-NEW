import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'
import bcrypt from 'bcryptjs'
import { AdminSession } from '@/types/hospitals'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'gvc-expertos-admin-secret-key-2024'
)

const SESSION_DURATION = 60 * 60 * 24 * 7 // 7 días en segundos

/**
 * Hashea una contraseña
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

/**
 * Verifica una contraseña contra su hash
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

/**
 * Crea un token JWT para la sesión
 */
export async function createSessionToken(session: AdminSession): Promise<string> {
  return new SignJWT({
    userId: session.userId,
    email: session.email,
    name: session.name,
    role: session.role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(`${SESSION_DURATION}s`)
    .setIssuedAt()
    .sign(JWT_SECRET)
}

/**
 * Verifica y decodifica un token JWT
 */
export async function verifySessionToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as string,
      expiresAt: (payload.exp || 0) * 1000,
    }
  } catch {
    return null
  }
}

/**
 * Obtiene la sesión actual desde las cookies
 */
export async function getSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_session')?.value

  if (!token) {
    return null
  }

  return verifySessionToken(token)
}

/**
 * Guarda la sesión en cookies
 */
export async function setSession(session: AdminSession): Promise<void> {
  const token = await createSessionToken(session)
  const cookieStore = await cookies()
  
  cookieStore.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION,
    path: '/',
  })
}

/**
 * Elimina la sesión
 */
export async function clearSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
}

/**
 * Middleware helper para verificar autenticación
 */
export async function requireAuth(): Promise<AdminSession> {
  const session = await getSession()
  
  if (!session) {
    throw new Error('No autorizado')
  }

  if (session.expiresAt < Date.now()) {
    throw new Error('Sesión expirada')
  }

  return session
}
