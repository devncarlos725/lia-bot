import type { ClienteSupabase } from '@/src/lib/supabase/cliente-tipado'
import type { Turno } from '@/src/types/turno'
import type { Resultado } from '@/src/types/resultado'
import { aResultado } from '../a-resultado'

export async function obtenerTurnoPorId(
  cliente: ClienteSupabase,
  turnoId: string
): Promise<Resultado<Turno>> {
  const { data, error } = await cliente
    .from('turnos')
    .select('*')
    .eq('id', turnoId)
    .maybeSingle()

  return aResultado(data, error)
}
