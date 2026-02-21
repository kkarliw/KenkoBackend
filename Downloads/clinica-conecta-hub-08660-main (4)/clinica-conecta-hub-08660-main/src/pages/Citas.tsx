import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Calendar, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { getAppointments, createAppointment, updateAppointmentStatus, deleteAppointment, getPatients, type Appointment, type Patient } from "@/lib/api";

const statusColors: Record<string, string> = {
  PENDING: "bg-warning/10 text-warning border-warning/30",
  COMPLETED: "bg-success/10 text-success border-success/30",
  CANCELLED: "bg-destructive/10 text-destructive border-destructive/30",
};

const statusLabels: Record<string, string> = {
  PENDING: "Pendiente",
  COMPLETED: "Completada",
  CANCELLED: "Cancelada",
};

export default function Citas() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const queryClient = useQueryClient();

  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });

  const { data: patients = [] } = useQuery({
    queryKey: ["pacientes"],
    queryFn: getPatients,
  });

  const [form, setForm] = useState({
    patientId: "", doctorId: "1", appointmentDate: "", appointmentTime: "", type: "Consulta General", notes: "",
  });

  const createMut = useMutation({
    mutationFn: () => createAppointment({
      patientId: parseInt(form.patientId),
      doctorId: parseInt(form.doctorId),
      appointmentDate: form.appointmentDate,
      appointmentTime: form.appointmentTime,
      type: form.type,
      notes: form.notes,
    }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["appointments"] }); setIsFormOpen(false); toast.success("Cita creada"); },
    onError: (e: any) => toast.error(e.response?.data?.message || "Error al crear cita"),
  });

  const statusMut = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => updateAppointmentStatus(id, status),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["appointments"] }); toast.success("Estado actualizado"); },
  });

  const deleteMut = useMutation({
    mutationFn: (id: number) => deleteAppointment(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["appointments"] }); setDeleteId(null); toast.success("Cita eliminada"); },
  });

  const filtered = appointments.filter(a => {
    const matchSearch = `${a.patientName} ${a.doctorName}`.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "ALL" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Citas Médicas</h1>
          <p className="text-sm text-muted-foreground">Gestión de citas agendadas</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" /> Nueva Cita
        </Button>
      </div>

      <div className="flex gap-3 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar por paciente o doctor..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos</SelectItem>
            <SelectItem value="PENDING">Pendiente</SelectItem>
            <SelectItem value="COMPLETED">Completada</SelectItem>
            <SelectItem value="CANCELLED">Cancelada</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-3">
              {[1,2,3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <Calendar className="h-10 w-10 mx-auto mb-3 opacity-40" />
              <p>No hay citas</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Paciente</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(a => (
                  <TableRow key={a.id}>
                    <TableCell className="font-medium">{a.patientName}</TableCell>
                    <TableCell>{a.doctorName}</TableCell>
                    <TableCell>{a.appointmentDate}</TableCell>
                    <TableCell>{a.appointmentTime}</TableCell>
                    <TableCell>{a.type}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusColors[a.status] || ""}>
                        {statusLabels[a.status] || a.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Select
                        value={a.status}
                        onValueChange={(v) => statusMut.mutate({ id: a.id, status: v })}
                      >
                        <SelectTrigger className="w-28 h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PENDING">Pendiente</SelectItem>
                          <SelectItem value="COMPLETED">Completada</SelectItem>
                          <SelectItem value="CANCELLED">Cancelada</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteId(a.id)} className="text-destructive" aria-label="Eliminar">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Create Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nueva Cita</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); createMut.mutate(); }} className="space-y-4">
            <div className="space-y-1.5">
              <Label>Paciente</Label>
              <Select value={form.patientId} onValueChange={v => setForm({...form, patientId: v})}>
                <SelectTrigger><SelectValue placeholder="Seleccionar paciente" /></SelectTrigger>
                <SelectContent>
                  {patients.map(p => (
                    <SelectItem key={p.id} value={String(p.id)}>{p.firstName} {p.lastName}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Fecha</Label>
                <Input type="date" value={form.appointmentDate} onChange={e => setForm({...form, appointmentDate: e.target.value})} required />
              </div>
              <div className="space-y-1.5">
                <Label>Hora</Label>
                <Input type="time" value={form.appointmentTime} onChange={e => setForm({...form, appointmentTime: e.target.value})} required />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Tipo</Label>
              <Input value={form.type} onChange={e => setForm({...form, type: e.target.value})} placeholder="Consulta General" />
            </div>
            <div className="space-y-1.5">
              <Label>Notas</Label>
              <Textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} placeholder="Observaciones..." />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Cancelar</Button>
              <Button type="submit" disabled={createMut.isPending}>
                {createMut.isPending ? "Creando..." : "Crear Cita"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>¿Eliminar cita?</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">Esta acción no se puede deshacer.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancelar</Button>
            <Button variant="destructive" onClick={() => deleteId && deleteMut.mutate(deleteId)} disabled={deleteMut.isPending}>
              {deleteMut.isPending ? "Eliminando..." : "Eliminar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
