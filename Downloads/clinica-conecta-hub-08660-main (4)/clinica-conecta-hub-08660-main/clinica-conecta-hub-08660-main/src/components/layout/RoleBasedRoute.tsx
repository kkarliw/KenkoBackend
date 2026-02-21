import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface RoleBasedRouteProps {
  children: React.ReactNode;
  requiredRoles: string[];
}

/**
 * Componente que protege rutas basado en el rol del usuario
 * Especifica los roles permitidos y redirige si no está autorizado
 */
export function RoleBasedRoute({
  children,
  requiredRoles,
}: RoleBasedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user role is in allowed roles
  const userRole = user?.role || '';
  if (!requiredRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}

/**
 * Hook para obtener el dashboard correcto según el role
 */
export function useRoleDashboard() {
  const { user } = useAuth();
  
  const dashboardMap: Record<string, string> = {
    'ADMIN': '/admin/dashboard',
    'ORGANIZATION_ADMIN': '/admin/dashboard',
    'MEDICO': '/doctor/dashboard',
    'DOCTOR': '/doctor/dashboard',
    'RECEPCIONISTA': '/receptionist/dashboard',
    'RECEPTIONIST': '/receptionist/dashboard',
    'PACIENTE': '/patient/dashboard',
    'PATIENT': '/patient/dashboard',
    'CUIDADOR': '/caregiver/dashboard',
    'CAREGIVER': '/caregiver/dashboard',
  };

  return dashboardMap[user?.role || ''] || '/dashboard';
}
