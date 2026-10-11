import type { User } from '@supabase/supabase-js'
import type { Resultado } from '@/src/types/resultado'
import type { ClienteSupabase } from './cliente-tipado'

export async function obtenerUsuarioSesion(
  cliente: ClienteSupabase
): Promise<Resultado<User>> {
  const { data, error } = await cliente.auth.getUser()

  if (error || !data.user) {
    return { ok: false, error: 'Tenés que iniciar sesión.' }
  }

  return { ok: true, datos: data.user }
}
