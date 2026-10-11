'use server'

import { existeAsignacionServicioProfesional } from '@/src/lib/consultas/servicios-profesionales/existe-asignacion'
import { obtenerProfesionalPorId } from '@/src/lib/consultas/profesionales/obtener-profesional-por-id'
import { obtenerServicioPorId } from '@/src/lib/consultas/servicios/obtener-servicio-por-id'
import { crearClienteServidor } from '@/src/lib/supabase/cliente-servidor'
import { mensajeErrorSupabase } from '@/src/lib/supabase/mensaje-error'
import { obtenerUsuarioSesion } from '@/src/lib/supabase/obtener-usuario-sesion'
import { sumarMinutosIso } from '@/src/lib/tiempo/sumar-minutos-iso'
import { validarAltaTurno } from '@/src/lib/validacion/alta-turno'
import type { Resultado } from '@/src/types/resultado'
import type { DatosCrearTurno, Turno } from '@/src/types/turno'

export async function crearTurno(
  datos: DatosCrearTurno
): Promise<Resultado<Turno>> {
  const validacion = validarAltaTurno(datos)
  if (!validacion.ok) {
    return validacion
  }

  const cliente = await crearClienteServidor()
  const sesion = await obtenerUsuarioSesion(cliente)
  if (!sesion.ok) {
    return sesion
  }

  const servicio = await obtenerServicioPorId(
    cliente,
    validacion.datos.servicio_id
  )
  if (!servicio.ok) {
    return servicio
  }

  const profesional = await obtenerProfesionalPorId(
    cliente,
    validacion.datos.profesional_id
  )
  if (!profesional.ok) {
    return profesional
  }

  if (
    servicio.datos.negocio_id !== validacion.datos.negocio_id ||
    profesional.datos.negocio_id !== validacion.datos.negocio_id
  ) {
    return {
      ok: false,
      error: 'El servicio y el profesional deben pertenecer al mismo negocio.',
    }
  }

  if (!servicio.datos.activo) {
    return { ok: false, error: 'El servicio no está disponible.' }
  }

  if (!profesional.datos.activo) {
    return { ok: false, error: 'El profesional no está disponible.' }
  }

  const asignacion = await existeAsignacionServicioProfesional(
    cliente,
    validacion.datos.profesional_id,
    validacion.datos.servicio_id,
    validacion.datos.negocio_id
  )
  if (!asignacion.ok) {
    return asignacion
  }
  if (!asignacion.datos) {
    return {
      ok: false,
      error: 'Ese profesional no ofrece el servicio seleccionado.',
    }
  }

  const fin = sumarMinutosIso(
    validacion.datos.inicia_en,
    servicio.datos.duracion_minutos
  )
  if (!fin.ok) {
    return fin
  }

  const { data, error } = await cliente
    .from('turnos')
    .insert({
      negocio_id: validacion.datos.negocio_id,
      servicio_id: validacion.datos.servicio_id,
      profesional_id: validacion.datos.profesional_id,
      cliente_nombre: validacion.datos.cliente_nombre,
      cliente_telefono: validacion.datos.cliente_telefono,
      cliente_email: validacion.datos.cliente_email ?? null,
      inicia_en: validacion.datos.inicia_en,
      termina_en: fin.datos,
      notas: validacion.datos.notas ?? null,
    })
    .select('*')
    .single()

  if (error) {
    return { ok: false, error: mensajeErrorSupabase(error) }
  }

  return { ok: true, datos: data }
}
