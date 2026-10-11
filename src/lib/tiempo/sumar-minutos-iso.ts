import type { Resultado } from '@/src/types/resultado'

export function sumarMinutosIso(
  inicioIso: string,
  minutos: number
): Resultado<string> {
  const inicio = new Date(inicioIso)

  if (Number.isNaN(inicio.getTime())) {
    return { ok: false, error: 'La fecha de inicio no es válida.' }
  }

  if (!Number.isInteger(minutos) || minutos <= 0) {
    return { ok: false, error: 'La duración debe ser un entero positivo.' }
  }

  return {
    ok: true,
    datos: new Date(inicio.getTime() + minutos * 60_000).toISOString(),
  }
}
