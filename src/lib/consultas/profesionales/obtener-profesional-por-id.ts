import type { ClienteSupabase } from '@/src/lib/supabase/cliente-tipado'
import type { Profesional } from '@/src/types/profesional'
import type { Resultado } from '@/src/types/resultado'
import { aResultado } from '../a-resultado'

export async function obtenerProfesionalPorId(
  cliente: ClienteSupabase,
  profesionalId: string
): Promise<Resultado<Profesional>> {
  const { data, error } = await cliente
    .from('profesionales')
    .select('*')
    .eq('id', profesionalId)
    .maybeSingle()

  return aResultado(data, error)
}
