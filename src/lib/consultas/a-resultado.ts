import type { PostgrestError } from '@supabase/supabase-js'
import type { Resultado } from '@/src/types/resultado'
import { mensajeErrorSupabase } from '@/src/lib/supabase/mensaje-error'

export function aResultado<T>(
  data: T | null,
  error: PostgrestError | null,
  mensajeVacio = 'No se encontró el registro.'
): Resultado<T> {
  if (error) {
    return { ok: false, error: mensajeErrorSupabase(error) }
  }

  if (data === null) {
    return { ok: false, error: mensajeVacio }
  }

  return { ok: true, datos: data }
}

export function aResultadoLista<T>(
  data: T[] | null,
  error: PostgrestError | null
): Resultado<T[]> {
  if (error) {
    return { ok: false, error: mensajeErrorSupabase(error) }
  }

  return { ok: true, datos: data ?? [] }
}
