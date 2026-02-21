import { useState } from "react";
import {
    Search, Plus, Calendar as CalendarIcon, CheckCircle2,
    AlertCircle, PhoneCall, Clock, UserPlus, Check, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { getReceptionistDashboard, getPatients, getAppointments } from "@/lib/api";

export default function ReceptionistDashboard() {
    const { toast } = useToast();
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const { data: dashboardData, isLoading: isLoadingDashboard } = useQuery({
        queryKey: ['receptionistDashboard'],
        queryFn: getReceptionistDashboard
    });

    const { data: patientsData, isLoading: isLoadingPatients } = useQuery({
        queryKey: ['patientsSearch', searchQuery],
        queryFn: () => getPatients(searchQuery),
        enabled: searchQuery.length > 2
    });

    const { data: appointmentsData, isLoading: isLoadingAppointments } = useQuery({
        queryKey: ['appointmentsToday'],
        queryFn: () => getAppointments()
    });

    const patients = Array.isArray(patientsData) ? patientsData : [];
    const appointments = Array.isArray(appointmentsData) ? appointmentsData : [];

    // Filter appointments for "Today" (simplified)
    const today = new Date().toISOString().split('T')[0];
    const appointmentsToday = appointments.filter(a => a.appointmentDate.startsWith(today))
        .sort((a, b) => a.appointmentDate.localeCompare(b.appointmentDate));

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'COMPLETED': return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
            case 'PENDING': return <AlertCircle className="h-4 w-4 text-rose-500" />;
            case 'CONFIRMED': return <Clock className="h-4 w-4 text-amber-500" />;
            case 'TELEMEDICINE': return <PhoneCall className="h-4 w-4 text-blue-500" />;
            default: return null;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'COMPLETED': return "bg-emerald-50 border-emerald-200 hover:border-emerald-400";
            case 'PENDING': return "bg-rose-50 border-rose-200 hover:border-rose-400 shadow-sm";
            case 'CONFIRMED': return "bg-amber-50 border-amber-200 hover:border-amber-400";
            case 'TELEMEDICINE': return "bg-blue-50 border-blue-200 hover:border-blue-400";
            default: return "bg-white border-transparent hover:border-primary/20 hover:bg-muted/50 cursor-pointer text-muted-foreground transition-all";
        }
    };

    const handleCheckIn = (name: string) => {
        toast({
            title: "Check-in Exitoso",
            description: `El paciente ${name} ha sido registrado en sala de espera.`,
            variant: "default",
        });
    };

    if (isLoadingDashboard) {
        return (
            <div className="h-[60vh] flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-8 animate-in fade-in duration-500 xl:container xl:mx-auto">

            {/* ── KPI HEADER ────────────────────────────────────────── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-card border rounded-xl shadow-sm">
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Citas Hoy</div>
                    <div className="text-2xl font-bold text-primary">{dashboardData?.citasHoy || 0}</div>
                </div>
                <div className="p-4 bg-card border rounded-xl shadow-sm border-rose-100 bg-rose-50/10">
                    <div className="text-[10px] font-bold text-rose-600 uppercase tracking-wider mb-1">Pendientes</div>
                    <div className="text-2xl font-bold text-rose-700">{dashboardData?.citasPendientes || 0}</div>
                </div>
                <div className="p-4 bg-card border rounded-xl shadow-sm border-emerald-100 bg-emerald-50/10">
                    <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1">Confirmadas</div>
                    <div className="text-2xl font-bold text-emerald-700">{dashboardData?.citasConfirmadas || 0}</div>
                </div>
                <div className="p-4 bg-card border rounded-xl shadow-sm">
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Nuevos Pacientes</div>
                    <div className="text-2xl font-bold">{dashboardData?.pacientesRegistradosHoy || 0}</div>
                </div>
            </div>

            {/* ── HEADER BÚSQUEDA ───────────────────────────────────────── */}
            <div className="relative z-50">
                <div className="relative flex items-center w-full shadow-lg rounded-xl bg-background border border-border group focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
                    <Search className="absolute left-6 text-muted-foreground h-6 w-6 group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="Buscar paciente por nombre, cédula o email..."
                        className="w-full h-16 pl-16 pr-6 text-lg border-0 bg-transparent rounded-xl focus-visible:ring-0 shadow-none font-medium text-foreground placeholder:text-muted-foreground/70"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setIsSearching(e.target.value.length > 2);
                        }}
                        onFocus={() => { if (searchQuery.length > 2) setIsSearching(true); }}
                    />
                    <Button size="icon" className="absolute right-4 rounded-full h-10 w-10 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors" title="Crear Paciente">
                        <UserPlus className="h-5 w-5" />
                    </Button>
                </div>

                {/* Resultados de búsqueda flotantes */}
                {isSearching && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-popover rounded-xl border border-border shadow-2xl p-2 max-h-[400px] overflow-y-auto animate-in fade-in slide-in-from-top-4 z-[100]">
                        <div className="flex items-center justify-between px-3 py-2 mb-2 border-b border-border">
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Resultados de búsqueda</span>
                            <button onClick={() => setIsSearching(false)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
                        </div>

                        {isLoadingPatients ? (
                            <div className="p-8 text-center italic text-muted-foreground">Buscando...</div>
                        ) : patients.length > 0 ? (
                            <div className="space-y-1">
                                {patients.map(p => (
                                    <div key={p.id} className="p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors flex items-center justify-between group" onClick={() => { setSearchQuery(p.firstName + " " + p.lastName); setIsSearching(false); }}>
                                        <div className="flex w-full gap-4 items-center">
                                            <div className="h-10 w-10 bg-primary/10 text-primary font-bold rounded-full flex items-center justify-center shrink-0">
                                                {p.firstName?.charAt(0)}
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-bold text-foreground group-hover:text-primary transition-colors">{p.firstName} {p.lastName} <span className="text-xs font-normal text-muted-foreground ml-2">DNI: {p.dni}</span></div>
                                                <div className="text-xs text-muted-foreground flex gap-3 mt-1">
                                                    <span className="flex items-center gap-1"><PhoneCall className="h-3 w-3" /> {p.phone}</span>
                                                    <span>{p.email}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1">Estado</div>
                                                <div className="text-xs font-medium bg-muted/50 px-2 py-1 rounded inline-block">ACTIVO</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center flex flex-col items-center justify-center">
                                <Search className="h-12 w-12 text-muted-foreground opacity-20 mb-4" />
                                <p className="text-muted-foreground font-medium">No se encontraron pacientes para "{searchQuery}".</p>
                                <Button variant="outline" className="mt-4 gap-2 border-dashed">
                                    <UserPlus className="h-4 w-4" />
                                    Crear Nuevo Paciente
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* LADO IZQUIERDO: ACCIONES RAPIDAS + PROXIMOS (1/4) */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="h-20 flex flex-col gap-1 border-primary/20 hover:bg-primary/5 hover:border-primary transition-colors justify-center bg-card shadow-sm">
                            <CalendarIcon className="h-5 w-5 text-primary" />
                            <span className="font-bold text-[10px] uppercase tracking-wider mt-1">Nueva Cita</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex flex-col gap-1 border-emerald-500/20 hover:bg-emerald-500/10 hover:border-emerald-500 transition-colors justify-center bg-card shadow-sm">
                            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                            <span className="font-bold text-[10px] uppercase tracking-wider text-emerald-700 mt-1">Check-in</span>
                        </Button>
                    </div>

                    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden flex flex-col min-h-[400px]">
                        <div className="p-5 border-b border-border bg-muted/30">
                            <h3 className="font-bold flex items-center gap-2">
                                <Clock className="h-5 w-5 text-primary" />
                                Próximas Citas
                            </h3>
                        </div>

                        <div className="p-4 flex-1 overflow-y-auto space-y-4 custom-scrollbar max-h-[500px]">
                            {appointmentsToday.length > 0 ? appointmentsToday.map((p, i) => (
                                <div key={p.id} className="relative pl-4 border-l-4 p-4 rounded-xl shadow-sm transition-all hover:shadow-md border bg-background" style={{ borderLeftColor: p.status === 'PENDING' ? '#f59e0b' : p.status === 'CONFIRMED' ? '#10b981' : '#cbd5e1' }}>
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full tracking-wider bg-muted text-muted-foreground`}>
                                            {new Date(p.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <h4 className="font-bold text-base leading-tight">{p.patientName}</h4>
                                    <div className="text-xs text-muted-foreground font-medium mt-1">Doctor ID: {p.doctorId}</div>
                                    <div className="text-[10px] flex items-center gap-1 mt-2 text-primary font-bold uppercase tracking-widest">{p.type}</div>

                                    <div className="flex gap-2 mt-4 pt-3 border-t border-border">
                                        <Button
                                            size="sm"
                                            className="w-full text-xs font-bold gap-1 shadow-sm h-8"
                                            onClick={() => handleCheckIn(p.patientName)}
                                        >
                                            <Check className="h-3 w-3" /> Confirmar Llegada
                                        </Button>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-10 text-muted-foreground italic text-sm">No hay citas para hoy</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* LADO DERECHO: VISTA GENERAL DE CITAS (3/4) */}
                <div className="lg:col-span-3 rounded-xl border border-border bg-card shadow-sm overflow-hidden flex flex-col h-[700px]">
                    <div className="p-5 border-b border-border bg-muted/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <h3 className="font-bold flex items-center gap-2 text-lg">
                            <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                            Listado General de Citas
                            <span className="text-sm font-normal text-muted-foreground ml-2">Total: {appointments.length}</span>
                        </h3>
                        <Button variant="outline" size="sm" onClick={() => window.location.href = '/citas'}>Ver Calendario Completo</Button>
                    </div>

                    <div className="flex-1 overflow-auto p-4 custom-scrollbar">
                        <div className="space-y-3">
                            {appointments.slice(0, 15).map(app => (
                                <div key={app.id} className="flex items-center justify-between p-4 rounded-xl border bg-background hover:border-primary/50 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 text-center">
                                            <div className="text-xs font-bold text-primary uppercase">{new Date(app.appointmentDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}</div>
                                            <div className="text-[10px] text-muted-foreground uppercase font-bold">{new Date(app.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                        </div>
                                        <div className="h-8 w-[1px] bg-border"></div>
                                        <div>
                                            <div className="font-bold text-sm">{app.patientName}</div>
                                            <div className="text-xs text-muted-foreground">{app.type}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${app.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-700' :
                                                app.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                                                    'bg-slate-100 text-slate-700'
                                            }`}>
                                            {app.status}
                                        </div>
                                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">Detalles</Button>
                                    </div>
                                </div>
                            ))}
                            {appointments.length === 0 && (
                                <div className="text-center py-20 text-muted-foreground italic">No hay citas registradas en el sistema.</div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
