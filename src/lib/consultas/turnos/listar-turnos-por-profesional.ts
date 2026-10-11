import type { ClienteSupabase } from '@/src/lib/supabase/cliente-tipado'
import type { Turno } from '@/src/types/turno'
import type { Resultado } from '@/src/types/resultado'
import { aResultadoLista } from '../a-resultado'

export async function listarTurnosPorProfesional(
  cliente: ClienteSupabase,
  profesionalId: string,
  desde?: string,
  hasta?: string
): Promise<Resultado<Turno[]>> {
  let consulta = cliente
    .from('turnos')
    .select('*')
    .eq('profesional_id', profesionalId)
    .order('inicia_en', { ascending: true })

  if (desde) {
    consulta = consulta.gte('inicia_en', desde)
  }

  if (hasta) {
    consulta = consulta.lt('inicia_en', hasta)
  }

  const { data, error } = await consulta
  return aResultadoLista(data, error)
}
