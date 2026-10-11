import type { ClienteSupabase } from '@/src/lib/supabase/cliente-tipado'
import type { Profesional } from '@/src/types/profesional'
import type { Resultado } from '@/src/types/resultado'
import { aResultadoLista } from '../a-resultado'
import { mensajeErrorSupabase } from '@/src/lib/supabase/mensaje-error'

export async function listarProfesionalesPorServicio(
  cliente: ClienteSupabase,
  servicioId: string
): Promise<Resultado<Profesional[]>> {
  const asignaciones = await cliente
    .from('servicios_profesionales')
    .select('profesional_id')
    .eq('servicio_id', servicioId)

  if (asignaciones.error) {
    return { ok: false, error: mensajeErrorSupabase(asignaciones.error) }
  }

  const ids = (asignaciones.data ?? []).map((fila) => fila.profesional_id)
  if (ids.length === 0) {
    return { ok: true, datos: [] }
  }

  const { data, error } = await cliente
    .from('profesionales')
    .select('*')
    .in('id', ids)
    .eq('activo', true)
    .order('nombre', { ascending: true })

  return aResultadoLista(data, error)
}
