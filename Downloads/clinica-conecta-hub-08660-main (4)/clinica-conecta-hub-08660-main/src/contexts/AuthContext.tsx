// AuthContext v3 — role-based routing
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerOrganization, normalizeAuthResponse, getMe, type UserProfile } from '@/lib/api';

export type UserRole = 'ADMIN' | 'DOCTOR' | 'RECEPTIONIST' | 'PATIENT' | 'CAREGIVER';

export function getDashboardPath(role?: string): string {
  switch (role) {
    case 'ADMIN': return '/admin/dashboard';
    case 'DOCTOR': return '/doctor/dashboard';
    case 'RECEPTIONIST': return '/receptionist/dashboard';
    case 'PATIENT': return '/patient/dashboard';
    case 'CAREGIVER': return '/caregiver/dashboard';
    default: return '/dashboard';
  }
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // On mount: restore from localStorage and validate
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      // Optimizamos mostrando estado autenticado de inmediato
      setToken(storedToken);
      setUser(JSON.parse(storedUser));

      // Validamos en background contra el backend
      getMe().then(profile => {
        setUser(profile);
        localStorage.setItem('user', JSON.stringify(profile));
      }).catch((err) => {
        // Si el token es inválido o expiró
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }).finally(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const saveAuth = useCallback((tkn: string, profile: UserProfile) => {
    setToken(tkn);
    setUser(profile);
    localStorage.setItem('token', tkn);
    localStorage.setItem('user', JSON.stringify(profile));
    // Role-based redirect
    navigate(getDashboardPath(profile.role));
  }, [navigate]);

  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    const { token: tkn, profile } = normalizeAuthResponse(data);
    saveAuth(tkn, profile);
  };

  const register = async (formData: any) => {
    const data = await registerOrganization({
      organizationName: formData.organizationName || formData.orgName,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      country: formData.country,
      firstName: formData.firstName || formData.adminFirstName,
      lastName: formData.lastName || formData.adminLastName,
    });
    const { token: tkn, profile } = normalizeAuthResponse(data);
    saveAuth(tkn, profile);
  };

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        user, token, login, register, logout,
        isAuthenticated: !!token && !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
