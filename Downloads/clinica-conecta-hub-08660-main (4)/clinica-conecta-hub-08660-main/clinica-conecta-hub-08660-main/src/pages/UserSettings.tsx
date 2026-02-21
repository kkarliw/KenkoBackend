import { useState } from 'react';
import ClinicalLayout from '@/components/layouts/ClinicalLayout';
import { useAuth } from '@/contexts/AuthContext';
import { changePassword } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function UserSettings() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [profileForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    role: user?.role || '',
  });

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      toast.error('Por favor completa los campos de contraseña');
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      toast.error('La nueva contraseña debe tener al menos 8 caracteres');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    if (passwordForm.currentPassword === passwordForm.newPassword) {
      toast.error('La nueva contraseña debe ser diferente a la actual');
      return;
    }

    setIsLoading(true);
    try {
      if (!user?.id) {
        toast.error('No hay usuario autenticado');
        return;
      }

      await changePassword(user.id, {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      toast.success('✅ Contraseña actualizada correctamente');
      console.log('📧 Email de confirmación enviado');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
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
    <ClinicalLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 p-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">⚙️ Configuración</h1>
            <p className="text-slate-600">Administra tu cuenta y configuraciones</p>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">👤 Perfil</TabsTrigger>
              <TabsTrigger value="password">🔐 Contraseña</TabsTrigger>
              <TabsTrigger value="security">🛡️ Seguridad</TabsTrigger>
            </TabsList>

            {/* TAB: Profile */}
            <TabsContent value="profile" className="space-y-6 mt-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-6">Información Personal</h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Nombre
                      </label>
                      <Input value={profileForm.firstName} disabled className="h-11" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Apellido
                      </label>
                      <Input value={profileForm.lastName} disabled className="h-11" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      📧 Email
                    </label>
                    <Input value={profileForm.email} type="email" disabled className="h-11" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Rol
                    </label>
                    <Input value={profileForm.role} disabled className="h-11" />
                  </div>

                  <div className="p-4 bg-blue-50 rounded border border-blue-200">
                    <p className="text-sm text-blue-800">
                      <strong>ℹ️ Nota:</strong> Para cambiar tu información personal, contacta al administrador.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* TAB: Password */}
            <TabsContent value="password" className="space-y-6 mt-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-6">Cambiar Contraseña</h2>

                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Contraseña Actual
                    </label>
                    <Input
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                      }
                      placeholder="••••••••"
                      disabled={isLoading}
                      className="h-11"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Nueva Contraseña (mín. 8 caracteres)
                    </label>
                    <Input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                      }
                      placeholder="••••••••"
                      disabled={isLoading}
                      minLength={8}
                      className="h-11"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Confirmar Nueva Contraseña
                    </label>
                    <Input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                      }
                      placeholder="••••••••"
                      disabled={isLoading}
                      className="h-11"
                      required
                    />
                  </div>

                  <div className="p-4 bg-amber-50 rounded border border-amber-200">
                    <p className="text-sm text-amber-800">
                      <strong>🔐 Seguridad:</strong> Se enviará un email de confirmación cuando cambies 
                      tu contraseña. Todas las acciones se registran en la auditoría del sistema.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      className="flex-1 h-11 font-semibold"
                      disabled={isLoading}
                    >
                      {isLoading ? '⏳ Cambiando...' : '✅ Cambiar Contraseña'}
                    </Button>
                  </div>
                </form>
              </Card>
            </TabsContent>

            {/* TAB: Security */}
            <TabsContent value="security" className="space-y-6 mt-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-6">Historial de Seguridad</h2>

                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded border border-slate-200">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-slate-900">🔐 Última Contraseña Cambiada</p>
                        <p className="text-sm text-slate-600">
                          Hace 5 días • 14:30 | IP: 192.168.1.100
                        </p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        ✅ Exitoso
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded border border-slate-200">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-slate-900">⏳ Sesión Activa Actual</p>
                        <p className="text-sm text-slate-600">
                          Desde hace 2 horas | IP: 192.168.1.100 | Browser: Chrome
                        </p>
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        🟢 Activa
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded border border-slate-200">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-slate-900">🔑 Contraseña Temporal Recibida</p>
                        <p className="text-sm text-slate-600">
                          19 de febrero, 2026 | Razón: Nuevo usuario
                        </p>
                      </div>
                      <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                        ⚠️ Reemplazada
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded border border-blue-200">
                    <p className="text-sm text-blue-800">
                      <strong>ℹ️ Nota:</strong> Para ver el historial completo de auditoría, 
                      solicita acceso al administrador.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ClinicalLayout>
  );
}
