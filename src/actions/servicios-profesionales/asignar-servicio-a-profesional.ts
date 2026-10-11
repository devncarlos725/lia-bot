'use server'

import { existeAsignacionServicioProfesional } from '@/src/lib/consultas/servicios-profesionales/existe-asignacion'
import { obtenerProfesionalPorId } from '@/src/lib/consultas/profesionales/obtener-profesional-por-id'
import { obtenerServicioPorId } from '@/src/lib/consultas/servicios/obtener-servicio-por-id'
import { crearClienteServidor } from '@/src/lib/supabase/cliente-servidor'
import { mensajeErrorSupabase } from '@/src/lib/supabase/mensaje-error'
import { obtenerUsuarioSesion } from '@/src/lib/supabase/obtener-usuario-sesion'
import { validarAsignacionServicioProfesional } from '@/src/lib/validacion/asignacion-servicio-profesional'
import type {
  DatosAsignarServicioAProfesional,
  ServicioProfesional,
} from '@/src/types/servicio-profesional'
import type { Resultado } from '@/src/types/resultado'

export async function asignarServicioAProfesional(
  datos: DatosAsignarServicioAProfesional
): Promise<Resultado<ServicioProfesional>> {
  const validacion = validarAsignacionServicioProfesional(datos)
  if (!validacion.ok) {
    return validacion
  }

  const cliente = await crearClienteServidor()
  const sesion = await obtenerUsuarioSesion(cliente)
  if (!sesion.ok) {
    return sesion
  }

  const profesional = await obtenerProfesionalPorId(
    cliente,
    validacion.datos.profesional_id
  )
  if (!profesional.ok) {
    return profesional
  }

  const servicio = await obtenerServicioPorId(
    cliente,
    validacion.datos.servicio_id
  )
  if (!servicio.ok) {
    return servicio
  }

  if (
    profesional.datos.negocio_id !== validacion.datos.negocio_id ||
    servicio.datos.negocio_id !== validacion.datos.negocio_id
  ) {
    return {
      ok: false,
      error: 'El profesional y el servicio deben pertenecer al mismo negocio.',
    }
  }

  const yaAsignado = await existeAsignacionServicioProfesional(
    cliente,
    validacion.datos.profesional_id,
    validacion.datos.servicio_id,
    validacion.datos.negocio_id
  )
  if (!yaAsignado.ok) {
    return yaAsignado
  }
  if (yaAsignado.datos) {
    return { ok: true, datos: validacion.datos }
  }

  const { data, error } = await cliente
    .from('servicios_profesionales')
    .insert(validacion.datos)
    .select('*')
    .single()

  if (error) {
    return { ok: false, error: mensajeErrorSupabase(error) }
  }

  return { ok: true, datos: data }
}
