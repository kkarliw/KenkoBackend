import { ShieldX, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getDashboardPath } from "@/contexts/AuthContext";

export default function Unauthorized() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
            <div className="text-center max-w-md">
                {/* Icon */}
                <div className="h-20 w-20 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-6">
                    <ShieldX className="h-10 w-10 text-destructive" />
                </div>

                <h1 className="text-3xl font-bold mb-2">Acceso Denegado</h1>
                <p className="text-muted-foreground mb-2">
                    No tienes permiso para ver esta página.
                </p>
                {user?.role && (
                    <p className="text-sm text-muted-foreground mb-6">
                        Tu rol actual es <strong className="capitalize">{user.role.toLowerCase()}</strong>.
                    </p>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                        onClick={() => navigate(getDashboardPath(user?.role))}
                        className="gap-2"
                    >
                        <Home className="h-4 w-4" />
                        Ir a mi Dashboard
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => navigate(-1)}
                        className="gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Volver
                    </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                        ¿Creees que esto es un error?{" "}
                        <button
                            className="text-primary hover:underline"
                            onClick={logout}
                        >
                            Cierra sesión
                        </button>{" "}
                        e ingresa con otra cuenta.
                    </p>
                </div>
            </div>
        </div>
    );
}
