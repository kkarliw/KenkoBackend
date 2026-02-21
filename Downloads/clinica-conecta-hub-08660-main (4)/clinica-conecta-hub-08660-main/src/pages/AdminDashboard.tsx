import { useState } from "react";
import {
    Users, Calendar, DollarSign, Activity, ChevronUp, ChevronDown,
    Search, Edit, Key, Trash2, Plus, FileText, Settings, HeartPulse, Clock, FileWarning, HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { getAdminDashboard, getUsers, createUser as apiCreateUser, deleteUser as apiDeleteUser } from "@/lib/api";

const mockAudit = [
    { id: 1, time: "14:35", user: "Juan García", action: "creó cita para Pedro", location: "Consultorio 3", status: "SUCCESS" },
    { id: 2, time: "14:30", user: "Ana Sánchez", action: "hizo check-in a Laura", location: "Recepción", status: "SUCCESS" },
    { id: 3, time: "14:15", user: "Sistema", action: "realizó backup automático", location: "Base de datos", status: "SUCCESS" },
    { id: 4, time: "14:10", user: "Roberto Gómez", action: "cambió password de María", location: "Seguridad", status: "SUCCESS" },
    { id: 5, time: "14:05", user: "Sistema", action: "crearon usuario: Carlos López", location: "Administración", status: "FAILED" },
];

export default function AdminDashboard() {
    const { toast } = useToast();
    const [searchQuery, setSearchQuery] = useState("");

    // User Creation State
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newUserState, setNewUserState] = useState({ firstName: "", lastName: "", email: "", role: "", phone: "", department: "", specialization: "", licenseNumber: "" });
    const [generatedPassword, setGeneratedPassword] = useState("");

    // Queries
    const { data: dashboardData, isLoading: isLoadingDashboard } = useQuery({
        queryKey: ['adminDashboard'],
        queryFn: getAdminDashboard
    });

    const { data: usersData, isLoading: isLoadingUsers, refetch: refetchUsers } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers
    });

    const users = Array.isArray(usersData) ? usersData : [];

    const filteredUsers = users.filter(u =>
        (u.firstName + " " + u.lastName).toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getRoleBadge = (role: string) => {
        switch (role) {
            case 'ADMIN': return "bg-blue-100 text-blue-700";
            case 'DOCTOR': return "bg-emerald-100 text-emerald-700";
            case 'RECEPTIONIST': return "bg-amber-100 text-amber-700";
            case 'CAREGIVER': return "bg-purple-100 text-purple-700";
            case 'PATIENT': return "bg-slate-100 text-slate-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    const handleGeneratePassword = () => {
        const pass = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-4).toUpperCase() + "!";
        setGeneratedPassword(pass);
    };

    const handleCreateUser = async () => {
        if (!newUserState.firstName || !newUserState.lastName || !newUserState.email || !newUserState.role || !generatedPassword) {
            toast({
                title: "Campos incompletos",
                description: "Por favor llena todos los campos y genera una contraseña.",
                variant: "destructive"
            });
            return;
        }

        try {
            await apiCreateUser({ ...newUserState, password: generatedPassword });

            toast({
                title: "Usuario Creado Exitosamente",
                description: "El nuevo usuario ya se integró a la clínica.",
                className: "bg-emerald-500 text-white"
            });

            setIsCreateModalOpen(false);
            setNewUserState({ firstName: "", lastName: "", email: "", role: "", phone: "", department: "", specialization: "", licenseNumber: "" });
            setGeneratedPassword("");
            refetchUsers();
        } catch (error) {
            toast({
                title: "Error",
                description: "No se pudo crear el usuario.",
                variant: "destructive"
            });
        }
    };
    const handleDeleteUser = async (id: number) => {
        if (!confirm("¿Estás seguro de que deseas eliminar este usuario?")) return;
        try {
            await apiDeleteUser(id);
            toast({
                title: "Usuario eliminado",
                description: "El usuario ha sido removido del sistema.",
                className: "bg-emerald-500 text-white"
            });
            refetchUsers();
        } catch (error) {
            toast({
                title: "Error",
                description: "No se pudo eliminar el usuario.",
                variant: "destructive"
            });
        }
    };

    // Prepare KPIs from real data
    const kpis = [
        { id: 1, label: "INGRESOS MES", value: `$${dashboardData?.ingresosMes?.toLocaleString() || '0'}`, diff: 0, icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10" },
        { id: 2, label: "CITAS TOTALES", value: dashboardData?.totalCitas?.toString() || "0", diff: 0, icon: Calendar, color: "text-blue-500", bg: "bg-blue-500/10" },
        { id: 3, label: "PACIENTES TOTALES", value: dashboardData?.totalPacientes?.toString() || "0", diff: 0, icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
        { id: 4, label: "TASA AUSENTISMO", value: `${dashboardData?.tasaAusentismo?.toFixed(1) || '0'}%`, diff: 0, icon: Activity, color: "text-rose-500", bg: "bg-rose-500/10", reverse: true },
    ];

    if (isLoadingDashboard || isLoadingUsers) {
        return (
            <div className="h-[60vh] flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-8 animate-in fade-in duration-500">

            {/* ── HEADER ───────────────────────────────────────── */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Admin Dashboard</h1>
                    <p className="text-muted-foreground mt-1">Visión general y control de la clínica</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2 shadow-sm" onClick={() => window.print()}><FileText className="h-4 w-4" /> Exportar Reporte</Button>
                </div>
            </div>

            {/* ── KPI CARDS ────────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpis.map((kpi) => {
                    const isPositiveObj = kpi.reverse ? kpi.diff < 0 : kpi.diff > 0;
                    return (
                        <div key={kpi.id} className="p-6 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-lg ${kpi.bg}`}>
                                    <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                                </div>
                                <div className={`flex items-center gap-1 text-sm font-medium px-2.5 py-1 rounded-full ${kpi.diff === 0 ? 'bg-slate-100 text-slate-600' : isPositiveObj ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'
                                    }`}>
                                    {kpi.diff > 0 ? <ChevronUp className="h-4 w-4" /> : kpi.diff < 0 ? <ChevronDown className="h-4 w-4" /> : null}
                                    {kpi.diff === 0 ? '0%' : `${Math.abs(kpi.diff)}%`}
                                </div>
                            </div>
                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{kpi.label}</h3>
                            <p className="text-3xl font-bold text-foreground mt-1">{kpi.value}</p>
                            <p className="text-xs text-muted-foreground mt-2">Dato en tiempo real</p>
                        </div>
                    );
                })}
            </div>

            {/* ── MAIN CONTENT GRID ────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Lado izquierdo (2 columnas): Gráfico + Usuarios */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Gráfico Financiero (Placeholder visual) */}
                    <div className="p-6 rounded-xl border border-border bg-card shadow-sm">
                        <h3 className="text-lg font-semibold mb-6 flex items-center justify-between">
                            Evolución de Citas y Pacientes
                            <span className="text-sm font-normal text-muted-foreground">Estadísticas actuales</span>
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                            <div className="p-3 bg-muted/50 rounded-lg">
                                <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Citas Hoy</div>
                                <div className="text-xl font-bold">{dashboardData?.citasHoy || 0}</div>
                            </div>
                            <div className="p-3 bg-muted/50 rounded-lg">
                                <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Profesionales</div>
                                <div className="text-xl font-bold">{dashboardData?.totalProfesionales || 0}</div>
                            </div>
                            {Object.entries(dashboardData?.citasPorEstado || {}).slice(0, 2).map(([status, count]) => (
                                <div key={status} className="p-3 bg-muted/50 rounded-lg">
                                    <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">{status}</div>
                                    <div className="text-xl font-bold">{count}</div>
                                </div>
                            ))}
                        </div>
                        <div className="h-[200px] w-full flex items-end justify-between gap-2 px-2 border-t pt-4">
                            {[40, 55, 45, 60, 50, 70, 65, 80, 75, 90, 85, 95].map((val, i) => (
                                <div key={i} className="relative w-full flex flex-col justify-end group">
                                    <div
                                        className="w-full bg-primary/20 rounded-t-sm hover:bg-primary/50 transition-colors"
                                        style={{ height: `${val}%` }}
                                    ></div>
                                    <div className="text-[8px] text-muted-foreground text-center mt-2 hidden sm:block">
                                        {['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'][i]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tabla de Usuarios */}
                    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <h3 className="text-lg font-semibold">Usuarios Registrados</h3>
                            <div className="relative w-full sm:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Buscar por nombre o email..."
                                    className="pl-9 h-9"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader className="bg-muted/50">
                                    <TableRow>
                                        <TableHead>Nombre</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Rol</TableHead>
                                        <TableHead>Estado</TableHead>
                                        <TableHead className="text-right">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                                        <TableRow key={user.id} className="group hover:bg-muted/50">
                                            <TableCell className="font-medium whitespace-nowrap">
                                                {user.firstName} {user.lastName}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">{user.email}</TableCell>
                                            <TableCell>
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${getRoleBadge(user.role)}`}>
                                                    {user.role}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className={`h-2 w-2 rounded-full inline-block mr-2 ${user.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                                                <span className="text-xs font-medium">{user.status}</span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50" onClick={() => toast({ title: "Próximamente", description: "Edición de usuarios en desarrollo" })}><Edit className="h-4 w-4" /></Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-50" onClick={() => handleDeleteUser(user.id)}><Trash2 className="h-4 w-4" /></Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                                No se encontraron usuarios.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>

                {/* Lado derecho (1 columna): Auditoría + Acciones Rápidas */}
                <div className="space-y-6">

                    {/* Acciones Rápidas */}
                    <div className="grid grid-cols-2 gap-4">
                        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="h-24 flex flex-col gap-2 hover:border-primary hover:bg-primary/5 transition-colors border-2">
                                    <Plus className="h-6 w-6 text-primary" />
                                    <span className="font-semibold text-xs uppercase tracking-wider">Crear Usuario</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-bold">Añadir Nuevo Usuario</DialogTitle>
                                    <DialogDescription>
                                        Registra personal médico o administrativo para la organización.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto px-1">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">Nombre</Label>
                                            <Input id="firstName" value={newUserState.firstName} onChange={e => setNewUserState({ ...newUserState, firstName: e.target.value })} placeholder="Ej. Ana" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Apellido</Label>
                                            <Input id="lastName" value={newUserState.lastName} onChange={e => setNewUserState({ ...newUserState, lastName: e.target.value })} placeholder="Ej. López" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Correo Electrónico</Label>
                                            <Input id="email" type="email" value={newUserState.email} onChange={e => setNewUserState({ ...newUserState, email: e.target.value })} placeholder="ana@clinica.com" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Teléfono</Label>
                                            <Input id="phone" value={newUserState.phone} onChange={e => setNewUserState({ ...newUserState, phone: e.target.value })} placeholder="Ej. +57 300..." />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Rol del Usuario</Label>
                                        <Select value={newUserState.role} onValueChange={(val) => setNewUserState({ ...newUserState, role: val })}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona un rol" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="DOCTOR">Doctor/Médico</SelectItem>
                                                <SelectItem value="RECEPTIONIST">Recepcionista</SelectItem>
                                                <SelectItem value="CAREGIVER">Cuidador/Enfermero</SelectItem>
                                                <SelectItem value="ADMIN">Administrador</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {newUserState.role === 'DOCTOR' && (
                                        <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-300">
                                            <div className="space-y-2">
                                                <Label htmlFor="specialization">Especialidad</Label>
                                                <Input id="specialization" value={newUserState.specialization} onChange={e => setNewUserState({ ...newUserState, specialization: e.target.value })} placeholder="Ej. Pediatría" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="licenseNumber">Matrícula/Licencia</Label>
                                                <Input id="licenseNumber" value={newUserState.licenseNumber} onChange={e => setNewUserState({ ...newUserState, licenseNumber: e.target.value })} placeholder="Ej. MP 12345" />
                                            </div>
                                        </div>
                                    )}

                                    <div className="p-4 bg-muted/50 rounded-lg space-y-3 mt-2 border">
                                        <div className="flex justify-between items-center">
                                            <Label className="text-muted-foreground font-semibold">Contraseña Temporal</Label>
                                            <Button variant="secondary" size="sm" onClick={handleGeneratePassword}>Generar</Button>
                                        </div>
                                        {generatedPassword ? (
                                            <div className="font-mono text-center text-lg bg-background py-2 rounded border border-primary/20 text-primary tracking-widest font-bold">
                                                {generatedPassword}
                                            </div>
                                        ) : (
                                            <div className="text-sm text-center text-muted-foreground flex items-center justify-center gap-2">
                                                <HelpCircle className="w-4 h-4" /> Presiona generar para crearla
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={handleCreateUser} className="w-full text-md font-bold" disabled={!generatedPassword}>
                                        Guardar Usuario
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <Button variant="outline" className="h-24 flex flex-col gap-2 hover:border-primary hover:bg-primary/5 transition-colors border-2">
                            <Calendar className="h-6 w-6 text-primary" />
                            <span className="font-semibold text-xs uppercase tracking-wider">Gestionar Citas</span>
                        </Button>
                        <Button variant="outline" className="h-24 flex flex-col gap-2 hover:border-primary hover:bg-primary/5 transition-colors border-2">
                            <HeartPulse className="h-6 w-6 text-primary" />
                            <span className="font-semibold text-xs uppercase tracking-wider">Inventario</span>
                        </Button>
                        <Button variant="outline" className="h-24 flex flex-col gap-2 hover:border-primary hover:bg-primary/5 transition-colors border-2">
                            <Settings className="h-6 w-6 text-primary" />
                            <span className="font-semibold text-xs uppercase tracking-wider">Configuración</span>
                        </Button>
                    </div>

                    {/* Timeline Auditoría */}
                    <div className="rounded-xl border border-border bg-card shadow-sm p-6">
                        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                            <FileWarning className="h-5 w-5 text-muted-foreground" />
                            Auditoría Reciente
                        </h3>
                        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                            {mockAudit.map((item, i) => (
                                <div key={item.id} className="relative flex items-start justify-between md:justify-normal group is-active">
                                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-card shrink-0 shadow-sm z-10 ${item.status === 'SUCCESS' ? 'bg-emerald-500' : 'bg-rose-500'
                                        }`}>
                                        {item.status === 'SUCCESS' ? <Activity className="h-4 w-4 text-white" /> : <Settings className="h-4 w-4 text-white" />}
                                    </div>
                                    <div className="w-[calc(100%-4rem)] ml-4 p-4 rounded-xl border border-border bg-background shadow-sm">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-bold text-sm text-primary">{item.user}</span>
                                            <time className="text-[10px] font-medium text-muted-foreground">{item.time}</time>
                                        </div>
                                        <div className="text-sm text-foreground mb-2">{item.action}</div>
                                        <div className="flex items-center font-medium text-[10px] text-muted-foreground uppercase tracking-widest gap-3">
                                            <span>📍 {item.location}</span>
                                            <span className={item.status === 'SUCCESS' ? 'text-emerald-500' : 'text-rose-500'}>
                                                {item.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
