import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useApi } from '@/hooks/useApi';
import { createPatient, updatePatient, getPatientById, Patient } from '@/lib/api';
import {
  validateEmail,
  validatePhone,
  DOCUMENT_TYPES,
  GENDERS,
  BLOOD_TYPES,
} from '@/utils/helpers';

interface PatientFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientId?: number;
  onSuccess?: () => void;
}

export const PatientForm = ({
  open,
  onOpenChange,
  patientId,
  onSuccess,
}: PatientFormProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    documentType: 'CC',
    documentNumber: '',
    birthDate: '',
    gender: 'M',
    address: '',
    city: '',
    bloodType: 'O+',
    emergencyContact: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar datos del paciente si es edición
  useEffect(() => {
    if (patientId && open) {
      (async () => {
        try {
          const patient = await getPatientById(patientId);
          setFormData({
            firstName: patient.firstName || '',
            lastName: patient.lastName || '',
            email: patient.email || '',
            phone: patient.phone || '',
            documentType: 'CC',
            documentNumber: '',
            birthDate: '',
            gender: 'M',
            address: patient.address || '',
            city: '',
            bloodType: 'O+',
            emergencyContact: '',
            notes: '',
          });
        } catch (error) {
          console.error('Error cargando paciente:', error);
          toast.error('No se pudo cargar los datos del paciente');
        }
      })();
    } else if (!patientId && open) {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        documentType: 'CC',
        documentNumber: '',
        birthDate: '',
        gender: 'M',
        address: '',
        city: '',
        bloodType: 'O+',
        emergencyContact: '',
        notes: '',
      });
      setErrors({});
    }
  }, [patientId, open]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'Nombre es requerido';
    if (!formData.lastName.trim()) newErrors.lastName = 'Apellido es requerido';
    if (!validateEmail(formData.email)) newErrors.email = 'Email inválido';
    if (!validatePhone(formData.phone)) newErrors.phone = 'Teléfono debe tener mínimo 7 dígitos';
    if (!formData.documentNumber.trim()) newErrors.documentNumber = 'Documento es requerido';
    if (!formData.birthDate) newErrors.birthDate = 'Fecha de nacimiento es requerida';
    if (!formData.address.trim()) newErrors.address = 'Dirección es requerida';
    if (!formData.city.trim()) newErrors.city = 'Ciudad es requerida';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      if (patientId) {
        await updatePatient(patientId, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        } as any);
        toast.success('Paciente actualizado exitosamente');
      } else {
        await createPatient({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        } as any);
        toast.success('Paciente creado exitosamente');
      }
      onOpenChange(false);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Error al guardar el paciente';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl">
        <DialogHeader>
          <DialogTitle>{patientId ? 'Editar' : 'Crear'} Paciente</DialogTitle>
          <DialogDescription>
            Completa los datos del paciente. Los campos marcados con * son obligatorios.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombres */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                Nombre <span className="text-red-500">*</span>
              </Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Juan"
                className={errors.firstName ? 'border-red-500' : ''}
              />
              {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">
                Apellido <span className="text-red-500">*</span>
              </Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Pérez"
                className={errors.lastName ? 'border-red-500' : ''}
              />
              {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
            </div>
          </div>

          {/* Email y Teléfono */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="juan@example.com"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                Teléfono <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(555) 123-4567"
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
            </div>
          </div>

          {/* Documento */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="documentType">Tipo Documento</Label>
              <Select value={formData.documentType} onValueChange={(value) => handleSelectChange('documentType', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DOCUMENT_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="documentNumber">Número Documento</Label>
              <Input
                id="documentNumber"
                name="documentNumber"
                value={formData.documentNumber}
                onChange={handleInputChange}
                placeholder="123456789"
                className={errors.documentNumber ? 'border-red-500' : ''}
              />
              {errors.documentNumber && (
                <p className="text-sm text-red-500">{errors.documentNumber}</p>
              )}
            </div>
          </div>

          {/* Fecha de Nacimiento y Género */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="birthDate">
                Fecha de Nacimiento <span className="text-red-500">*</span>
              </Label>
              <Input
                id="birthDate"
                name="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={handleInputChange}
                className={errors.birthDate ? 'border-red-500' : ''}
              />
              {errors.birthDate && <p className="text-sm text-red-500">{errors.birthDate}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Género</Label>
              <Select value={formData.gender} onValueChange={(value) => handleSelectChange('gender', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {GENDERS.map((gender) => (
                    <SelectItem key={gender.value} value={gender.value}>
                      {gender.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Dirección y Ciudad */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="address">
                Dirección <span className="text-red-500">*</span>
              </Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Calle Principal 123"
                className={errors.address ? 'border-red-500' : ''}
              />
              {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">
                Ciudad <span className="text-red-500">*</span>
              </Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Bogotá"
                className={errors.city ? 'border-red-500' : ''}
              />
              {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
            </div>
          </div>

          {/* Tipo de Sangre y Contacto de Emergencia */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bloodType">Tipo de Sangre</Label>
              <Select value={formData.bloodType} onValueChange={(value) => handleSelectChange('bloodType', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BLOOD_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyContact">Contacto de Emergencia</Label>
              <Input
                id="emergencyContact"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                placeholder="(555) 987-6543"
              />
            </div>
          </div>

          {/* Notas */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notas Adicionales</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Alergias, condiciones especiales, etc."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : 'Guardar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
