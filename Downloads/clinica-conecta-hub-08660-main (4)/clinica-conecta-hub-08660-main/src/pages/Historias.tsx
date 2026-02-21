import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getMedicalRecords,
    createMedicalRecord,
    getPatients as getPatientsApi,
    getUsers,
    type MedicalRecord
} from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Search, Download, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import HistoriaClinicaForm from "@/components/historias/HistoriaClinicaForm";

export default function Historias() {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const { data: records = [], isLoading } = useQuery({
        queryKey: ["medical-records"],
        queryFn: getMedicalRecords,
    });

    const { data: patients = [] } = useQuery({
        queryKey: ["patients"],
        queryFn: () => getPatientsApi(),
    });

    const { data: users = [] } = useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    });

    const createMutation = useMutation({
        mutationFn: createMedicalRecord,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["medical-records"] });
            toast.success("Historia clínica creada correctamente");
            setIsFormOpen(false);
        },
        onError: () => {
            toast.error("Error al crear la historia clínica");
        }
    });

    const filteredRecords = records.filter(record =>
        record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const professionals = users.filter(u => u.role === "DOCTOR" || u.role === "MEDICO").map(u => ({
        id: u.id,
        nombre: u.firstName,
        apellido: u.lastName,
        especialidad: u.specialization || "General",
        email: u.email,
        telefono: u.phone || "",
        numeroLicencia: u.licenseNumber || ""
    }));

    // Map API patients to the type expected by the form component
    const mappedPatients = patients.map(p => ({
        id: p.id,
        nombre: p.firstName,
        apellido: p.lastName,
        email: p.email,
        telefono: p.phone,
        direccion: p.address,
        numeroDocumento: p.documentNumber || "",
        fechaNacimiento: p.dateOfBirth || p.birthDate || "",
        genero: (p.gender as any) || "OTRO"
    }));

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Historias Clínicas</h1>
                    <p className="text-muted-foreground">
                        Gestión de registros médicos y antecedentes de pacientes.
                    </p>
                </div>
                {(user?.role === "DOCTOR" || user?.role === "ADMIN") && (
                    <Button onClick={() => setIsFormOpen(true)} className="gap-2">
                        <Plus className="h-4 w-4" /> Nueva Historia
                    </Button>
                )}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Listado de Registros</CardTitle>
                    <div className="relative max-w-sm mt-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar por paciente o diagnóstico..."
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : (
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Fecha</TableHead>
                                        <TableHead>Paciente</TableHead>
                                        <TableHead>Profesional</TableHead>
                                        <TableHead>Diagnóstico</TableHead>
                                        <TableHead className="text-right">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredRecords.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                                {searchTerm ? "No se encontraron resultados" : "No hay historias clínicas registradas"}
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredRecords.map((record) => (
                                            <TableRow key={record.id}>
                                                <TableCell>
                                                    {record.createdAt ? new Date(record.createdAt).toLocaleDateString() : 'N/A'}
                                                </TableCell>
                                                <TableCell className="font-medium">{record.patientName}</TableCell>
                                                <TableCell>{record.doctorName}</TableCell>
                                                <TableCell>
                                                    <div className="max-w-[200px] truncate" title={record.diagnosis}>
                                                        {record.diagnosis}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="sm" className="gap-1">
                                                        <FileText className="h-4 w-4" /> Ver
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>

            <HistoriaClinicaForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={(data) => {
                    // Adapt the types for the API call
                    const apiData = {
                        patientId: data.pacienteId,
                        reasonForConsultation: data.motivoConsulta,
                        diagnosis: data.diagnostico,
                        treatmentPlan: data.tratamiento,
                        internalNotes: (data as any).observaciones || ""
                    };
                    createMutation.mutate(apiData);
                }}
                isLoading={createMutation.isPending}
                pacientes={mappedPatients as any}
                profesionales={professionals as any}
            />
        </div>
    );
}
