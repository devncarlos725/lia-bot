import type { Profesional } from './profesional'
import type { Servicio } from './servicio'

export type ServicioProfesional = {
  profesional_id: string
  negocio_id: string
  servicio_id: string
}

export type InsercionServicioProfesional = ServicioProfesional

export type DatosAsignarServicioAProfesional = ServicioProfesional

export type ProfesionalConServicios = Profesional & {
  servicios: Servicio[]
}

export type ServicioConProfesionales = Servicio & {
  profesionales: Profesional[]
}
