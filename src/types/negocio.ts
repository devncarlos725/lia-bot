import type { RubroNegocio } from './enums'

export type Negocio = {
  id: string
  propietario_id: string
  nombre: string
  slug: string
  rubro: RubroNegocio
  telefono: string | null
  zona_horaria: string
  activo: boolean
  creado_en: string
  actualizado_en: string
}

export type InsercionNegocio = {
  id?: string
  propietario_id: string
  nombre: string
  slug: string
  rubro?: RubroNegocio
  telefono?: string | null
  zona_horaria?: string
  activo?: boolean
  creado_en?: string
  actualizado_en?: string
}

export type ActualizacionNegocio = Partial<
  Omit<Negocio, 'id' | 'propietario_id' | 'creado_en'>
>

export type DatosCrearNegocio = {
  nombre: string
  slug: string
  rubro?: RubroNegocio
  telefono?: string | null
  zona_horaria?: string
}
