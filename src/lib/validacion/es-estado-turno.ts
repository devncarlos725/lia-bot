import { ESTADOS_TURNO, type EstadoTurno } from '@/src/types/enums'

export function esEstadoTurno(valor: string): valor is EstadoTurno {
  return (ESTADOS_TURNO as readonly string[]).includes(valor)
}
