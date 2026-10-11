import type { ClienteSupabase } from '@/src/lib/supabase/cliente-tipado'
import type { Servicio } from '@/src/types/servicio'
import type { Resultado } from '@/src/types/resultado'
import { aResultado } from '../a-resultado'

export async function obtenerServicioPorId(
  cliente: ClienteSupabase,
  servicioId: string
): Promise<Resultado<Servicio>> {
  const { data, error } = await cliente
    .from('servicios')
    .select('*')
    .eq('id', servicioId)
    .maybeSingle()

  return aResultado(data, error)
}
