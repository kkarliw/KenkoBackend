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
  console.log('📤 Enviando petición:', { url: config.url, hasToken: !!token, tokenLength: token?.length });
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('✅ Token agregado al header');
  } else {
    console.warn('⚠️ No hay token en localStorage');
  }
  return config;
});

// Error interceptor
api.interceptors.response.use(
  (response) => {
    // Desenvuelver ApiResponse wrapper del backend
    if (response.data?.data !== undefined) {
      console.log('🔄 Desenvolviendo ApiResponse:', response.config.url);
      return {
        ...response,
        data: response.data.data,
      };
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

export interface AuthResponse {
  accessToken: string;
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  orgId: number;
}

export interface UserProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  orgId: number;
}

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', { email, password });
  console.log('✅ Token recibido:', response.data.accessToken?.substring(0, 20) + '...');
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
  const response = await api.post<AuthResponse>('/auth/register-organization', data);
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
  birthDate: string;
  orgId: number;
  createdAt: string;
  status: string;
}

export const getPatients = async (): Promise<Patient[]> => {
  const response = await api.get<any>('/pacientes');
  // El backend retorna PaginationDto, extraer array 'content'
  return response.data?.content || response.data || [];
};

export const getPatientById = async (id: number): Promise<Patient> => {
  const response = await api.get<Patient>(`/pacientes/${id}`);
  return response.data;
};

export const createPatient = async (patient: Omit<Patient, 'id' | 'orgId' | 'createdAt' | 'status'>): Promise<Patient> => {
  const response = await api.post<Patient>('/pacientes', patient);
  return response.data;
};

export const updatePatient = async (id: number, patient: Partial<Patient>): Promise<Patient> => {
  const response = await api.put<Patient>(`/pacientes/${id}`, patient);
  return response.data;
};

export const deletePatient = async (id: number): Promise<void> => {
  await api.delete(`/pacientes/${id}`);
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
  appointmentTime: string;
  type: string;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  notes: string;
  createdAt: string;
}

export const getAppointments = async (): Promise<Appointment[]> => {
  const response = await api.get<any>('/appointments');
  // El backend retorna PaginationDto, extraer array 'content'
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
// ORGANIZATION & ONBOARDING
// ============================================

export interface OrganizationData {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  logoUrl?: string;
  operatingHours?: Record<string, { open: string; close: string }>;
  specialties?: string[];
  status: string;
  createdAt: string;
}

export interface UserCreationResponse {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  tempPassword: string;
  emailSent: boolean;
}

export interface BulkUsersResponse {
  created: number;
  failed: number;
  users: UserCreationResponse[];
}

export interface AuditLogEntry {
  id: number;
  action: 'CREATE_USER' | 'UPDATE_PASSWORD' | 'RESET_PASSWORD' | 'UPDATE_PROFILE';
  userId: number;
  userName: string;
  targetUserId?: number;
  targetUserName?: string;
  timestamp: string;
  ipAddress: string;
  status: 'SUCCESS' | 'FAILED';
  details?: Record<string, any>;
}

// Organization endpoints
export const updateOrganization = async (data: Partial<OrganizationData>): Promise<OrganizationData> => {
  const response = await api.put<OrganizationData>('/organization', data);
  return response.data;
};

export const getOrganization = async (): Promise<OrganizationData> => {
  const response = await api.get<OrganizationData>('/organization');
  return response.data;
};

// User management endpoints
export const createOrgUser = async (data: {
  email: string;
  firstName: string;
  lastName: string;
  role: 'DOCTOR' | 'RECEPTIONIST' | 'PATIENT' | 'CAREGIVER';
  phone?: string;
}): Promise<UserCreationResponse> => {
  const response = await api.post<UserCreationResponse>('/organization/users', data);
  return response.data;
};

export const createBulkUsers = async (users: Array<{
  email: string;
  firstName: string;
  lastName: string;
  role: 'DOCTOR' | 'RECEPTIONIST' | 'PATIENT';
  phone?: string;
}>): Promise<BulkUsersResponse> => {
  const response = await api.post<BulkUsersResponse>('/organization/bulk-users', { users });
  return response.data;
};

export const getOrgUsers = async (): Promise<any[]> => {
  const response = await api.get<any>('/organization/users');
  return response.data?.content || response.data || [];
};

// Password management endpoints
export const changePassword = async (userId: number, data: {
  currentPassword: string;
  newPassword: string;
}): Promise<{ success: boolean; emailSent: boolean; message: string }> => {
  const response = await api.put(`/users/${userId}/password`, data);
  return response.data;
};

export const resetPassword = async (userId: number): Promise<{
  tempPassword: string;
  emailSent: boolean;
  message: string;
}> => {
  const response = await api.post(`/organization/users/${userId}/reset-password`);
  return response.data;
};

// Audit log endpoints
export interface AuditLogResponse {
  content: AuditLogEntry[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}

export const getAuditLog = async (page: number = 0, size: number = 10, filters?: {
  action?: string;
  userId?: number;
  startDate?: string;
  endDate?: string;
}): Promise<AuditLogResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    ...(filters?.action && { action: filters.action }),
    ...(filters?.userId && { userId: filters.userId.toString() }),
    ...(filters?.startDate && { startDate: filters.startDate }),
    ...(filters?.endDate && { endDate: filters.endDate }),
  });
  const response = await api.get<AuditLogResponse>(`/organization/audit-log?${params}`);
  return response.data;
};