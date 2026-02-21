import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { AppointmentForm } from './AppointmentForm';
import { getAppointments, deleteAppointment, updateAppointmentStatus, Appointment } from '@/lib/api';
import { formatDateTime, getStatusLabel, getAppointmentTypeLabel, getStatusBadgeColor, APPOINTMENT_STATUSES } from '@/utils/helpers';

export const CitaTable = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Form dialog state
  const [formOpen, setFormOpen] = useState(false);

  // Delete confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<Appointment | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Status change state
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [appointmentToChangeStatus, setAppointmentToChangeStatus] = useState<Appointment | null>(null);
  const [newStatus, setNewStatus] = useState('');

  // Cargar citas
  const loadAppointments = async () => {
    setIsLoading(true);
    try {
      const data = await getAppointments();
      setAppointments(data);
      setFilteredAppointments(data);
    } catch (error) {
      console.error('Error cargando citas:', error);
      toast.error('Error al cargar citas');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  // Filtrar citas
  useEffect(() => {
    let filtered = appointments;

    // Filtro por búsqueda
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (appointment) =>
          appointment.patientName.toLowerCase().includes(searchLower) ||
          appointment.doctorName.toLowerCase().includes(searchLower)
      );
    }

    // Filtro por estado
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter((appointment) => appointment.status === statusFilter);
    }

    setFilteredAppointments(filtered);
  }, [searchTerm, statusFilter, appointments]);

  const handleCreateNew = () => {
    setFormOpen(true);
  };

  const handleDeleteClick = (appointment: Appointment) => {
    setAppointmentToDelete(appointment);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!appointmentToDelete) return;

    setIsDeleting(true);
    try {
      await deleteAppointment(appointmentToDelete.id);
      toast.success('Cita eliminada');
      await loadAppointments();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Error al eliminar cita';
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setAppointmentToDelete(null);
    }
  };

  const handleStatusChange = (appointment: Appointment) => {
    setAppointmentToChangeStatus(appointment);
    setNewStatus(appointment.status);
    setStatusDialogOpen(true);
  };

  const handleConfirmStatusChange = async () => {
    if (!appointmentToChangeStatus || !newStatus) return;

    try {
      await updateAppointmentStatus(appointmentToChangeStatus.id, newStatus);
      toast.success('Estado de cita actualizado');
      await loadAppointments();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Error al actualizar estado';
      toast.error(errorMessage);
    } finally {
      setStatusDialogOpen(false);
      setAppointmentToChangeStatus(null);
      setNewStatus('');
    }
  };

  const handleFormSuccess = () => {
    setFormOpen(false);
    loadAppointments();
  };

  return (
    <div className="space-y-4">
      <SectionHeader title="Citas" subtitle="Gestiona tus citas médicas" />

      {/* Barra de búsqueda y filtros */}
      <div className="flex gap-2 flex-wrap">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar por paciente o doctor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos los estados</SelectItem>
            {APPOINTMENT_STATUSES.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleCreateNew} className="gap-2">
          <Plus className="h-4 w-4" />
          Nueva Cita
        </Button>
      </div>

      {/* Tabla */}
      <div className="border rounded-lg overflow-hidden bg-white">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-gray-500">Cargando citas...</p>
            </div>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-gray-500 mb-3">
                {searchTerm || statusFilter !== 'ALL'
                  ? 'No se encontraron citas con esos criterios'
                  : 'No hay citas registradas'}
              </p>
              {!searchTerm && statusFilter === 'ALL' && (
                <Button onClick={handleCreateNew} variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Crear Primera Cita
                </Button>
              )}
            </div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Paciente</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Fecha y Hora</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{appointment.patientName}</TableCell>
                  <TableCell className="text-sm">{appointment.doctorName}</TableCell>
                  <TableCell className="text-sm">
                    {formatDateTime(appointment.appointmentDate, appointment.appointmentTime)}
                  </TableCell>
                  <TableCell className="text-sm">{getAppointmentTypeLabel(appointment.type)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(appointment.status)}>
                      {getStatusLabel(appointment.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleStatusChange(appointment)}
                        className="gap-1 text-sm"
                      >
                        <Edit2 className="h-4 w-4" />
                        <span className="hidden sm:inline">Estado</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(appointment)}
                        className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="hidden sm:inline">Eliminar</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Información adicional */}
      {!isLoading && appointments.length > 0 && (
        <div className="text-sm text-gray-500">
          Mostrando {filteredAppointments.length} de {appointments.length} citas
        </div>
      )}

      {/* Appointment Form Modal */}
      <AppointmentForm open={formOpen} onOpenChange={setFormOpen} onSuccess={handleFormSuccess} />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar cita?</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Está seguro de que desea eliminar la cita con{' '}
              <strong>{appointmentToDelete?.patientName}</strong> el{' '}
              <strong>
                {appointmentToDelete && formatDateTime(appointmentToDelete.appointmentDate, appointmentToDelete.appointmentTime)}
              </strong>
              ? Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? 'Eliminando...' : 'Eliminar'}
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>

      {/* Status Change Dialog */}
      <AlertDialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cambiar estado de cita</AlertDialogTitle>
            <AlertDialogDescription>
              Selecciona el nuevo estado para la cita con <strong>{appointmentToChangeStatus?.patientName}</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-2">
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {APPOINTMENT_STATUSES.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmStatusChange} className="bg-blue-600 hover:bg-blue-700">
            Cambiar Estado
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
