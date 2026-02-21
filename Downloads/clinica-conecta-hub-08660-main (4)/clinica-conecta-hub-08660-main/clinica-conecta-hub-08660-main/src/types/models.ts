// ============================================
// TIPOS DE DATOS PRINCIPALES
// ============================================

export interface Organization {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  country: string;
  createdAt: string;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  orgId: number;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}

export type UserRole = 'ADMIN' | 'DOCTOR' | 'RECEPTIONIST' | 'PATIENT';

export interface Patient {
  id: number;
  userId?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  documentType: 'CC' | 'CE' | 'PASSPORT';
  documentNumber: string;
  dateOfBirth: string;
  gender: 'M' | 'F' | 'O';
  bloodType: 'O+' | 'O-' | 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-';
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  medicalHistory: string;
  allergies: string;
  currentMedications: string;
  orgId: number;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}

export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'CHECKED_IN' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
export type AppointmentType = 'CONSULTATION' | 'CHECKUP' | 'TREATMENT' | 'PROCEDURE';

export interface Appointment {
  id: number;
  patientId: number;
  patientName: string;
  doctorId: number;
  doctorName: string;
  appointmentDate: string; // ISO: 2026-02-19
  appointmentTime: string; // HH:mm
  duration?: number; // minutos, default 30
  type: AppointmentType;
  status: AppointmentStatus;
  notes: string;
  cancelReason?: string;
  orgId: number;
  createdAt: string;
}

export interface DashboardStats {
  totalPatients: number;
  totalPendingAppointments: number;
  appointmentsToday: Array<{
    id: number;
    patientName: string;
    time: string;
    type: AppointmentType;
  }>;
  upcomingAppointments: Array<{
    id: number;
    patientName: string;
    date: string;
    time: string;
    type: AppointmentType;
  }>;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
}

export interface PaginationDto<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

// ============================================
// FORM REQUEST TYPES
// ============================================

export interface CreatePatientRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  documentType: 'CC' | 'CE' | 'PASSPORT';
  documentNumber: string;
  dateOfBirth: string;
  gender: 'M' | 'F' | 'O';
  bloodType: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  medicalHistory: string;
  allergies: string;
  currentMedications: string;
}

export interface UpdatePatientRequest extends Partial<CreatePatientRequest> {}

export interface CreateAppointmentRequest {
  patientId: number;
  doctorId: number;
  appointmentDate: string;
  appointmentTime: string;
  duration?: number;
  type: AppointmentType;
  notes: string;
}

export interface UpdateAppointmentStatusRequest {
  status: AppointmentStatus;
  cancelReason?: string;
}
