import type { ClienteSupabase } from '@/src/lib/supabase/cliente-tipado'
import type { Negocio } from '@/src/types/negocio'
import type { Resultado } from '@/src/types/resultado'
import { aResultadoLista } from '../a-resultado'

export async function listarNegocios(
  cliente: ClienteSupabase
): Promise<Resultado<Negocio[]>> {
  const { data, error } = await cliente
    .from('negocios')
    .select('*')
    .eq('activo', true)
    .order('nombre', { ascending: true })

  return aResultadoLista(data, error)
}
