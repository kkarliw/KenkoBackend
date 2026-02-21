// ============================================
// VALIDACIONES
// ============================================

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/\D/g, '');
  return cleanPhone.length >= 7;
};

export const validateDocumentNumber = (doc: string): boolean => {
  return doc && doc.trim().length >= 5;
};

export const validatePassword = (password: string): boolean => {
  return password && password.length >= 6;
};

export const validateDateNotInPast = (date: string): boolean => {
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selectedDate >= today;
};

export const validateTimeNotInPast = (date: string, time: string): boolean => {
  const [hours, minutes] = time.split(':').map(Number);
  const selectedDateTime = new Date(date);
  selectedDateTime.setHours(hours, minutes, 0, 0);
  
  const now = new Date();
  return selectedDateTime >= now;
};

// ============================================
// FORMATEOS
// ============================================

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

export const formatDateTime = (dateString: string, timeString?: string): string => {
  const date = new Date(dateString);
  const formatted = date.toLocaleDateString('es-ES', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
  
  if (timeString) {
    return `${formatted} ${timeString}`;
  }
  return formatted;
};

export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length <= 3) return cleaned;
  if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
  return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
};

export const formatFullName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`.trim();
};

export const truncateText = (text: string, maxLength: number = 50): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// ============================================
// CONVERSIONES
// ============================================

export const getStatusBadgeColor = (status: string): string => {
  switch (status?.toUpperCase()) {
    case 'ACTIVE':
      return 'bg-green-100 text-green-800';
    case 'INACTIVE':
      return 'bg-gray-100 text-gray-800';
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800';
    case 'CONFIRMED':
      return 'bg-blue-100 text-blue-800';
    case 'CHECKED_IN':
      return 'bg-purple-100 text-purple-800';
    case 'COMPLETED':
      return 'bg-green-100 text-green-800';
    case 'CANCELLED':
      return 'bg-red-100 text-red-800';
    case 'NO_SHOW':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    'ACTIVE': 'Activo',
    'INACTIVE': 'Inactivo',
    'PENDING': 'Pendiente',
    'CONFIRMED': 'Confirmada',
    'CHECKED_IN': 'Check-in',
    'COMPLETED': 'Completada',
    'CANCELLED': 'Cancelada',
    'NO_SHOW': 'No apareció',
  };
  return labels[status?.toUpperCase()] || status;
};

export const getAppointmentTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    'CONSULTATION': 'Consulta',
    'CHECKUP': 'Revisión',
    'TREATMENT': 'Tratamiento',
    'PROCEDURE': 'Procedimiento',
  };
  return labels[type?.toUpperCase()] || type;
};

export const getDocumentTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    'CC': 'Cédula',
    'CE': 'Cédula Extranjería',
    'PASSPORT': 'Pasaporte',
  };
  return labels[type?.toUpperCase()] || type;
};

export const getGenderLabel = (gender: string): string => {
  const labels: Record<string, string> = {
    'M': 'Masculino',
    'F': 'Femenino',
    'O': 'Otro',
  };
  return labels[gender?.toUpperCase()] || gender;
};

// ============================================
// CONSTANTES
// ============================================

export const DOCUMENT_TYPES = [
  { value: 'CC', label: 'Cédula Ciudadanía' },
  { value: 'CE', label: 'Cédula Extranjería' },
  { value: 'PASSPORT', label: 'Pasaporte' },
];

export const GENDERS = [
  { value: 'M', label: 'Masculino' },
  { value: 'F', label: 'Femenino' },
  { value: 'O', label: 'Otro' },
];

export const BLOOD_TYPES = [
  'O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'
];

export const APPOINTMENT_TYPES = [
  { value: 'CONSULTATION', label: 'Consulta' },
  { value: 'CHECKUP', label: 'Revisión' },
  { value: 'TREATMENT', label: 'Tratamiento' },
  { value: 'PROCEDURE', label: 'Procedimiento' },
];

export const APPOINTMENT_STATUSES = [
  { value: 'PENDING', label: 'Pendiente' },
  { value: 'CONFIRMED', label: 'Confirmada' },
  { value: 'CHECKED_IN', label: 'Check-in' },
  { value: 'COMPLETED', label: 'Completada' },
  { value: 'CANCELLED', label: 'Cancelada' },
  { value: 'NO_SHOW', label: 'No apareció' },
];

export const APPOINTMENTS_PER_PAGE = [10, 25, 50];
