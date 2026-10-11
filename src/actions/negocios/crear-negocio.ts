'use server'

import { crearClienteServidor } from '@/src/lib/supabase/cliente-servidor'
import { mensajeErrorSupabase } from '@/src/lib/supabase/mensaje-error'
import { obtenerUsuarioSesion } from '@/src/lib/supabase/obtener-usuario-sesion'
import { validarAltaNegocio } from '@/src/lib/validacion/alta-negocio'
import type { DatosCrearNegocio, Negocio } from '@/src/types/negocio'
import type { Resultado } from '@/src/types/resultado'

export async function crearNegocio(
  datos: DatosCrearNegocio
): Promise<Resultado<Negocio>> {
  const validacion = validarAltaNegocio(datos)
  if (!validacion.ok) {
    return validacion
  }

  const cliente = await crearClienteServidor()
  const sesion = await obtenerUsuarioSesion(cliente)
  if (!sesion.ok) {
    return sesion
  }

  const { data, error } = await cliente
    .from('negocios')
    .insert({
      propietario_id: sesion.datos.id,
      nombre: validacion.datos.nombre,
      slug: validacion.datos.slug,
      rubro: validacion.datos.rubro,
      telefono: validacion.datos.telefono ?? null,
      zona_horaria: validacion.datos.zona_horaria,
    })
    .select('*')
    .single()

  if (error) {
    return { ok: false, error: mensajeErrorSupabase(error) }
  }

  return { ok: true, datos: data }
}
