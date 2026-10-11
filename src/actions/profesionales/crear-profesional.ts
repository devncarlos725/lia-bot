'use server'

import { crearClienteServidor } from '@/src/lib/supabase/cliente-servidor'
import { mensajeErrorSupabase } from '@/src/lib/supabase/mensaje-error'
import { obtenerUsuarioSesion } from '@/src/lib/supabase/obtener-usuario-sesion'
import { validarAltaProfesional } from '@/src/lib/validacion/alta-profesional'
import type { DatosCrearProfesional, Profesional } from '@/src/types/profesional'
import type { Resultado } from '@/src/types/resultado'

export async function crearProfesional(
  datos: DatosCrearProfesional
): Promise<Resultado<Profesional>> {
  const validacion = validarAltaProfesional(datos)
  if (!validacion.ok) {
    return validacion
  }

  const cliente = await crearClienteServidor()
  const sesion = await obtenerUsuarioSesion(cliente)
  if (!sesion.ok) {
    return sesion
  }

  const { data, error } = await cliente
    .from('profesionales')
    .insert({
      negocio_id: validacion.datos.negocio_id,
      nombre: validacion.datos.nombre,
      telefono: validacion.datos.telefono ?? null,
    })
    .select('*')
    .single()

  if (error) {
    return { ok: false, error: mensajeErrorSupabase(error) }
  }

  return { ok: true, datos: data }
}
