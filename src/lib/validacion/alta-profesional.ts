import type { DatosCrearProfesional } from '@/src/types/profesional'
import type { Resultado } from '@/src/types/resultado'
import { esUuid } from './es-uuid'
import { textoNoVacio } from './texto-no-vacio'

export function validarAltaProfesional(
  datos: DatosCrearProfesional
): Resultado<DatosCrearProfesional> {
  if (!esUuid(datos.negocio_id)) {
    return { ok: false, error: 'El identificador del negocio no es válido.' }
  }

  const nombre = textoNoVacio(datos.nombre)
  if (!nombre) {
    return { ok: false, error: 'El nombre del profesional es obligatorio.' }
  }

  return {
    ok: true,
    datos: {
      negocio_id: datos.negocio_id,
      nombre,
      telefono: textoNoVacio(datos.telefono ?? null),
    },
  }
}
