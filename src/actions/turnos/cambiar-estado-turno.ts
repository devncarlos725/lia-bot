'use server'

import { crearClienteServidor } from '@/src/lib/supabase/cliente-servidor'
import { mensajeErrorSupabase } from '@/src/lib/supabase/mensaje-error'
import { obtenerUsuarioSesion } from '@/src/lib/supabase/obtener-usuario-sesion'
import { esEstadoTurno } from '@/src/lib/validacion/es-estado-turno'
import { esUuid } from '@/src/lib/validacion/es-uuid'
import type { Resultado } from '@/src/types/resultado'
import type { DatosCambiarEstadoTurno, Turno } from '@/src/types/turno'

export async function cambiarEstadoTurno(
  datos: DatosCambiarEstadoTurno
): Promise<Resultado<Turno>> {
  if (!esUuid(datos.turno_id)) {
    return { ok: false, error: 'El identificador del turno no es válido.' }
  }

  if (!esEstadoTurno(datos.estado)) {
    return { ok: false, error: 'El estado del turno no es válido.' }
  }

  const cliente = await crearClienteServidor()
  const sesion = await obtenerUsuarioSesion(cliente)
  if (!sesion.ok) {
    return sesion
  }

  const { data, error } = await cliente
    .from('turnos')
    .update({ estado: datos.estado })
    .eq('id', datos.turno_id)
    .select('*')
    .maybeSingle()

  if (error) {
    return { ok: false, error: mensajeErrorSupabase(error) }
  }

  if (!data) {
    return { ok: false, error: 'No se encontró el turno.' }
  }

  return { ok: true, datos: data }
}
