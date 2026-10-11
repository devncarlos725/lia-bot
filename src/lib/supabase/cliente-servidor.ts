import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/src/types/base-de-datos'
import type { ClienteSupabase } from './cliente-tipado'
import { obtenerVariablesSupabase } from './variables-de-entorno'

export async function crearClienteServidor(): Promise<ClienteSupabase> {
  const cookieStore = await cookies()
  const { url, clave } = obtenerVariablesSupabase()

  return createServerClient<Database>(url, clave, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // El método setAll se llamó desde un Server Component.
          // Se ignora si hay un middleware/proxy refrescando la sesión.
        }
      },
    },
  })
}