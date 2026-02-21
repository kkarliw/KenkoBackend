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
import { SectionHeader } from '@/components/shared/SectionHeader';
import { PatientForm } from './PatientForm';
import { getPatients, deletePatient, Patient } from '@/lib/api';
import { formatDate } from '@/utils/helpers';

export const PacienteTable = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form dialog state
  const [formOpen, setFormOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<number | undefined>();

  // Delete confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Cargar pacientes
  const loadPatients = async () => {
    setIsLoading(true);
    try {
      const data = await getPatients();
      setPatients(data);
      setFilteredPatients(data);
    } catch (error) {
      console.error('Error cargando pacientes:', error);
      toast.error('Error al cargar pacientes');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  // Filtrar pacientes
  useEffect(() => {
    const filtered = patients.filter((patient) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        patient.firstName.toLowerCase().includes(searchLower) ||
        patient.lastName.toLowerCase().includes(searchLower) ||
        patient.email.toLowerCase().includes(searchLower) ||
        patient.phone.includes(searchTerm)
      );
    });
    setFilteredPatients(filtered);
  }, [searchTerm, patients]);

  const handleCreateNew = () => {
    setSelectedPatientId(undefined);
    setFormOpen(true);
  };

  const handleEdit = (patient: Patient) => {
    setSelectedPatientId(patient.id);
    setFormOpen(true);
  };

  const handleDeleteClick = (patient: Patient) => {
    setPatientToDelete(patient);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!patientToDelete) return;
    
    setIsDeleting(true);
    try {
      await deletePatient(patientToDelete.id);
      toast.success(`${patientToDelete.firstName} ${patientToDelete.lastName} eliminado`);
      await loadPatients();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Error al eliminar paciente';
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setPatientToDelete(null);
    }
  };

  const handleFormSuccess = () => {
    setFormOpen(false);
    loadPatients();
  };

  return (
    <div className="space-y-4">
      <SectionHeader title="Pacientes" subtitle="Gestiona la lista de pacientes" />

      {/* Barra de búsqueda */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar por nombre, email o teléfono..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={handleCreateNew} className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Paciente
        </Button>
      </div>

      {/* Tabla */}
      <div className="border rounded-lg overflow-hidden bg-white">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-gray-500">Cargando pacientes...</p>
            </div>
          </div>
        ) : filteredPatients.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-gray-500 mb-3">
                {searchTerm ? 'No se encontraron pacientes con esos criterios' : 'No hay pacientes registrados'}
              </p>
              {!searchTerm && (
                <Button onClick={handleCreateNew} variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Crear Primer Paciente
                </Button>
              )}
            </div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Registrado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">
                    {patient.firstName} {patient.lastName}
                  </TableCell>
                  <TableCell className="text-sm">{patient.email}</TableCell>
                  <TableCell className="text-sm">{patient.phone}</TableCell>
                  <TableCell>
                    <Badge variant={patient.status === 'ACTIVE' ? 'default' : 'secondary'}>
                      {patient.status || 'ACTIVE'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {patient.createdAt ? formatDate(patient.createdAt) : 'N/A'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(patient)}
                        className="gap-1"
                      >
                        <Edit2 className="h-4 w-4" />
                        <span className="hidden sm:inline">Editar</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(patient)}
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
      {!isLoading && patients.length > 0 && (
        <div className="text-sm text-gray-500">
          Mostrando {filteredPatients.length} de {patients.length} pacientes
        </div>
      )}

      {/* Patient Form Modal */}
      <PatientForm
        open={formOpen}
        onOpenChange={setFormOpen}
        patientId={selectedPatientId}
        onSuccess={handleFormSuccess}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar paciente?</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Está seguro de que desea eliminar a{' '}
              <strong>
                {patientToDelete?.firstName} {patientToDelete?.lastName}
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
    </div>
  );
};
