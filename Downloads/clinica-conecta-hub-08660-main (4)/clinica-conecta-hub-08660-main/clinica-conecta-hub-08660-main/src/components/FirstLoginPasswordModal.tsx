import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { changePassword } from '@/lib/api';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function FirstLoginPasswordModal() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  if (!user?.id) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.currentPassword || !formData.newPassword) {
      toast.error('Por favor rellena todas las contraseñas');
      return;
    }

    if (formData.newPassword.length < 8) {
      toast.error('La nueva contraseña debe tener al menos 8 caracteres');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    setIsLoading(true);
    try {
      await changePassword(user.id, {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      toast.success('✅ Contraseña actualizada correctamente');
      console.log('📧 Email de confirmación enviado');

      // Actualizar localStorage para quitar el estado PENDING_FIRST_LOGIN
      const userData = localStorage.getItem('user');
      if (userData) {
        const updated = JSON.parse(userData);
        updated.status = 'ACTIVE';
        localStorage.setItem('user', JSON.stringify(updated));
      }

      setIsOpen(false);
    } catch (error: any) {
      const message = error?.response?.data?.message || 
                     error?.message || 
                     'Error al cambiar contraseña';
      toast.error(`❌ ${message}`);
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-xl">🔐 Cambiar Contraseña</DialogTitle>
          <DialogDescription>
            Este es tu primer acceso. Por favor cambia tu contraseña temporal.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Contraseña Temporal Actual
            </label>
            <Input
              type="password"
              value={formData.currentPassword}
              onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
              placeholder="••••••••"
              disabled={isLoading}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Nueva Contraseña (mín. 8 caracteres)
            </label>
            <Input
              type="password"
              value={formData.newPassword}
              onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
              placeholder="••••••••"
              disabled={isLoading}
              minLength={8}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Confirmar Nueva Contraseña
            </label>
            <Input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              placeholder="••••••••"
              disabled={isLoading}
              required
            />
          </div>

          <div className="p-3 bg-blue-50 rounded border border-blue-200">
            <p className="text-xs text-blue-800">
              <strong>✅ Requerimiento:</strong> Debes cambiar tu contraseña para continuar. 
              Se enviará un email de confirmación.
            </p>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? '⏳ Cambiando...' : '✅ Cambiar Contraseña'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
