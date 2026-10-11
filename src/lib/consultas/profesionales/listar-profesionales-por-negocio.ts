import type { ClienteSupabase } from '@/src/lib/supabase/cliente-tipado'
import type { Profesional } from '@/src/types/profesional'
import type { Resultado } from '@/src/types/resultado'
import { aResultadoLista } from '../a-resultado'

export async function listarProfesionalesPorNegocio(
  cliente: ClienteSupabase,
  negocioId: string
): Promise<Resultado<Profesional[]>> {
  const { data, error } = await cliente
    .from('profesionales')
    .select('*')
    .eq('negocio_id', negocioId)
    .eq('activo', true)
    .order('nombre', { ascending: true })

  return aResultadoLista(data, error)
}
