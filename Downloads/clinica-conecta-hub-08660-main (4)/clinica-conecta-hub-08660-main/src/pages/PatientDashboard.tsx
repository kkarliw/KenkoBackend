import { useState } from "react";
import {
    Calendar as CalendarIcon, PhoneCall, FileText, Pill, Download,
    CheckCircle2, AlertCircle, Video, Settings, Activity, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { getMyAppointments } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

export default function PatientDashboard() {
    const { toast } = useToast();
    const { user } = useAuth();
    const [isSimplifiedMode, setIsSimplifiedMode] = useState(true);

    const { data: appointmentsData, isLoading } = useQuery({
        queryKey: ['myAppointments'],
        queryFn: getMyAppointments
    });

    const appointments = Array.isArray(appointmentsData) ? appointmentsData : [];

    if (isLoading) {
        return (
            <div className="h-[60vh] flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    return (
        <div className={`pb-12 animate-in fade-in duration-500 xl:container xl:mx-auto ${isSimplifiedMode ? 'space-y-10' : 'space-y-6'}`}>

            {/* ── HEADER ───────────────────────────────────────── */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-primary/5 p-6 rounded-2xl border-2 border-primary/20">
                <div>
                    <h1 className={`${isSimplifiedMode ? 'text-4xl' : 'text-3xl'} font-extrabold tracking-tight text-foreground flex items-center gap-3`}>
                        Hola, {user?.firstName} 👋
                    </h1>
                    <p className={`${isSimplifiedMode ? 'text-lg mt-2' : 'mt-1'} font-medium text-muted-foreground`}>
                        Tu salud está en buenas manos
                    </p>
                </div>
                <div className="flex items-center gap-3 bg-background p-2 rounded-xl border shadow-sm">
                    <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground mr-2">Modo Visual</span>
                    <Button
                        variant={isSimplifiedMode ? "default" : "outline"}
                        onClick={() => setIsSimplifiedMode(true)}
                        className="font-bold"
                    >
                        Sencillo
                    </Button>
                    <Button
                        variant={!isSimplifiedMode ? "default" : "outline"}
                        onClick={() => setIsSimplifiedMode(false)}
                        className="font-bold text-muted-foreground"
                    >
                        Normal
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">

                {/* LADO IZQUIERDO: CITAS PRÓXIMAS (8/12) */}
                <div className="lg:col-span-8 flex flex-col gap-6">

                    <h2 className={`${isSimplifiedMode ? 'text-3xl font-extrabold mb-2' : 'text-xl font-bold'} flex items-center gap-3`}>
                        <CalendarIcon className={`${isSimplifiedMode ? 'w-8 h-8' : 'w-6 h-6'} text-primary`} />
                        Mis Próximas Citas
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {appointments.length > 0 ? appointments.map((cita) => (
                            <div key={cita.id} className={`rounded-2xl border-4 shadow-lg p-6 flex flex-col justify-between transition-transform hover:-translate-y-1 bg-card ${cita.status === 'PENDING' ? 'border-primary shadow-primary/20' : 'border-border'
                                }`}>
                                <div>
                                    <div className={`font-black ${isSimplifiedMode ? 'text-2xl mb-4' : 'text-xl mb-2'} uppercase tracking-widest ${cita.status === 'PENDING' ? 'text-primary' : 'text-muted-foreground'}`}>
                                        <Clock className="inline w-6 h-6 mr-2 -mt-1" />
                                        {new Date(cita.appointmentDate).toLocaleDateString([], { day: 'numeric', month: 'long' })} - {new Date(cita.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>

                                    <h3 className={`${isSimplifiedMode ? 'text-2xl font-bold mb-2' : 'text-xl font-bold'} leading-tight`}>
                                        Profesional ID: {cita.doctorId}
                                    </h3>

                                    <div className={`flex flex-col gap-2 mt-4 font-semibold text-muted-foreground ${isSimplifiedMode ? 'text-lg' : 'text-sm'}`}>
                                        <span className="flex items-center gap-2 bg-muted/30 p-2 rounded-lg"><Activity className="w-5 h-5" /> {cita.type}</span>
                                        <span className="flex items-center gap-2 bg-muted/30 p-2 rounded-lg"><Settings className="w-5 h-5" /> Estado: {cita.status}</span>
                                    </div>
                                </div>

                                <div className={`mt-8 space-y-3 ${isSimplifiedMode ? '' : 'pt-4 border-t'}`}>
                                    {cita.type.toLowerCase().includes('telemedicina') ? (
                                        <Button size={isSimplifiedMode ? "lg" : "default"} className="w-full font-black text-lg bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-500/20 py-8">
                                            <Video className="w-6 h-6 mr-3" /> ENTRAR A TELECONSULTA
                                        </Button>
                                    ) : (
                                        <Button size={isSimplifiedMode ? "lg" : "default"} className="w-full font-black text-lg py-8 shadow-md">
                                            <CheckCircle2 className="w-6 h-6 mr-3" /> CONFIRMAR ASISTENCIA
                                        </Button>
                                    )}

                                    <div className="grid grid-cols-2 gap-3">
                                        <Button variant="outline" className="font-bold border-2 h-14">Reagendar</Button>
                                        <Button variant="outline" className="font-bold border-2 h-14">Ver Detalles</Button>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="col-span-full py-20 text-center border-4 border-dashed rounded-2xl bg-muted/10">
                                <CalendarIcon className="w-16 h-16 mx-auto text-muted-foreground opacity-20 mb-4" />
                                <p className="text-xl font-bold text-muted-foreground">No tienes citas programadas actualmente</p>
                                <Button className="mt-6 font-bold" size="lg">Agendar mi primera cita</Button>
                            </div>
                        )}
                    </div>

                </div>

                {/* LADO DERECHO: INFO EXTRA */}
                <div className="lg:col-span-4 flex flex-col gap-8">
                    <div className="rounded-2xl border-2 border-border bg-card shadow-sm p-6 lg:p-8">
                        <h2 className={`${isSimplifiedMode ? 'text-2xl font-extrabold mb-6' : 'text-xl font-bold mb-4'} flex items-center gap-3 border-b-2 border-muted pb-4`}>
                            <Pill className="w-8 h-8 text-amber-500" /> Mis Recetas
                        </h2>
                        <div className="text-center py-10 italic text-muted-foreground bg-muted/10 rounded-xl border">
                            No tienes recetas activas en este momento.
                        </div>
                    </div>

                    <div className="rounded-2xl border-2 border-border bg-card shadow-sm p-6 lg:p-8">
                        <h2 className={`${isSimplifiedMode ? 'text-2xl font-extrabold mb-6' : 'text-xl font-bold mb-4'} flex items-center gap-3 border-b-2 border-muted pb-4`}>
                            <FileText className="w-8 h-8 text-blue-500" /> Documentos
                        </h2>
                        <div className="text-center py-10 italic text-muted-foreground bg-muted/10 rounded-xl border">
                            Sin documentos clínicos compartidos.
                        </div>
                    </div>
                </div>

            </div>

            {/* ── BOTONES BOTTOM ───────────────────────────────── */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 mt-10 border-t-2 border-border`}>
                <Button variant="outline" className={`h-24 flex flex-col gap-3 font-extrabold tracking-widest uppercase border-4 border-muted hover:border-primary hover:bg-primary/5 ${isSimplifiedMode ? 'text-lg' : 'text-base'}`}>
                    <CalendarIcon className="w-8 h-8 text-primary" />
                    Solicitar Cita
                </Button>
                <Button variant="outline" className={`h-24 flex flex-col gap-3 font-extrabold tracking-widest uppercase border-4 border-muted hover:border-emerald-500 hover:bg-emerald-500/5 ${isSimplifiedMode ? 'text-lg' : 'text-base'}`}>
                    <PhoneCall className="w-8 h-8 text-emerald-500" />
                    Contactar Clínica
                </Button>
                <Button variant="outline" className={`h-24 flex flex-col gap-3 font-extrabold tracking-widest uppercase border-4 border-muted hover:border-slate-500 hover:bg-slate-500/5 ${isSimplifiedMode ? 'text-lg' : 'text-base'}`}>
                    <Settings className="w-8 h-8 text-slate-500" />
                    Mi Perfil
                </Button>
            </div>

        </div>
    );
}
