export type Profesional = {
  id: string
  negocio_id: string
  nombre: string
  telefono: string | null
  activo: boolean
  creado_en: string
  actualizado_en: string
}

export type InsercionProfesional = {
  id?: string
  negocio_id: string
  nombre: string
  telefono?: string | null
  activo?: boolean
  creado_en?: string
  actualizado_en?: string
}

export type ActualizacionProfesional = Partial<
  Omit<Profesional, 'id' | 'negocio_id' | 'creado_en'>
>

export type DatosCrearProfesional = {
  negocio_id: string
  nombre: string
  telefono?: string | null
}
