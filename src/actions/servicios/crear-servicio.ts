'use server'

import { crearClienteServidor } from '@/src/lib/supabase/cliente-servidor'
import { mensajeErrorSupabase } from '@/src/lib/supabase/mensaje-error'
import { obtenerUsuarioSesion } from '@/src/lib/supabase/obtener-usuario-sesion'
import { validarAltaServicio } from '@/src/lib/validacion/alta-servicio'
import type { DatosCrearServicio, Servicio } from '@/src/types/servicio'
import type { Resultado } from '@/src/types/resultado'

export async function crearServicio(
  datos: DatosCrearServicio
): Promise<Resultado<Servicio>> {
  const validacion = validarAltaServicio(datos)
  if (!validacion.ok) {
    return validacion
  }

  const cliente = await crearClienteServidor()
  const sesion = await obtenerUsuarioSesion(cliente)
  if (!sesion.ok) {
    return sesion
  }

  const precio =
    validacion.datos.precio === undefined
      ? undefined
      : validacion.datos.precio.toFixed(2)

  const { data, error } = await cliente
    .from('servicios')
    .insert({
      negocio_id: validacion.datos.negocio_id,
      nombre: validacion.datos.nombre,
      descripcion: validacion.datos.descripcion ?? null,
      duracion_minutos: validacion.datos.duracion_minutos,
      precio,
    })
    .select('*')
    .single()

  if (error) {
    return { ok: false, error: mensajeErrorSupabase(error) }
  }

  return { ok: true, datos: data }
}
