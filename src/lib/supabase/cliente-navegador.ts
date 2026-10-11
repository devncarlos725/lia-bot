import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/src/types/base-de-datos'
import type { ClienteSupabase } from './cliente-tipado'
import { obtenerVariablesSupabase } from './variables-de-entorno'

export function crearClienteNavegador(): ClienteSupabase {
  const { url, clave } = obtenerVariablesSupabase()
  return createBrowserClient<Database>(url, clave)
}