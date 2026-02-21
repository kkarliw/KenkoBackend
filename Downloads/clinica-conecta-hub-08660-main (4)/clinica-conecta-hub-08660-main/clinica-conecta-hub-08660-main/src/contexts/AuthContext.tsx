import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerOrganization, getMe, type AuthResponse, type UserProfile } from '@/lib/api';

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

  // On mount: check for stored token and validate
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const handleAuthResponse = useCallback((data: AuthResponse) => {
    const tkn = data.accessToken;
    const profile: UserProfile = {
      id: data.userId,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      orgId: data.orgId,
    };

    setToken(tkn);
    setUser(profile);
    localStorage.setItem('token', tkn);
    localStorage.setItem('user', JSON.stringify(profile));
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    handleAuthResponse(data);
  };

  const register = async (formData: any) => {
    const data = await registerOrganization({
      organizationName: formData.organizationName,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      country: formData.country,
      firstName: formData.firstName,
      lastName: formData.lastName,
    });
    handleAuthResponse(data);
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
