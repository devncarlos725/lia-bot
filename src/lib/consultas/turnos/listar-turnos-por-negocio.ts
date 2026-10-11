import type { ClienteSupabase } from '@/src/lib/supabase/cliente-tipado'
import type { FiltroTurnos, Turno } from '@/src/types/turno'
import type { Resultado } from '@/src/types/resultado'
import { aResultadoLista } from '../a-resultado'

export async function listarTurnosPorNegocio(
  cliente: ClienteSupabase,
  filtro: FiltroTurnos
): Promise<Resultado<Turno[]>> {
  let consulta = cliente
    .from('turnos')
    .select('*')
    .eq('negocio_id', filtro.negocio_id)
    .order('inicia_en', { ascending: true })

  if (filtro.profesional_id) {
    consulta = consulta.eq('profesional_id', filtro.profesional_id)
  }

  if (filtro.servicio_id) {
    consulta = consulta.eq('servicio_id', filtro.servicio_id)
  }

  if (filtro.estado) {
    consulta = consulta.eq('estado', filtro.estado)
  }

  if (filtro.desde) {
    consulta = consulta.gte('inicia_en', filtro.desde)
  }

  if (filtro.hasta) {
    consulta = consulta.lt('inicia_en', filtro.hasta)
  }

  const { data, error } = await consulta
  return aResultadoLista(data, error)
}
