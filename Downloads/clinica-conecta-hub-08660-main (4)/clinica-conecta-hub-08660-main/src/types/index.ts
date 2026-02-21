// ============================================
// CORE ENTITY TYPES
// ============================================

export interface Paciente {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  direccion: string;
  numeroDocumento: string;
  fechaNacimiento: string;
  genero: 'MASCULINO' | 'FEMENINO' | 'OTRO';
  organizationId?: number;
}

export interface ProfesionalSalud {
  id?: number;
  nombre: string;
  apellido: string;
  especialidad: string;
  email: string;
  telefono: string;
  numeroLicencia: string;
  organizationId?: number;
}

export interface CitaMedica {
  id?: number;
  pacienteId: number;
  profesionalId: number;
  organizationId?: number;
  servicioId?: number;
  fecha: string;
  motivo: string;
  tipo?: 'PRESENCIAL' | 'VIRTUAL';
  estado?: 'pendiente' | 'confirmada' | 'completada' | 'cancelada' | 'no_show';
  pacienteNombre?: string;
  profesionalNombre?: string;
  notas?: string;
  profesional?: {
    nombre?: string;
    apellido?: string;
    especialidad?: string;
  };
  paciente?: {
    nombre?: string;
    apellido?: string;
  };
  tokenConfirmacion?: string;
  riesgoInasistencia?: number; // ML placeholder 0-1
}

export interface HistoriaClinica {
  id?: number;
  pacienteId: number;
  profesionalId: number;
  organizationId?: number;
  fecha: string;
  motivoConsulta: string;
  diagnostico: string;
  tratamiento: string;
  observaciones?: string;
  formulaMedica?: string;
  requiereIncapacidad?: boolean;
  archivosAdjuntos?: string[];
  resumenIA?: string; // ML placeholder
  profesional?: {
    nombre?: string;
    apellido?: string;
    especialidad?: string;
  };
  pacienteNombre?: string;
  profesionalNombre?: string;
}

export interface Notificacion {
  id: number;
  titulo: string;
  mensaje: string;
  fecha: string;
  leida: boolean;
  tipo: 'cita' | 'recordatorio' | 'sistema' | 'tarea';
}

export interface DashboardStats {
  totalPacientes: number;
  totalProfesionales: number;
  totalCitas: number;
  citasHoy?: number;
  ingresosMes?: number;
  tasaAusentismo?: number;
}

// ============================================
// ORGANIZATION & AUTH TYPES
// ============================================

export type UserRole = 'PACIENTE' | 'MEDICO' | 'RECEPCIONISTA' | 'ADMIN' | 'CUIDADOR' | 'ORGANIZATION_ADMIN';

export interface Usuario {
  id: number;
  nombre: string;
  apellido?: string;
  correo: string;
  rol: UserRole;
  verificado: boolean;
  especialidad?: string;
  telefono?: string;
  numeroLicencia?: string;
  organizationId?: number;
  organization?: Organization;
}

export interface Organization {
  id: number;
  nombre: string;
  slug: string;
  ciudad: string;
  email: string;
  plan: 'BASIC' | 'PRO';
  activo: boolean;
  propietarioId: number;
  createdAt?: string;
}

// ============================================
// TELEMEDICINA
// ============================================

export interface SesionTeleconsulta {
  id: number;
  citaId: number;
  token: string;
  estado: 'ESPERANDO' | 'EN_CURSO' | 'FINALIZADA';
  fechaInicio?: string;
  fechaFin?: string;
  duracionMinutos?: number;
  chatMessages?: MensajeChat[];
}

export interface MensajeChat {
  id: number;
  sesionId: number;
  remitenteId: number;
  contenido: string;
  fecha: string;
  remitenteNombre?: string;
}

// ============================================
// TAREAS INTERNAS
// ============================================

export interface TareaInterna {
  id: number;
  organizationId: number;
  titulo: string;
  descripcion?: string;
  asignadoAId: number;
  creadoPorId: number;
  fechaLimite?: string;
  estado: 'PENDIENTE' | 'EN_PROGRESO' | 'COMPLETADA';
  comentarios?: ComentarioTarea[];
  asignadoNombre?: string;
  creadoPorNombre?: string;
}

export interface ComentarioTarea {
  id: number;
  tareaId: number;
  autorId: number;
  contenido: string;
  fecha: string;
  autorNombre?: string;
}

// ============================================
// FINANZAS
// ============================================

export interface ResumenFinanciero {
  ingresosTotales: number;
  ingresosMes: number;
  ingresosPorServicio: { servicio: string; total: number }[];
  ingresosPorMedico: { medico: string; total: number }[];
  proyeccionMensual?: number; // ML placeholder
}

// ============================================
// CUIDADOR
// ============================================

export interface CuidadorPaciente {
  id: number;
  cuidadorId: number;
  pacienteId: number;
  tipoPaciente: 'MENOR' | 'ADULTO_MAYOR' | 'PERSONA_DISCAPACIDAD' | 'RECUPERACION';
  parentesco: 'PADRE' | 'MADRE' | 'TUTOR' | 'HIJO' | 'FAMILIAR' | 'ENFERMERA' | 'AUXILIAR' | 'CONTRATADO';
  permisos: {
    puedeAgendar: boolean;
    puedeCancelar: boolean;
    puedeAccederHistoria: boolean;
    puedeSubirExamenes: boolean;
  };
  fechaVinculacion: string;
  pacienteNombre?: string;
  pacienteEdad?: number;
  alertaSobrecarga?: boolean;
}

// ============================================
// LISTA DE ESPERA
// ============================================

export interface ListaEspera {
  id: number;
  pacienteId: number;
  profesionalId?: number;
  organizationId: number;
  fechaDeseada?: string;
  motivo: string;
  estado: 'ESPERANDO' | 'ASIGNADA' | 'CANCELADA';
  pacienteNombre?: string;
}

// ============================================
// SERVICIO
// ============================================

export interface Servicio {
  id: number;
  organizationId?: number;
  consultorioId?: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  duracionMinutos: number;
  especialidad?: string;
  activo: boolean;
}
