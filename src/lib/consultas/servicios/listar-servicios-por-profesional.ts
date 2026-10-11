import type { ClienteSupabase } from '@/src/lib/supabase/cliente-tipado'
import type { Servicio } from '@/src/types/servicio'
import type { Resultado } from '@/src/types/resultado'
import { mensajeErrorSupabase } from '@/src/lib/supabase/mensaje-error'
import { aResultadoLista } from '../a-resultado'

export async function listarServiciosPorProfesional(
  cliente: ClienteSupabase,
  profesionalId: string
): Promise<Resultado<Servicio[]>> {
  const asignaciones = await cliente
    .from('servicios_profesionales')
    .select('servicio_id')
    .eq('profesional_id', profesionalId)

  if (asignaciones.error) {
    return { ok: false, error: mensajeErrorSupabase(asignaciones.error) }
  }

  const ids = (asignaciones.data ?? []).map((fila) => fila.servicio_id)
  if (ids.length === 0) {
    return { ok: true, datos: [] }
  }

  const { data, error } = await cliente
    .from('servicios')
    .select('*')
    .in('id', ids)
    .eq('activo', true)
    .order('nombre', { ascending: true })

  return aResultadoLista(data, error)
}
