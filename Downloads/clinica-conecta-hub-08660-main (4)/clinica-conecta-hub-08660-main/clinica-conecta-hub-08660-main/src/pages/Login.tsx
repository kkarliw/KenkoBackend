import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Por favor completa email y contraseña');
      return;
    }

    try {
      setIsLoading(true);
      console.log('🔐 Intentando login con:', email);
      await login(email, password);
      toast.success('✅ Login exitoso');
      
      // Redirect según rol después de un pequeño delay
      setTimeout(() => {
        const roleMap: Record<string, string> = {
          'ADMIN': '/admin/dashboard',
          'ORGANIZATION_ADMIN': '/admin/dashboard',
          'DOCTOR': '/doctor/dashboard',
          'MEDICO': '/doctor/dashboard',
          'RECEPTIONIST': '/receptionist/dashboard',
          'RECEPCIONISTA': '/receptionist/dashboard',
          'PATIENT': '/patient/dashboard',
          'PACIENTE': '/patient/dashboard',
          'CAREGIVER': '/caregiver/dashboard',
          'CUIDADOR': '/caregiver/dashboard',
        };
        
        const userRole = user?.role?.toUpperCase() || '';
        const dashboard = roleMap[userRole] || '/dashboard';
        console.log('👤 Rol:', userRole, '→ Redirigiendo a:', dashboard);
        navigate(dashboard, { replace: true });
      }, 500);
    } catch (error: any) {
      const message = error?.response?.data?.message || 
                     error?.message || 
                     'Error al iniciar sesión';
      toast.error(`❌ ${message}`);
      console.error('❌ Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Kenkō</h1>
          <p className="text-slate-600 text-lg">Sistema de Gestión Clínica</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              📧 Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@clinica.com"
              disabled={isLoading}
              autoComplete="email"
              className="h-11"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              🔐 Contraseña
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading}
              autoComplete="current-password"
              className="h-11"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-11 font-semibold text-base"
            disabled={isLoading}
          >
            {isLoading ? '⏳ Entrando...' : '✅ Entrar'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-600 text-sm">
            ¿No tienes organización?{' '}
            <a
              href="/registro"
              className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
            >
              Crear aquí →
            </a>
          </p>
        </div>


      </Card>
    </div>
  );
}
