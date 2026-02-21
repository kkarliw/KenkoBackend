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
import {
  createAppointment,
  updateAppointmentStatus,
  getPatients,
  Patient,
  Appointment,
} from '@/lib/api';
import { validateDateNotInPast, validateTimeNotInPast, APPOINTMENT_TYPES } from '@/utils/helpers';

interface AppointmentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  appointmentId?: number;
  initialAppointment?: Appointment;
}

export const AppointmentForm = ({
  open,
  onOpenChange,
  onSuccess,
  appointmentId,
  initialAppointment,
}: AppointmentFormProps) => {
  const [formData, setFormData] = useState({
    patientId: 0,
    doctorId: 1,
    appointmentDate: '',
    appointmentTime: '',
    type: 'CONSULTATION',
    notes: '',
  });

  const [patients, setPatients] = useState<Patient[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar pacientes
  useEffect(() => {
    if (open) {
      (async () => {
        try {
          const data = await getPatients();
          setPatients(data);
        } catch (error) {
          console.error('Error cargando pacientes:', error);
          toast.error('Error al cargar pacientes');
        }
      })();
    }
  }, [open]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.patientId || formData.patientId === 0) {
      newErrors.patientId = 'Paciente es requerido';
    }
    if (!formData.appointmentDate) {
      newErrors.appointmentDate = 'Fecha es requerida';
    } else if (!validateDateNotInPast(formData.appointmentDate)) {
      newErrors.appointmentDate = 'La fecha no puede ser anterior a hoy';
    }
    if (!formData.appointmentTime) {
      newErrors.appointmentTime = 'Hora es requerida';
    } else if (!validateTimeNotInPast(formData.appointmentDate, formData.appointmentTime)) {
      newErrors.appointmentTime = 'La hora no puede ser en el pasado';
    }
    if (!formData.type) {
      newErrors.type = 'Tipo de cita es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    const numValue = name === 'patientId' ? parseInt(value) : value;
    setFormData((prev) => ({
      ...prev,
      [name]: numValue,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await createAppointment({
        patientId: formData.patientId,
        doctorId: formData.doctorId,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        type: formData.type,
        notes: formData.notes,
      });
      toast.success('Cita creada exitosamente');
      onOpenChange(false);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Error al crear la cita';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{appointmentId ? 'Editar' : 'Crear'} Cita</DialogTitle>
          <DialogDescription>
            Completa los datos de la cita. Los campos marcados con * son obligatorios.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Paciente */}
          <div className="space-y-2">
            <Label htmlFor="patientId">
              Paciente <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.patientId.toString()}
              onValueChange={(value) => handleSelectChange('patientId', value)}
            >
              <SelectTrigger className={errors.patientId ? 'border-red-500' : ''}>
                <SelectValue placeholder="Selecciona un paciente" />
              </SelectTrigger>
              <SelectContent>
                {patients.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id.toString()}>
                    {patient.firstName} {patient.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.patientId && <p className="text-sm text-red-500">{errors.patientId}</p>}
          </div>

          {/* Fecha y Hora */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="appointmentDate">
                Fecha <span className="text-red-500">*</span>
              </Label>
              <Input
                id="appointmentDate"
                name="appointmentDate"
                type="date"
                value={formData.appointmentDate}
                onChange={handleInputChange}
                className={errors.appointmentDate ? 'border-red-500' : ''}
              />
              {errors.appointmentDate && (
                <p className="text-sm text-red-500">{errors.appointmentDate}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="appointmentTime">
                Hora <span className="text-red-500">*</span>
              </Label>
              <Input
                id="appointmentTime"
                name="appointmentTime"
                type="time"
                value={formData.appointmentTime}
                onChange={handleInputChange}
                className={errors.appointmentTime ? 'border-red-500' : ''}
              />
              {errors.appointmentTime && (
                <p className="text-sm text-red-500">{errors.appointmentTime}</p>
              )}
            </div>
          </div>

          {/* Tipo de Cita */}
          <div className="space-y-2">
            <Label htmlFor="type">
              Tipo de Cita <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.type} onValueChange={(value) => handleSelectChange('type', value)}>
              <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {APPOINTMENT_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
          </div>

          {/* Notas */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notas Adicionales</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Síntomas, historial relevante, etc."
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
