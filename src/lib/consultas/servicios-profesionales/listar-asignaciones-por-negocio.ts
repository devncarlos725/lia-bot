import type { ClienteSupabase } from '@/src/lib/supabase/cliente-tipado'
import type { ServicioProfesional } from '@/src/types/servicio-profesional'
import type { Resultado } from '@/src/types/resultado'
import { aResultadoLista } from '../a-resultado'

export async function listarAsignacionesPorNegocio(
  cliente: ClienteSupabase,
  negocioId: string
): Promise<Resultado<ServicioProfesional[]>> {
  const { data, error } = await cliente
    .from('servicios_profesionales')
    .select('*')
    .eq('negocio_id', negocioId)

  return aResultadoLista(data, error)
}
