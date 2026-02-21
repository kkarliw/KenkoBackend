import axios from 'axios';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// JWT interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — unwrap ApiResponse wrapper & handle errors
api.interceptors.response.use(
  (response) => {
    // Backend may wrap in { data: ... } — unwrap if present
    if (response.data?.data !== undefined) {
      return { ...response, data: response.data.data };
    }
    return response;
  },
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    } else if (status === 403) {
      toast.error('No tienes permiso para esta acción');
    } else if (status === 404) {
      toast.error('Recurso no encontrado');
    } else if (status === 500) {
      toast.error('Error en el servidor');
    } else if (!error.response) {
      toast.error('Error de conexión con el servidor');
    }
    return Promise.reject(error);
  }
);

export default api;

// ============================================
// AUTH
// ============================================

/** Raw backend login/register response (nested format) */
export interface AuthResponse {
  accessToken: string;
  // Flat fields (original format)
  userId?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  orgId?: number;
  // Nested fields (new backend format)
  user?: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    orgId: number;
  };
  organization?: {
    id: number;
    name: string;
  };
}

export interface UserProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  orgId: number;
}

/** Normalize auth response — supports both flat and nested backend formats */
export function normalizeAuthResponse(data: AuthResponse): { token: string; profile: UserProfile } {
  const token = data.accessToken;
  const profile: UserProfile = data.user
    ? {
      id: data.user.id,
      email: data.user.email,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      role: data.user.role,
      orgId: data.user.orgId ?? data.organization?.id ?? 0,
    }
    : {
      id: data.userId!,
      email: data.email!,
      firstName: data.firstName!,
      lastName: data.lastName!,
      role: data.role!,
      orgId: data.orgId!,
    };
  return { token, profile };
}

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', { email, password });
  return response.data;
};

export const registerOrganization = async (data: {
  organizationName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  firstName: string;
  lastName: string;
}): Promise<AuthResponse> => {
  // Map frontend fields (organizationName, firstName, lastName) to backend DTO fields (orgName, adminFirstName, adminLastName)
  const backendData = {
    orgName: data.organizationName,
    email: data.email,
    password: data.password,
    adminFirstName: data.firstName,
    adminLastName: data.lastName,
    phone: data.phone,
    address: data.address,
    city: data.city,
    country: data.country
  };
  const response = await api.post<AuthResponse>('/auth/register-organization', backendData);
  return response.data;
};

export const getMe = async (): Promise<UserProfile> => {
  const response = await api.get<UserProfile>('/auth/me');
  return response.data;
};

// ============================================
// DASHBOARD
// ============================================

export interface DashboardStats {
  totalPatients: number;
  totalPendingAppointments: number;
  appointmentsToday: { id: number; patientName: string; time: string; type: string }[];
  upcomingAppointments: { id: number; patientName: string; date: string; time: string; type: string }[];
}

export const getDashboardStats = async (userId: number): Promise<DashboardStats> => {
  const response = await api.get<DashboardStats>(`/dashboard/${userId}`);
  return response.data;
};

export interface AdminDashboard {
  totalPatients?: number;
  totalDoctors?: number;
  totalAppointments?: number;
  totalPendingAppointments?: number;
  appointmentsToday?: any[];
  recentActivity?: any[];
  monthlyRevenue?: number;
  totalUsers?: number;
  // Fields used in AdminDashboard.tsx
  ingresosMes?: number;
  totalCitas?: number;
  totalPacientes?: number;
  tasaAusentismo?: number;
  citasHoy?: number;
  totalProfesionales?: number;
  citasPorEstado?: Record<string, number>;
}

export const getAdminDashboard = async (): Promise<AdminDashboard> => {
  const response = await api.get<AdminDashboard>('/dashboard/admin');
  return response.data;
};

export interface DoctorDashboard {
  totalPatientsToday?: number;
  nextAppointment?: any;
  todayAppointments?: any[];
  totalPatientsAttended?: number;
}

export const getDoctorDashboard = async (): Promise<DoctorDashboard> => {
  const response = await api.get<DoctorDashboard>('/dashboard/doctor');
  return response.data;
};

export interface ReceptionistDashboard {
  totalAppointmentsToday?: number;
  pendingAppointments?: number;
  checkedInPatients?: number;
  todayAppointments?: any[];
}

export const getReceptionistDashboard = async (): Promise<ReceptionistDashboard> => {
  const response = await api.get<ReceptionistDashboard>('/dashboard/receptionist');
  return response.data;
};

export const getDoctorAgendaToday = async (): Promise<Appointment[]> => {
  const response = await api.get<any>('/appointments/doctor/agenda/today');
  return response.data?.content || response.data || [];
};

export const getMyAppointments = async (): Promise<Appointment[]> => {
  const response = await api.get<any>('/appointments/patient/my-appointments');
  return response.data?.content || response.data || [];
};

export const getUsers = async (): Promise<any[]> => {
  const response = await api.get<any>('/users');
  return response.data?.content || response.data || [];
};

export const createUser = async (data: any): Promise<any> => {
  const response = await api.post<any>('/users', data);
  return response.data;
};

export const updateUser = async (id: number, data: any): Promise<any> => {
  const response = await api.put<any>(`/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};

// ============================================
// PACIENTES
// ============================================

export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  birthDate?: string;
  dateOfBirth?: string;
  documentType?: string;
  documentNumber?: string;
  gender?: string;
  bloodType?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  medicalHistory?: string;
  allergies?: string;
  currentMedications?: string;
  orgId?: number;
  createdAt?: string;
  status?: string;
}

export const getPatients = async (): Promise<Patient[]> => {
  const response = await api.get<any>('/patients');
  // Backend may return paginated { content: [...] } or plain array
  return response.data?.content || response.data || [];
};

export const getPatientById = async (id: number): Promise<Patient> => {
  const response = await api.get<Patient>(`/patients/${id}`);
  return response.data;
};

export const createPatient = async (patient: Partial<Patient>): Promise<Patient> => {
  const response = await api.post<Patient>('/patients', patient);
  return response.data;
};

export const updatePatient = async (id: number, patient: Partial<Patient>): Promise<Patient> => {
  const response = await api.put<Patient>(`/patients/${id}`, patient);
  return response.data;
};

export const deletePatient = async (id: number): Promise<void> => {
  await api.delete(`/patients/${id}`);
};

// ============================================
// APPOINTMENTS
// ============================================

export interface Appointment {
  id: number;
  patientId: number;
  patientName: string;
  doctorId: number;
  doctorName: string;
  appointmentDate: string;
  appointmentTime?: string;
  type: string;
  status: string;
  durationMinutes?: number;
  notes: string;
  createdAt?: string;
}

export const getAppointments = async (): Promise<Appointment[]> => {
  const response = await api.get<any>('/appointments');
  return response.data?.content || response.data || [];
};

export const createAppointment = async (data: {
  patientId: number;
  doctorId: number;
  appointmentDate: string;
  appointmentTime: string;
  type: string;
  notes: string;
}): Promise<Appointment> => {
  const response = await api.post<Appointment>('/appointments', data);
  return response.data;
};

export const updateAppointmentStatus = async (id: number, status: string): Promise<Appointment> => {
  const response = await api.patch<Appointment>(`/appointments/${id}`, { status });
  return response.data;
};

export const deleteAppointment = async (id: number): Promise<void> => {
  await api.delete(`/appointments/${id}`);
};
// ============================================
// MEDICAL RECORDS
// ============================================

export interface MedicalRecord {
  id: number;
  patientId: number;
  patientName: string;
  doctorId: number;
  doctorName: string;
  orgId: number;
  appointmentId?: number;
  reasonForConsultation: string;
  physicalExamination: string;
  diagnosis: string;
  treatmentPlan: string;
  internalNotes: string;
  createdAt: string;
  updatedAt: string;
}

export const getMedicalRecords = async (): Promise<MedicalRecord[]> => {
  const response = await api.get<any>('/medical-records');
  return response.data?.content || response.data || [];
};

export const getPatientMedicalRecords = async (patientId: number): Promise<MedicalRecord[]> => {
  const response = await api.get<any>(`/medical-records/patient/${patientId}`);
  return response.data?.content || response.data || [];
};

export const getMedicalRecordById = async (id: number): Promise<MedicalRecord> => {
  const response = await api.get<MedicalRecord>(`/medical-records/${id}`);
  return response.data;
};

export const createMedicalRecord = async (data: Partial<MedicalRecord>): Promise<MedicalRecord> => {
  const response = await api.post<MedicalRecord>('/medical-records', data);
  return response.data;
};

export const updateMedicalRecord = async (id: number, data: Partial<MedicalRecord>): Promise<MedicalRecord> => {
  const response = await api.put<MedicalRecord>(`/medical-records/${id}`, data);
  return response.data;
};

export const deleteMedicalRecord = async (id: number): Promise<void> => {
  await api.delete(`/medical-records/${id}`);
};
