import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import kenkoIcon from "@/assets/kenko-icon.svg";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(formData.email, formData.password);
      toast.success("Sesión iniciada");
    } catch (error: any) {
      const msg = error.response?.data?.message || error.message || "Verifica tus credenciales.";
      toast.error("Error al iniciar sesión", { description: msg });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left — branding panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center p-12">
        <div className="text-center text-primary-foreground max-w-sm">
          <div className="h-16 w-16 rounded-md bg-primary-foreground/10 flex items-center justify-center mx-auto mb-8">
            <img src={kenkoIcon} alt="" className="h-8 w-8 brightness-0 invert" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Kenkō</h1>
          <p className="text-primary-foreground/70 text-sm leading-relaxed">
            Sistema Operativo Inteligente para la gestión completa de tu consultorio médico.
          </p>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4" /> Volver
          </Link>

          <div className="mb-8">
            <div className="lg:hidden flex items-center gap-2 mb-6">
              <img src={kenkoIcon} alt="" className="h-8 w-8" />
              <span className="font-semibold">Kenkō</span>
            </div>
            <h2 className="text-2xl font-semibold mb-1">Iniciar sesión</h2>
            <p className="text-sm text-muted-foreground">Accede a tu cuenta</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm">Correo electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="email" type="email" placeholder="tu@correo.com"
                  className="pl-9 h-10"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="password" type="password" placeholder="••••••••"
                  className="pl-9 h-10"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-10 text-sm" disabled={isLoading}>
              {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            ¿No tienes consultorio?{" "}
            <Link to="/registro" className="text-primary font-medium hover:underline">Regístralo aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
