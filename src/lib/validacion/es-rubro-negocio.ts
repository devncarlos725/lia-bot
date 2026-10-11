import { RUBROS_NEGOCIO, type RubroNegocio } from '@/src/types/enums'

export function esRubroNegocio(valor: string): valor is RubroNegocio {
  return (RUBROS_NEGOCIO as readonly string[]).includes(valor)
}
