import type { ClienteSupabase } from '@/src/lib/supabase/cliente-tipado'
import type { Servicio } from '@/src/types/servicio'
import type { Resultado } from '@/src/types/resultado'
import { aResultadoLista } from '../a-resultado'

export async function listarServiciosPorNegocio(
  cliente: ClienteSupabase,
  negocioId: string
): Promise<Resultado<Servicio[]>> {
  const { data, error } = await cliente
    .from('servicios')
    .select('*')
    .eq('negocio_id', negocioId)
    .eq('activo', true)
    .order('nombre', { ascending: true })

  return aResultadoLista(data, error)
}
