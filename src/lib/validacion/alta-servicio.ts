import type { DatosCrearServicio } from '@/src/types/servicio'
import type { Resultado } from '@/src/types/resultado'
import { esUuid } from './es-uuid'
import { textoNoVacio } from './texto-no-vacio'

export function validarAltaServicio(
  datos: DatosCrearServicio
): Resultado<DatosCrearServicio> {
  if (!esUuid(datos.negocio_id)) {
    return { ok: false, error: 'El identificador del negocio no es válido.' }
  }

  const nombre = textoNoVacio(datos.nombre)
  if (!nombre) {
    return { ok: false, error: 'El nombre del servicio es obligatorio.' }
  }

  if (!Number.isInteger(datos.duracion_minutos) || datos.duracion_minutos <= 0) {
    return { ok: false, error: 'La duración debe ser un entero mayor a cero.' }
  }

  if (
    datos.precio !== undefined &&
    (!Number.isFinite(datos.precio) || datos.precio < 0)
  ) {
    return { ok: false, error: 'El precio no puede ser negativo.' }
  }

  return {
    ok: true,
    datos: {
      negocio_id: datos.negocio_id,
      nombre,
      descripcion: textoNoVacio(datos.descripcion ?? null),
      duracion_minutos: datos.duracion_minutos,
      precio: datos.precio,
    },
  }
}
