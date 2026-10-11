import type { ClienteSupabase } from '@/src/lib/supabase/cliente-tipado'
import type { Resultado } from '@/src/types/resultado'
import { mensajeErrorSupabase } from '@/src/lib/supabase/mensaje-error'

export async function existeAsignacionServicioProfesional(
  cliente: ClienteSupabase,
  profesionalId: string,
  servicioId: string,
  negocioId: string
): Promise<Resultado<boolean>> {
  const { data, error } = await cliente
    .from('servicios_profesionales')
    .select('profesional_id')
    .eq('profesional_id', profesionalId)
    .eq('servicio_id', servicioId)
    .eq('negocio_id', negocioId)
    .maybeSingle()

  if (error) {
    return { ok: false, error: mensajeErrorSupabase(error) }
  }

  return { ok: true, datos: data !== null }
}
