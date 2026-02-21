import {
    Users, Clock, CalendarIcon, FileText, Pill, MapPin,
    MessageSquare, HeartPulse, ShieldAlert
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getPatients } from "@/lib/api";

export default function CaregiverDashboard() {
    const { data: patientsData, isLoading } = useQuery({
        queryKey: ['caregiverPatients'],
        queryFn: () => getPatients()
    });

    const patients = Array.isArray(patientsData) ? patientsData : [];

    if (isLoading) {
        return (
            <div className="h-[60vh] flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-12 animate-in fade-in duration-500 xl:container xl:mx-auto">

            {/* ── HEADER ───────────────────────────────────────── */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-purple-500/10 p-6 rounded-2xl border-2 border-purple-500/20">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
                        <HeartPulse className="w-8 h-8 text-purple-600" />
                        Panel de Cuidador
                    </h1>
                    <p className="mt-2 font-medium text-muted-foreground">
                        Gestionando la salud de tus seres queridos.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2 border-dashed border-2 bg-background font-bold h-12">
                        <Users className="w-4 h-4" /> Vincular Nuevo Paciente
                    </Button>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold flex items-center gap-3 mb-6">
                    <Users className="w-6 h-6 text-primary" />
                    Pacientes a Cargo ({patients.length})
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {patients.length > 0 ? patients.map(p => (
                        <div key={p.id} className="rounded-2xl border-2 border-border shadow-md overflow-hidden bg-card transition-all hover:shadow-lg hover:border-primary/50">

                            {/* Card Header */}
                            <div className="p-6 bg-muted/30 border-b border-border flex justify-between items-start">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xl font-bold shrink-0">
                                        {p.firstName?.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black">{p.firstName} {p.lastName} <span className="text-muted-foreground font-medium text-sm ml-1">({p.bloodType})</span></h3>
                                        <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground mt-1 flex items-center gap-2">
                                            <ShieldAlert className="w-3 h-3 text-purple-500" /> DNI: {p.dni || p.documentNumber}
                                        </div>
                                    </div>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-600`}>
                                    ESTABLE
                                </div>
                            </div>

                            {/* Card Body - Info Básica */}
                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-muted/20 rounded-lg">
                                        <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Teléfono</div>
                                        <div className="text-sm font-medium">{p.phone}</div>
                                    </div>
                                    <div className="p-3 bg-muted/20 rounded-lg">
                                        <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Alergias</div>
                                        <div className="text-sm font-medium text-rose-600 truncate">{p.allergies || "Ninguna"}</div>
                                    </div>
                                </div>

                                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                                    <div className="font-bold text-sm mb-1 uppercase tracking-wider text-primary">Información de Contacto</div>
                                    <div className="text-sm">{p.email}</div>
                                </div>

                                {/* Card Actions */}
                                <div className="grid grid-cols-3 gap-3 pt-6 mt-4 border-t border-border">
                                    <Button variant="outline" className="font-bold flex-col h-20 gap-2 hover:bg-primary hover:text-white transition-colors">
                                        <FileText className="w-5 h-5" />
                                        Historia
                                    </Button>
                                    <Button variant="outline" className="font-bold flex-col h-20 gap-2 hover:bg-primary hover:text-white transition-colors">
                                        <CalendarIcon className="w-5 h-5" />
                                        Citas
                                    </Button>
                                    <Button variant="outline" className="font-bold flex-col h-20 gap-2 hover:bg-primary hover:text-white transition-colors">
                                        <Pill className="w-5 h-5" />
                                        Medicación
                                    </Button>
                                </div>

                            </div>
                        </div>
                    )) : (
                        <div className="col-span-full py-20 text-center border-4 border-dashed rounded-2xl bg-muted/5">
                            <Users className="w-16 h-16 mx-auto text-muted-foreground opacity-20 mb-4" />
                            <p className="text-xl font-bold text-muted-foreground">No tienes pacientes asignados aún</p>
                            <Button className="mt-6 font-bold" variant="outline">Consultar con el Administrador</Button>
                        </div>
                    )}
                </div>
            </div>

            {/* ── ACCIONES RÁPIDAS ───────────────────────────── */}
            <div className="mt-12">
                <h2 className="text-lg font-bold uppercase tracking-widest text-muted-foreground mb-6">Acciones Rápidas</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <Button variant="outline" className="h-16 justify-start px-6 font-bold gap-4 hover:border-primary border-2">
                        <CalendarIcon className="w-5 h-5 text-primary" />
                        Agendar Nueva Cita
                    </Button>
                    <Button variant="outline" className="h-16 justify-start px-6 font-bold gap-4 hover:border-emerald-500 border-2">
                        <MessageSquare className="w-5 h-5 text-emerald-500" />
                        Contactar Doctor
                    </Button>
                    <Button variant="outline" className="h-16 justify-start px-6 font-bold gap-4 hover:border-amber-500 border-2">
                        <FileText className="w-5 h-5 text-amber-500" />
                        Subir Documento
                    </Button>
                    <Button variant="outline" className="h-16 justify-start px-6 font-bold gap-4 hover:border-rose-500 border-2">
                        <ShieldAlert className="w-5 h-5 text-rose-500" />
                        Reportar Emergencia
                    </Button>
                </div>
            </div>

        </div>
    );
}
