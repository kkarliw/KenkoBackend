import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Shield, Building2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { getMe } from "@/lib/api";

export default function Perfil() {
  const { user } = useAuth();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getMe,
  });

  const data = profile || user;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Mi Perfil</h1>
        <p className="text-sm text-muted-foreground">Información de tu cuenta</p>
      </div>

      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle className="text-base">Datos del Usuario</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <div className="space-y-3">
              {[1,2,3,4].map(i => <Skeleton key={i} className="h-6 w-full" />)}
            </div>
          ) : data ? (
            <>
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Nombre</p>
                  <p className="text-sm font-medium">{data.firstName} {data.lastName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium">{data.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Rol</p>
                  <p className="text-sm font-medium capitalize">{data.role?.toLowerCase().replace("_", " ")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Organización ID</p>
                  <p className="text-sm font-medium">{data.orgId}</p>
                </div>
              </div>
            </>
          ) : (
            <p className="text-muted-foreground text-sm">No se pudo cargar el perfil</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
