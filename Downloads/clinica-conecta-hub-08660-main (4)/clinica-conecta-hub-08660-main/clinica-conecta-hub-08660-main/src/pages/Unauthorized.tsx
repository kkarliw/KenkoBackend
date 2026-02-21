import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRoleDashboard } from '@/components/layout/RoleBasedRoute';

export default function Unauthorized() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const dashboard = useRoleDashboard();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md text-center">
        <div className="text-8xl mb-6">🔒</div>
        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          Acceso Denegado
        </h1>
        <p className="text-slate-600 mb-6 text-lg">
          No tienes permiso para acceder a esta página. 
          Por favor, verifica tu rol o contacta al administrador.
        </p>
        <div className="flex gap-3 flex-col">
          <Button onClick={() => navigate(dashboard)} className="h-12">
            ← Ir al Dashboard
          </Button>
          <Button 
            onClick={() => {
              logout();
              navigate('/login');
            }} 
            variant="outline" 
            className="h-12"
          >
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </div>
  );
}
