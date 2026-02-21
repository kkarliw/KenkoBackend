import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

export default function Registro() {
  const [formData, setFormData] = useState({
    organizationName: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    country: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const update = (field: string, value: string) => 
    setFormData({ ...formData, [field]: value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!formData.organizationName || !formData.email || !formData.password || 
        !formData.firstName || !formData.lastName) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    setIsLoading(true);
    try {
      console.log('📝 Registrando organización:', formData.organizationName);
      await register(formData);
      toast.success('✅ Organización registrada');

      // Auto-login después del registro
      setTimeout(async () => {
        try {
          console.log('🔐 Auto-login después del registro...');
          await login(formData.email, formData.password);
          toast.success('✅ Sesión iniciada automáticamente');
          console.log('🚀 Redirigiendo a /onboarding');
          navigate('/onboarding', { replace: true });
        } catch (loginError: any) {
          console.error('❌ Auto-login fallido, redirigiendo a login:', loginError);
          navigate('/login', { replace: true });
        }
      }, 500);
    } catch (error: any) {
      const message = error?.response?.data?.message || 
                     error?.message || 
                     'Error al registrar la organización';
      toast.error(`❌ ${message}`);
      console.error('❌ Register error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 flex items-center justify-center p-4 py-8">
      <Card className="w-full max-w-2xl p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Kenkō</h1>
          <p className="text-slate-600 text-lg">Registra tu Organización</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Organización */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              🏥 Nombre de la Organización *
            </label>
            <Input
              value={formData.organizationName}
              onChange={(e) => update('organizationName', e.target.value)}
              placeholder="Clínica San José"
              disabled={isLoading}
              className="h-11"
              required
            />
          </div>

          {/* Admin Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                👤 Nombre Admin *
              </label>
              <Input
                value={formData.firstName}
                onChange={(e) => update('firstName', e.target.value)}
                placeholder="Juan"
                disabled={isLoading}
                className="h-11"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                👤 Apellido Admin *
              </label>
              <Input
                value={formData.lastName}
                onChange={(e) => update('lastName', e.target.value)}
                placeholder="García"
                disabled={isLoading}
                className="h-11"
                required
              />
            </div>
          </div>

          {/* Email y Teléfono */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                📧 Email *
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="admin@clinica.com"
                disabled={isLoading}
                className="h-11"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                📱 Teléfono *
              </label>
              <Input
                value={formData.phone}
                onChange={(e) => update('phone', e.target.value)}
                placeholder="+57 300 000 0000"
                disabled={isLoading}
                className="h-11"
                required
              />
            </div>
          </div>

          {/* Dirección */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              📍 Dirección *
            </label>
            <Input
              value={formData.address}
              onChange={(e) => update('address', e.target.value)}
              placeholder="Calle 123 #45-67"
              disabled={isLoading}
              className="h-11"
              required
            />
          </div>

          {/* Ciudad y País */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                🏙️ Ciudad *
              </label>
              <Input
                value={formData.city}
                onChange={(e) => update('city', e.target.value)}
                placeholder="Bogotá"
                disabled={isLoading}
                className="h-11"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                🌍 País *
              </label>
              <Input
                value={formData.country}
                onChange={(e) => update('country', e.target.value)}
                placeholder="Colombia"
                disabled={isLoading}
                className="h-11"
                required
              />
            </div>
          </div>

          {/* Contraseñas */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                🔐 Contraseña (mín 8 caracteres) *
              </label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => update('password', e.target.value)}
                placeholder="••••••••"
                disabled={isLoading}
                className="h-11"
                minLength={8}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                🔐 Confirmar Contraseña *
              </label>
              <Input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => update('confirmPassword', e.target.value)}
                placeholder="••••••••"
                disabled={isLoading}
                className="h-11"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-11 font-semibold text-base"
            disabled={isLoading}
          >
            {isLoading ? '⏳ Registrando...' : '✅ Crear Organización'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-600 text-sm">
            ¿Ya tienes organización?{' '}
            <a
              href="/login"
              className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
            >
              Inicia sesión →
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
}
