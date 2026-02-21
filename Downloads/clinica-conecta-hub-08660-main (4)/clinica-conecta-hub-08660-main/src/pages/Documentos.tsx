import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
    getPatientMedicalRecords,
    type MedicalRecord
} from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Calendar, Loader2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Documentos() {
    const { user } = useAuth();

    const { data: records = [], isLoading } = useQuery({
        queryKey: ["my-medical-records", user?.id],
        queryFn: () => getPatientMedicalRecords(user!.id),
        enabled: !!user?.id,
    });

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Mis Documentos</h1>
                <p className="text-muted-foreground">
                    Accede a tus historias clínicas, resultados y recetas médicas.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" /> Historias Clínicas
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{records.length}</div>
                        <p className="text-xs text-muted-foreground mt-1">Registros cargados</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Historial de Consultas</CardTitle>
                    <CardDescription>
                        Tus registros médicos de consultas anteriores.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : records.length === 0 ? (
                        <div className="text-center py-12 border rounded-md border-dashed">
                            <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-4 opacity-20" />
                            <p className="text-muted-foreground font-medium">No tienes documentos registrados aún</p>
                            <p className="text-sm text-muted-foreground mt-1">Tus registros aparecerán aquí después de tus consultas.</p>
                        </div>
                    ) : (
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Fecha</TableHead>
                                        <TableHead>Doctor</TableHead>
                                        <TableHead>Diagnóstico</TableHead>
                                        <TableHead className="text-right">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {records.map((record) => (
                                        <TableRow key={record.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-3 w-3 text-muted-foreground" />
                                                    {record.createdAt ? new Date(record.createdAt).toLocaleDateString() : 'N/A'}
                                                </div>
                                            </TableCell>
                                            <TableCell>{record.doctorName}</TableCell>
                                            <TableCell>
                                                <div className="max-w-[300px] truncate" title={record.diagnosis}>
                                                    {record.diagnosis}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="outline" size="sm" className="gap-2">
                                                    <Download className="h-4 w-4" /> PDF
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
