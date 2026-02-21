import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Users, Pencil, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { getPatients, createPatient, updatePatient, deletePatient, type Patient } from "@/lib/api";

export default function Pacientes() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { data: patients = [], isLoading } = useQuery({
    queryKey: ["pacientes"],
    queryFn: getPatients,
  });

  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", address: "", birthDate: "" });

  const resetForm = () => { setForm({ firstName: "", lastName: "", email: "", phone: "", address: "", birthDate: "" }); setEditingPatient(null); };

  const createMut = useMutation({
    mutationFn: (data: typeof form) => createPatient(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["pacientes"] }); setIsFormOpen(false); resetForm(); toast.success("Paciente creado"); },
    onError: (e: any) => toast.error(e.response?.data?.message || "Error al crear paciente"),
  });

  const updateMut = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Patient> }) => updatePatient(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["pacientes"] }); setIsFormOpen(false); resetForm(); toast.success("Paciente actualizado"); },
    onError: (e: any) => toast.error(e.response?.data?.message || "Error al actualizar"),
  });

  const deleteMut = useMutation({
    mutationFn: (id: number) => deletePatient(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["pacientes"] }); setDeleteId(null); toast.success("Paciente eliminado"); },
    onError: (e: any) => toast.error(e.response?.data?.message || "Error al eliminar"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPatient) {
      updateMut.mutate({ id: editingPatient.id, data: form });
    } else {
      createMut.mutate(form);
    }
  };

  const openEdit = (p: Patient) => {
    setEditingPatient(p);
    setForm({ firstName: p.firstName, lastName: p.lastName, email: p.email, phone: p.phone, address: p.address, birthDate: p.birthDate });
    setIsFormOpen(true);
  };

  const filtered = patients.filter(p =>
    `${p.firstName} ${p.lastName} ${p.email}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Pacientes</h1>
          <p className="text-sm text-muted-foreground">Gestión de pacientes registrados</p>
        </div>
        <Button onClick={() => { resetForm(); setIsFormOpen(true); }} className="gap-2">
          <Plus className="h-4 w-4" /> Nuevo Paciente
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar paciente..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-3">
              {[1,2,3,4].map(i => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <Users className="h-10 w-10 mx-auto mb-3 opacity-40" />
              <p>No hay pacientes</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Fecha Nacimiento</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(p => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.firstName} {p.lastName}</TableCell>
                    <TableCell>{p.email}</TableCell>
                    <TableCell>{p.phone}</TableCell>
                    <TableCell>{p.birthDate}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(p)} aria-label="Editar">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteId(p.id)} aria-label="Eliminar" className="text-destructive">
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

      {/* Create / Edit Dialog */}
      <Dialog open={isFormOpen} onOpenChange={(o) => { if (!o) { setIsFormOpen(false); resetForm(); } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingPatient ? "Editar Paciente" : "Nuevo Paciente"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Nombre</Label>
                <Input value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} required />
              </div>
              <div className="space-y-1.5">
                <Label>Apellido</Label>
                <Input value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} required />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Teléfono</Label>
                <Input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required />
              </div>
              <div className="space-y-1.5">
                <Label>Fecha Nacimiento</Label>
                <Input type="date" value={form.birthDate} onChange={e => setForm({...form, birthDate: e.target.value})} required />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Dirección</Label>
              <Input value={form.address} onChange={e => setForm({...form, address: e.target.value})} required />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => { setIsFormOpen(false); resetForm(); }}>Cancelar</Button>
              <Button type="submit" disabled={createMut.isPending || updateMut.isPending}>
                {(createMut.isPending || updateMut.isPending) ? "Guardando..." : "Guardar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Eliminar paciente?</DialogTitle>
          </DialogHeader>
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
