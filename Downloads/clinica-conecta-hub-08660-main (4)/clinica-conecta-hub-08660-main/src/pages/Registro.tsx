import { useState } from "react";
import { Link } from "react-router-dom";
import { Building2, Mail, Lock, MapPin, ArrowLeft, User, Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import kenkoIcon from "@/assets/kenko-icon.svg";
import { useAuth } from "@/contexts/AuthContext";

export default function Registro() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    organizationName: "", email: "", password: "", confirmPassword: "",
    firstName: "", lastName: "", phone: "", address: "", city: "", country: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) { toast.error("Las contraseñas no coinciden"); return; }
    if (formData.password.length < 8) { toast.error("Mínimo 8 caracteres"); return; }
    setIsLoading(true);
    try {
      await register(formData);
      toast.success("Organización registrada");
    } catch (error: any) {
      toast.error("Error", { description: error.response?.data?.message || error.message });
    } finally { setIsLoading(false); }
  };

  const update = (field: string, value: string) => setFormData({ ...formData, [field]: value });

  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center p-12">
        <div className="text-center text-primary-foreground max-w-sm">
          <div className="h-16 w-16 rounded-md bg-primary-foreground/10 flex items-center justify-center mx-auto mb-8">
            <img src={kenkoIcon} alt="" className="h-8 w-8 brightness-0 invert" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Kenkō</h1>
          <p className="text-primary-foreground/70 text-sm">Registra tu consultorio y comienza a operar en minutos.</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4" /> Volver
          </Link>

          <div className="mb-6">
            <div className="lg:hidden flex items-center gap-2 mb-6">
              <img src={kenkoIcon} alt="" className="h-8 w-8" />
              <span className="font-semibold">Kenkō</span>
            </div>
            <h2 className="text-2xl font-semibold mb-1">Registrar Organización</h2>
            <p className="text-sm text-muted-foreground">Crea tu sistema médico en minutos</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-sm">Nombre de la Organización</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Ej: Consultorio Dr. García" className="pl-9 h-10" value={formData.organizationName} onChange={(e) => update("organizationName", e.target.value)} required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-sm">Nombre Admin</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Nombre" className="pl-9 h-10" value={formData.firstName} onChange={(e) => update("firstName", e.target.value)} required />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Apellido Admin</Label>
                <Input placeholder="Apellido" className="h-10" value={formData.lastName} onChange={(e) => update("lastName", e.target.value)} required />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm">Email del Administrador</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="email" placeholder="admin@consultorio.com" className="pl-9 h-10" value={formData.email} onChange={(e) => update("email", e.target.value)} required />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm">Teléfono</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="+57 300 000 0000" className="pl-9 h-10" value={formData.phone} onChange={(e) => update("phone", e.target.value)} required />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm">Dirección</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Calle 123 #45-67" className="pl-9 h-10" value={formData.address} onChange={(e) => update("address", e.target.value)} required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-sm">Ciudad</Label>
                <Input placeholder="Bogotá" className="h-10" value={formData.city} onChange={(e) => update("city", e.target.value)} required />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">País</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Colombia" className="pl-9 h-10" value={formData.country} onChange={(e) => update("country", e.target.value)} required />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-sm">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="password" placeholder="Mín. 8 caracteres" className="pl-9 h-10" value={formData.password} onChange={(e) => update("password", e.target.value)} required minLength={8} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Confirmar</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="password" placeholder="Repite" className="pl-9 h-10" value={formData.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} required />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full h-10 text-sm" disabled={isLoading}>
              {isLoading ? "Registrando..." : "Crear Organización"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
