import { useState } from "react";
import {
    Users, Calendar as CalendarIcon, Clock, FileText, CheckCircle2,
    AlertCircle, PlayCircle, PhoneCall, Pill, Activity, UserPlus, Save, Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { getDoctorDashboard, getDoctorAgendaToday } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

export default function DoctorDashboard() {
    const { toast } = useToast();
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('RESUMEN');
    const [clinicalNote, setClinicalNote] = useState("");

    const { data: dashboardData, isLoading: isLoadingDashboard } = useQuery({
        queryKey: ['doctorDashboard'],
        queryFn: getDoctorDashboard
    });

    const { data: agendaData, isLoading: isLoadingAgenda } = useQuery({
        queryKey: ['doctorAgenda'],
        queryFn: getDoctorAgendaToday
    });

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'COMPLETED': return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
            case 'IN_PROGRESS': return <Activity className="h-5 w-5 text-blue-500 animate-pulse" />;
            case 'PENDING': return <AlertCircle className="h-5 w-5 text-rose-500" />;
            case 'CONFIRMED': return <CheckCircle2 className="h-5 w-5 text-blue-500" />;
            case 'CANCELLED': return <AlertCircle className="h-5 w-5 text-muted-foreground" />;
            default: return <Clock className="h-5 w-5 text-muted-foreground opacity-50" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'COMPLETED': return "border-emerald-500/50 bg-emerald-500/5";
            case 'IN_PROGRESS': return "border-blue-500 shadow-md shadow-blue-500/10 bg-blue-500/5";
            case 'PENDING': return "border-rose-500/50 bg-rose-500/5";
            case 'CONFIRMED': return "border-blue-500/50 bg-blue-500/5";
            default: return "border-transparent text-muted-foreground opacity-50";
        }
    };

    const proximaCita = dashboardData?.proximaCita;
    const agenda = Array.isArray(agendaData) ? agendaData : [];

    if (isLoadingDashboard || isLoadingAgenda) {
        return (
            <div className="h-[60vh] flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-8 animate-in fade-in duration-500 xl:container xl:mx-auto">

            {/* ── HEADER ───────────────────────────────────────── */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
                        Hola, Dr. {user?.firstName} 👋
                    </h1>
                    <p className="text-muted-foreground mt-1">Tienes {dashboardData?.citasHoy || 0} citas programadas para hoy</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2 border-primary/20 hover:bg-primary/5">
                        <CalendarIcon className="h-4 w-4 text-primary" /> Mi Calendario
                    </Button>
                    <Button className="gap-2 shadow-sm bg-emerald-600 hover:bg-emerald-700">
                        <PlayCircle className="h-4 w-4" /> Continuar Consulta
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* LADO IZQUIERDO (70%) */}
                <div className="lg:col-span-8 flex flex-col gap-6">

                    {/* PRÓXIMA CITA DESTACADA */}
                    {proximaCita ? (
                        <div className={`rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start justify-between border-2 shadow-lg transition-all border-emerald-500 bg-emerald-500/5`}>
                            <div className="space-y-4 w-full">
                                <div className="flex items-center gap-3">
                                    <span className="relative flex h-3 w-3">
                                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-emerald-400`}></span>
                                        <span className={`relative inline-flex rounded-full h-3 w-3 bg-emerald-500`}></span>
                                    </span>
                                    <span className={`font-bold tracking-widest text-sm uppercase text-emerald-600`}>
                                        Siguiente paciente en lista
                                    </span>
                                </div>

                                <div>
                                    <h2 className="text-3xl font-bold tracking-tight text-foreground">
                                        {new Date(proximaCita.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {proximaCita.patientName}
                                    </h2>
                                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm font-medium text-muted-foreground">
                                        <span className="bg-background px-2 py-1 rounded-md border text-primary">ID Paciente: {proximaCita.patientId}</span>
                                        <span className="bg-background px-2 py-1 rounded-md border text-rose-500 border-rose-200 bg-rose-50">Estado: {proximaCita.status}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 bg-background/50 p-4 rounded-lg border border-border/50">
                                    <div>
                                        <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Motivo / Tipo</div>
                                        <div className="font-medium flex items-center gap-2"><FileText className="h-4 w-4 text-primary" /> {proximaCita.type}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Notas Previas</div>
                                        <div className="font-medium flex items-center gap-2"><FileText className="h-4 w-4 text-amber-500" /> {proximaCita.notes || "Sin notas"}</div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-3 mt-6">
                                    <Button size="lg" className="w-full sm:w-auto font-bold text-base h-12 shadow-md">
                                        Empezar Consulta
                                    </Button>
                                    <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 bg-background">Ver Historia Clínica</Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-xl p-8 border-2 border-dashed border-muted flex flex-col items-center justify-center text-center space-y-4">
                            <CalendarIcon className="h-12 w-12 text-muted-foreground opacity-20" />
                            <h3 className="text-xl font-bold text-muted-foreground">No hay próximas citas hoy</h3>
                            <p className="text-muted-foreground max-w-xs text-sm">Disfruta de tu tiempo o revisa tu historial de pacientes.</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* AGENDA TIMELINE */}
                        <div className="rounded-xl border border-border bg-card shadow-sm p-6 flex flex-col h-[500px]">
                            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                                <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                                Mi Agenda Diaria
                            </h3>
                            <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                                {agenda.length > 0 ? agenda.map((item, i) => (
                                    <div key={item.id} className="flex gap-4 group cursor-pointer">
                                        <div className="w-14 text-right pt-2 font-bold text-sm text-muted-foreground group-hover:text-primary transition-colors">
                                            {new Date(item.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                        <div className="relative flex flex-col items-center">
                                            <div className="h-full w-0.5 bg-border group-hover:bg-primary/30 transition-colors"></div>
                                            <div className="absolute top-2 -translate-x-[0.5px] bg-background">
                                                {getStatusIcon(item.status)}
                                            </div>
                                        </div>
                                        <div className={`flex-1 p-3 rounded-lg border transition-all group-hover:shadow-md ${getStatusColor(item.status)}`}>
                                            <div>
                                                <div className="font-bold text-sm">{item.patientName}</div>
                                                <div className="text-xs text-muted-foreground mt-1 flex items-center justify-between">
                                                    <span>{item.type}</span>
                                                    <span className="text-primary font-medium">{item.status}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-20 text-muted-foreground opacity-50 italic">Sin citas para hoy</div>
                                )}
                            </div>
                        </div>

                        {/* EDITOR CLÍNICO RÁPIDO */}
                        <div className="rounded-xl border border-border bg-card shadow-sm p-6 flex flex-col h-[500px]">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-muted-foreground" />
                                    Editor Clínico
                                </h3>
                                <span className="text-[10px] uppercase font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">Auto-guardado</span>
                            </div>

                            <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                                {['SÍNTOMAS', 'EXAMEN', 'DIAGNÓSTICO', 'PLAN'].map(tab => (
                                    <Button
                                        key={tab}
                                        variant={tab === 'SÍNTOMAS' ? 'default' : 'outline'}
                                        size="sm"
                                        className="text-xs h-7 rounded-full"
                                    >
                                        {tab}
                                    </Button>
                                ))}
                            </div>

                            <Textarea
                                placeholder="Escriba aquí los síntomas del paciente..."
                                className="flex-1 resize-none bg-muted/20 border-border focus-visible:ring-1 focus-visible:ring-primary p-4 custom-scrollbar text-sm"
                                value={clinicalNote}
                                onChange={(e) => setClinicalNote(e.target.value)}
                            />

                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                                <Button variant="ghost" size="sm" className="text-muted-foreground gap-2"><Save className="h-4 w-4" /> Guardar Borrador</Button>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="gap-2"><Pill className="h-4 w-4 text-emerald-500" /> Recetar</Button>
                                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 font-bold">Finalizar</Button>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* ESTADÍSTICAS RÁPIDAS DEL DOCTOR */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-4 rounded-xl border bg-card flex items-center gap-4">
                            <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Users className="h-6 w-6" /></div>
                            <div>
                                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Pacientes Activos</div>
                                <div className="text-2xl font-bold">{dashboardData?.pacientesActivos || 0}</div>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl border bg-card flex items-center gap-4">
                            <div className="p-2 bg-purple-100 rounded-lg text-purple-600"><CalendarIcon className="h-6 w-6" /></div>
                            <div>
                                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Citas Semana</div>
                                <div className="text-2xl font-bold">{dashboardData?.citasSemana || 0}</div>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl border bg-card flex items-center gap-4 text-emerald-600 border-emerald-100 bg-emerald-50/10">
                            <div className="p-2 bg-emerald-100 rounded-lg"><Activity className="h-6 w-6" /></div>
                            <div>
                                <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Tasa de Atención</div>
                                <div className="text-2xl font-bold">94%</div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* LADO DERECHO (30%) - PANEL INFORMACIÓN */}
                <div className="lg:col-span-4 rounded-xl border border-border bg-card shadow-sm overflow-hidden flex flex-col h-full sticky top-6">
                    {proximaCita ? (
                        <>
                            <div className="p-6 bg-slate-900 text-white">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold tracking-tight">{proximaCita.patientName}</h3>
                                        <p className="text-slate-400 text-sm mt-1">ID Paciente: {proximaCita.patientId}</p>
                                    </div>
                                    <div className="bg-primary text-white font-bold px-2 py-1 rounded text-sm shadow lowercase">
                                        {proximaCita.status}
                                    </div>
                                </div>
                            </div>
                            <div className="flex border-b border-border bg-muted/30">
                                {['RESUMEN', 'HISTORIAL'].map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-muted/50 ${activeTab === tab ? 'text-primary border-b-2 border-primary bg-background' : 'text-muted-foreground'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                            <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
                                <div className="space-y-6 text-sm">
                                    <div className="bg-muted/30 p-4 rounded-lg border border-dashed text-muted-foreground text-center">
                                        <Search className="h-8 w-8 mx-auto mb-2 opacity-20" />
                                        Selecciona "Ver Historia" para cargar los datos detallados del paciente.
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="p-12 flex flex-col items-center justify-center text-center h-[400px]">
                            <Clock className="h-10 w-10 text-muted-foreground opacity-10 mb-4" />
                            <p className="text-muted-foreground italic text-sm">Sin paciente seleccionado</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider ${className}`}>
        {children}
    </span>
);
