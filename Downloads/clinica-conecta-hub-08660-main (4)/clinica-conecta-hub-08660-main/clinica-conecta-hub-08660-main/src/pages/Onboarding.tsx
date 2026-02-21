import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import {
  createOrgUser,
  updateOrganization,
  getOrgUsers,
  type UserCreationResponse,
} from '@/lib/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Step = 'org-data' | 'doctors' | 'receptionists';

interface OrgFormData {
  name: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  operatingHours: {
    open: string;
    close: string;
  };
}

interface UserFormData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export default function Onboarding() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Estado general
  const [currentStep, setCurrentStep] = useState<Step>('org-data');
  const [isLoading, setIsLoading] = useState(false);

  // Datos organización
  const [orgData, setOrgData] = useState<OrgFormData>({
    name: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    operatingHours: { open: '08:00', close: '18:00' },
  });

  // Usuarios creados
  const [doctors, setDoctors] = useState<UserCreationResponse[]>([]);
  const [receptionists, setReceptionists] = useState<UserCreationResponse[]>([]);

  // Modal para crear usuario
  const [showUserModal, setShowUserModal] = useState(false);
  const [currentRole, setCurrentRole] = useState<'DOCTOR' | 'RECEPTIONIST'>('DOCTOR');
  const [userForm, setUserForm] = useState<UserFormData>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
  });

  // Handlers
  const handleOrgChange = (field: string, value: string) => {
    if (field.startsWith('hours-')) {
      const timeField = field.replace('hours-', '') as 'open' | 'close';
      setOrgData({
        ...orgData,
        operatingHours: { ...orgData.operatingHours, [timeField]: value },
      });
    } else {
      setOrgData({ ...orgData, [field]: value });
    }
  };

  const handleOrgSubmit = async () => {
    if (!orgData.name || !orgData.phone || !orgData.address) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    setIsLoading(true);
    try {
      await updateOrganization({
        name: orgData.name,
        phone: orgData.phone,
        address: orgData.address,
        city: orgData.city,
        country: orgData.country,
        operatingHours: orgData.operatingHours,
      });
      toast.success('✅ Datos guardados correctamente');
      setCurrentStep('doctors');
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || 'Error al guardar';
      toast.error(`❌ ${message}`);
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUser = async () => {
    if (!userForm.email || !userForm.firstName || !userForm.lastName) {
      toast.error('Por favor completa email, nombre y apellido');
      return;
    }

    setIsLoading(true);
    try {
      const newUser = await createOrgUser({
        email: userForm.email,
        firstName: userForm.firstName,
        lastName: userForm.lastName,
        phone: userForm.phone,
        role: currentRole,
      });

      if (currentRole === 'DOCTOR') {
        setDoctors([...doctors, newUser]);
      } else {
        setReceptionists([...receptionists, newUser]);
      }

      toast.success(`✅ ${currentRole === 'DOCTOR' ? 'Doctor' : 'Recepcionista'} creado`);
      setUserForm({ email: '', firstName: '', lastName: '', phone: '' });
      setShowUserModal(false);
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || 'Error al crear usuario';
      toast.error(`❌ ${message}`);
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinish = async () => {
    setIsLoading(true);
    try {
      console.log('✅ Onboarding completado');
      toast.success('¡Onboarding completado! Redirigiendo...');
      setTimeout(() => {
        navigate('/admin/dashboard', { replace: true });
      }, 800);
    } catch (error: any) {
      toast.error('Error al finalizar');
    } finally {
      setIsLoading(false);
    }
  };

  // Componentes reutilizables
  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-8">
      {(['org-data', 'doctors', 'receptionists'] as const).map((step, idx) => (
        <div key={step} className="flex items-center gap-2">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              currentStep === step
                ? 'bg-blue-600 text-white'
                : idx < (['org-data', 'doctors', 'receptionists'] as const).indexOf(currentStep)
                  ? 'bg-green-600 text-white'
                  : 'bg-slate-200 text-slate-600'
            }`}
          >
            {idx < (['org-data', 'doctors', 'receptionists'] as const).indexOf(currentStep) ? '✓' : idx + 1}
          </div>
          {idx < 2 && <div className="w-12 h-1 bg-slate-200"></div>}
        </div>
      ))}
    </div>
  );

  const UserTable = ({ users, role }: { users: UserCreationResponse[]; role: string }) => (
    <div className="space-y-3">
      {users.length === 0 ? (
        <div className="text-center py-6 text-slate-500">
          No hay {role.toLowerCase()}s creados aún
        </div>
      ) : (
        users.map((u, idx) => (
          <div key={idx} className="flex justify-between items-center p-4 bg-slate-50 rounded border border-slate-200">
            <div>
              <p className="font-semibold text-slate-900">
                {u.user.firstName} {u.user.lastName}
              </p>
              <p className="text-sm text-slate-600">{u.user.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                {u.emailSent ? '✉️ Enviado' : '⏳ Pendiente'}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Bienvenido a Kenkō</h1>
          <p className="text-slate-600">Configura tu organización en 3 pasos</p>
        </div>

        {/* Step Indicator */}
        <StepIndicator />

        {/* Content */}
        <Card className="p-8">
          {/* PASO 1: Datos Organización */}
          {currentStep === 'org-data' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">Paso 1/3</h2>
                <p className="text-slate-600 mb-6">Configura los datos de tu organización</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  🏥 Nombre de la Organización *
                </label>
                <Input
                  value={orgData.name}
                  onChange={(e) => handleOrgChange('name', e.target.value)}
                  placeholder="Clínica Central"
                  className="h-11"
                  disabled={isLoading}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    📱 Teléfono *
                  </label>
                  <Input
                    value={orgData.phone}
                    onChange={(e) => handleOrgChange('phone', e.target.value)}
                    placeholder="+57 300 000 0000"
                    className="h-11"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Horario Apertura
                  </label>
                  <Input
                    type="time"
                    value={orgData.operatingHours.open}
                    onChange={(e) => handleOrgChange('hours-open', e.target.value)}
                    className="h-11"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    📍 Dirección *
                  </label>
                  <Input
                    value={orgData.address}
                    onChange={(e) => handleOrgChange('address', e.target.value)}
                    placeholder="Calle 123 #45-67"
                    className="h-11"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Horario Cierre
                  </label>
                  <Input
                    type="time"
                    value={orgData.operatingHours.close}
                    onChange={(e) => handleOrgChange('hours-close', e.target.value)}
                    className="h-11"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    🏙️ Ciudad
                  </label>
                  <Input
                    value={orgData.city}
                    onChange={(e) => handleOrgChange('city', e.target.value)}
                    placeholder="Bogotá"
                    className="h-11"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    🌍 País
                  </label>
                  <Input
                    value={orgData.country}
                    onChange={(e) => handleOrgChange('country', e.target.value)}
                    placeholder="Colombia"
                    className="h-11"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button
                onClick={handleOrgSubmit}
                className="w-full h-11 font-semibold text-base"
                disabled={isLoading}
              >
                {isLoading ? '⏳ Guardando...' : '✅ Continuar'}
              </Button>
            </div>
          )}

          {/* PASO 2: Crear Doctores */}
          {currentStep === 'doctors' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">Paso 2/3</h2>
                <p className="text-slate-600 mb-6">Crea los doctores de tu organización</p>
              </div>

              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-900">👨‍⚕️ Doctores ({doctors.length})</h3>
                <Button
                  onClick={() => {
                    setCurrentRole('DOCTOR');
                    setShowUserModal(true);
                  }}
                  className="gap-2"
                >
                  ➕ Agregar Doctor
                </Button>
              </div>

              <UserTable users={doctors} role="Doctor" />

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => setCurrentStep('org-data')}
                  variant="outline"
                  className="flex-1 h-11"
                  disabled={isLoading}
                >
                  ← Atrás
                </Button>
                <Button
                  onClick={() => setCurrentStep('receptionists')}
                  className="flex-1 h-11"
                  disabled={isLoading}
                >
                  Continuar →
                </Button>
              </div>
            </div>
          )}

          {/* PASO 3: Crear Recepcionistas */}
          {currentStep === 'receptionists' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">Paso 3/3</h2>
                <p className="text-slate-600 mb-6">Crea los recepcionistas de tu organización (opcional)</p>
              </div>

              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-900">👩‍💼 Recepcionistas ({receptionists.length})</h3>
                <Button
                  onClick={() => {
                    setCurrentRole('RECEPTIONIST');
                    setShowUserModal(true);
                  }}
                  className="gap-2"
                >
                  ➕ Agregar Recepcionista
                </Button>
              </div>

              <UserTable users={receptionists} role="Recepcionista" />

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => setCurrentStep('doctors')}
                  variant="outline"
                  className="flex-1 h-11"
                  disabled={isLoading}
                >
                  ← Atrás
                </Button>
                <Button
                  onClick={handleFinish}
                  className="flex-1 h-11 bg-green-600 hover:bg-green-700"
                  disabled={isLoading}
                >
                  {isLoading ? '⏳ Finalizando...' : '✅ Finalizar'}
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Modal: Crear Usuario */}
      <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Agregar {currentRole === 'DOCTOR' ? 'Doctor' : 'Recepcionista'}
            </DialogTitle>
            <DialogDescription>
              Ingresa los datos para crear un nuevo {currentRole === 'DOCTOR' ? 'doctor' : 'recepcionista'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                📧 Email *
              </label>
              <Input
                type="email"
                value={userForm.email}
                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                placeholder="doctor@clinica.com"
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  👤 Nombre *
                </label>
                <Input
                  value={userForm.firstName}
                  onChange={(e) => setUserForm({ ...userForm, firstName: e.target.value })}
                  placeholder="Juan"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Apellido *
                </label>
                <Input
                  value={userForm.lastName}
                  onChange={(e) => setUserForm({ ...userForm, lastName: e.target.value })}
                  placeholder="García"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                📱 Teléfono (opcional)
              </label>
              <Input
                value={userForm.phone}
                onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                placeholder="+57 300 000 0000"
                disabled={isLoading}
              />
            </div>

            <div className="p-3 bg-blue-50 rounded border border-blue-200">
              <p className="text-xs text-blue-800">
                <strong>💡 Nota:</strong> Se generará una contraseña temporal y se enviará por email.
                El usuario deberá cambiarla en su primer acceso.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUserModal(false)} disabled={isLoading}>
              Cancelar
            </Button>
            <Button onClick={handleAddUser} disabled={isLoading}>
              {isLoading ? '⏳ Creando...' : '✅ Crear'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
