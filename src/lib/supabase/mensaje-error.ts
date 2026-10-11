import type { PostgrestError } from '@supabase/supabase-js'

export function mensajeErrorSupabase(error: PostgrestError): string {
  if (
    error.code === '23P01' ||
    error.message.includes('turnos_sin_superposicion_por_profesional')
  ) {
    return 'El profesional ya tiene un turno en ese horario.'
  }

  if (error.code === '23505') {
    return 'Ya existe un registro con esos datos.'
  }

  if (error.code === '23503') {
    return 'La referencia a negocio, servicio o profesional no es válida.'
  }

  if (error.code === '42501' || error.code === 'PGRST301') {
    return 'No tenés permisos para realizar esta operación.'
  }

  if (error.code === 'PGRST116') {
    return 'No se encontró el registro.'
  }

  return error.message
}
