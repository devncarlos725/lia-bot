import type { ClienteSupabase } from '@/src/lib/supabase/cliente-tipado'
import type { Negocio } from '@/src/types/negocio'
import type { Resultado } from '@/src/types/resultado'
import { aResultado } from '../a-resultado'

export async function obtenerNegocioPorSlug(
  cliente: ClienteSupabase,
  slug: string
): Promise<Resultado<Negocio>> {
  const { data, error } = await cliente
    .from('negocios')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  return aResultado(data, error)
}
