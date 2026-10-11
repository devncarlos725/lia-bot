import type { EstadoTurno, RubroNegocio } from './enums'
import type {
  ActualizacionNegocio,
  InsercionNegocio,
  Negocio,
} from './negocio'
import type {
  ActualizacionProfesional,
  InsercionProfesional,
  Profesional,
} from './profesional'
import type {
  ActualizacionServicio,
  InsercionServicio,
  Servicio,
} from './servicio'
import type {
  InsercionServicioProfesional,
  ServicioProfesional,
} from './servicio-profesional'
import type { ActualizacionTurno, InsercionTurno, Turno } from './turno'

type Relacion = {
  foreignKeyName: string
  columns: string[]
  isOneToOne: boolean
  referencedRelation: string
  referencedColumns: string[]
}

export type Database = {
  public: {
    Tables: {
      negocios: {
        Row: Negocio
        Insert: InsercionNegocio
        Update: ActualizacionNegocio
        Relationships: [
          {
            foreignKeyName: 'negocios_propietario_id_fkey'
            columns: ['propietario_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      profesionales: {
        Row: Profesional
        Insert: InsercionProfesional
        Update: ActualizacionProfesional
        Relationships: [
          {
            foreignKeyName: 'profesionales_negocio_id_fkey'
            columns: ['negocio_id']
            isOneToOne: false
            referencedRelation: 'negocios'
            referencedColumns: ['id']
          },
        ]
      }
      servicios: {
        Row: Servicio
        Insert: InsercionServicio
        Update: ActualizacionServicio
        Relationships: [
          {
            foreignKeyName: 'servicios_negocio_id_fkey'
            columns: ['negocio_id']
            isOneToOne: false
            referencedRelation: 'negocios'
            referencedColumns: ['id']
          },
        ]
      }
      servicios_profesionales: {
        Row: ServicioProfesional
        Insert: InsercionServicioProfesional
        Update: Partial<ServicioProfesional>
        Relationships: [
          {
            foreignKeyName: 'servicios_profesionales_profesional_negocio_fkey'
            columns: ['profesional_id', 'negocio_id']
            isOneToOne: false
            referencedRelation: 'profesionales'
            referencedColumns: ['id', 'negocio_id']
          },
          {
            foreignKeyName: 'servicios_profesionales_servicio_negocio_fkey'
            columns: ['servicio_id', 'negocio_id']
            isOneToOne: false
            referencedRelation: 'servicios'
            referencedColumns: ['id', 'negocio_id']
          },
        ]
      }
      turnos: {
        Row: Turno
        Insert: InsercionTurno
        Update: ActualizacionTurno
        Relationships: [
          {
            foreignKeyName: 'turnos_negocio_id_fkey'
            columns: ['negocio_id']
            isOneToOne: false
            referencedRelation: 'negocios'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'turnos_servicio_negocio_fkey'
            columns: ['servicio_id', 'negocio_id']
            isOneToOne: false
            referencedRelation: 'servicios'
            referencedColumns: ['id', 'negocio_id']
          },
          {
            foreignKeyName: 'turnos_profesional_negocio_fkey'
            columns: ['profesional_id', 'negocio_id']
            isOneToOne: false
            referencedRelation: 'profesionales'
            referencedColumns: ['id', 'negocio_id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      rubro_negocio: RubroNegocio
      estado_turno: EstadoTurno
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type TablaPublica = keyof Database['public']['Tables']
export type RelacionTabla = Relacion
