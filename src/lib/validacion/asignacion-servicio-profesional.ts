import type { DatosAsignarServicioAProfesional } from '@/src/types/servicio-profesional'
import type { Resultado } from '@/src/types/resultado'
import { esUuid } from './es-uuid'

export function validarAsignacionServicioProfesional(
  datos: DatosAsignarServicioAProfesional
): Resultado<DatosAsignarServicioAProfesional> {
  if (!esUuid(datos.negocio_id)) {
    return { ok: false, error: 'El identificador del negocio no es válido.' }
  }

  if (!esUuid(datos.profesional_id)) {
    return { ok: false, error: 'El identificador del profesional no es válido.' }
  }

  if (!esUuid(datos.servicio_id)) {
    return { ok: false, error: 'El identificador del servicio no es válido.' }
  }

  return { ok: true, datos }
}
