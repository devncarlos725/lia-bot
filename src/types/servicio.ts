export type Servicio = {
  id: string
  negocio_id: string
  nombre: string
  descripcion: string | null
  duracion_minutos: number
  precio: string
  activo: boolean
  creado_en: string
  actualizado_en: string
}

export type InsercionServicio = {
  id?: string
  negocio_id: string
  nombre: string
  descripcion?: string | null
  duracion_minutos: number
  precio?: string | number
  activo?: boolean
  creado_en?: string
  actualizado_en?: string
}

export type ActualizacionServicio = Partial<
  Omit<Servicio, 'id' | 'negocio_id' | 'creado_en'>
>

export type DatosCrearServicio = {
  negocio_id: string
  nombre: string
  descripcion?: string | null
  duracion_minutos: number
  precio?: number
}
