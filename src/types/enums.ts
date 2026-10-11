export const RUBROS_NEGOCIO = [
  'estetica',
  'manicuria',
  'salud',
  'taller',
  'otro',
] as const

export type RubroNegocio = (typeof RUBROS_NEGOCIO)[number]

export const ESTADOS_TURNO = [
  'pendiente',
  'confirmado',
  'completado',
  'cancelado',
  'ausente',
] as const

export type EstadoTurno = (typeof ESTADOS_TURNO)[number]

export const ESTADOS_TURNO_ACTIVOS = ['pendiente', 'confirmado'] as const

export type EstadoTurnoActivo = (typeof ESTADOS_TURNO_ACTIVOS)[number]
