import type { DatosCrearTurno } from '@/src/types/turno'
import type { Resultado } from '@/src/types/resultado'
import { esUuid } from './es-uuid'
import { textoNoVacio } from './texto-no-vacio'

const PATRON_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validarAltaTurno(
  datos: DatosCrearTurno
): Resultado<DatosCrearTurno> {
  if (!esUuid(datos.negocio_id)) {
    return { ok: false, error: 'El identificador del negocio no es válido.' }
  }

  if (!esUuid(datos.servicio_id)) {
    return { ok: false, error: 'El identificador del servicio no es válido.' }
  }

  if (!esUuid(datos.profesional_id)) {
    return { ok: false, error: 'El identificador del profesional no es válido.' }
  }

  const clienteNombre = textoNoVacio(datos.cliente_nombre)
  if (!clienteNombre) {
    return { ok: false, error: 'El nombre del cliente es obligatorio.' }
  }

  const clienteTelefono = textoNoVacio(datos.cliente_telefono)
  if (!clienteTelefono) {
    return { ok: false, error: 'El teléfono del cliente es obligatorio.' }
  }

  const clienteEmail = textoNoVacio(datos.cliente_email ?? null)
  if (clienteEmail && !PATRON_EMAIL.test(clienteEmail)) {
    return { ok: false, error: 'El email del cliente no es válido.' }
  }

  const iniciaEn = new Date(datos.inicia_en)
  if (Number.isNaN(iniciaEn.getTime())) {
    return { ok: false, error: 'La fecha de inicio no es válida.' }
  }

  return {
    ok: true,
    datos: {
      negocio_id: datos.negocio_id,
      servicio_id: datos.servicio_id,
      profesional_id: datos.profesional_id,
      cliente_nombre: clienteNombre,
      cliente_telefono: clienteTelefono,
      cliente_email: clienteEmail,
      inicia_en: iniciaEn.toISOString(),
      notas: textoNoVacio(datos.notas ?? null),
    },
  }
}
