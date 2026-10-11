import type { EstadoTurno } from './enums'
import type { Profesional } from './profesional'
import type { Servicio } from './servicio'

export type Turno = {
  id: string
  negocio_id: string
  servicio_id: string
  profesional_id: string
  cliente_nombre: string
  cliente_telefono: string
  cliente_email: string | null
  inicia_en: string
  termina_en: string
  estado: EstadoTurno
  notas: string | null
  creado_en: string
  actualizado_en: string
}

export type InsercionTurno = {
  id?: string
  negocio_id: string
  servicio_id: string
  profesional_id: string
  cliente_nombre: string
  cliente_telefono: string
  cliente_email?: string | null
  inicia_en: string
  termina_en: string
  estado?: EstadoTurno
  notas?: string | null
  creado_en?: string
  actualizado_en?: string
}

export type ActualizacionTurno = Partial<
  Omit<Turno, 'id' | 'negocio_id' | 'creado_en'>
>

export type DatosCrearTurno = {
  negocio_id: string
  servicio_id: string
  profesional_id: string
  cliente_nombre: string
  cliente_telefono: string
  cliente_email?: string | null
  inicia_en: string
  notas?: string | null
}

export type DatosCambiarEstadoTurno = {
  turno_id: string
  estado: EstadoTurno
}

export type TurnoConDetalle = Turno & {
  servicio: Pick<Servicio, 'id' | 'nombre' | 'duracion_minutos' | 'precio'>
  profesional: Pick<Profesional, 'id' | 'nombre'>
}

export type FiltroTurnos = {
  negocio_id: string
  profesional_id?: string
  servicio_id?: string
  estado?: EstadoTurno
  desde?: string
  hasta?: string
}
