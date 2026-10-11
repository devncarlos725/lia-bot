import type { ClienteSupabase } from '@/src/lib/supabase/cliente-tipado'
import type { Negocio } from '@/src/types/negocio'
import type { Resultado } from '@/src/types/resultado'
import { aResultado } from '../a-resultado'

export async function obtenerNegocioPorId(
  cliente: ClienteSupabase,
  negocioId: string
): Promise<Resultado<Negocio>> {
  const { data, error } = await cliente
    .from('negocios')
    .select('*')
    .eq('id', negocioId)
    .maybeSingle()

  return aResultado(data, error)
}
