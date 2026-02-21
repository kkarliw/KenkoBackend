import { useQuery } from "@tanstack/react-query";
import { Users, Calendar, Clock, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { getDashboardStats, type DashboardStats } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { user } = useAuth();

  console.log('📊 Dashboard rendering, user:', user);

  const { data: stats, isLoading, error } = useQuery({
    queryKey: ["dashboard", user?.id],
    queryFn: () => getDashboardStats(user!.id),
    enabled: !!user?.id,
  });

  if (error) {
    console.error('❌ Dashboard error:', error);
    return <div className="p-4 text-red-500">Error cargando dashboard: {String(error)}</div>;
  }

  const kpis = [
    { title: "Total Pacientes", value: stats?.totalPatients ?? 0, icon: Users, color: "text-primary" },
    { title: "Citas Pendientes", value: stats?.totalPendingAppointments ?? 0, icon: Calendar, color: "text-warning" },
    { title: "Citas Hoy", value: stats?.appointmentsToday?.length ?? 0, icon: Clock, color: "text-success" },
  ];

  return (
    <div className="space-y-6 bg-background min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          ✅ Bienvenido, {user?.firstName || "Usuario"}
        </h1>
        <p className="text-base text-muted-foreground capitalize mt-2">
          Rol: {user?.role?.toLowerCase().replace("_", " ")}
        </p>
      </div>

      {/* Debug info */}
      <div className="bg-blue-50 p-4 rounded text-sm text-blue-900">
        <p>🔧 Debug: Datos cargando... {isLoading ? "SÍ" : "NO"}</p>
        <p>📊 Stats: {stats ? "Recibidos" : "Sin datos"}</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
              <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-3xl font-bold">{kpi.value}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Próximas Citas
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground">Cargando citas...</p>
          ) : !stats?.upcomingAppointments?.length ? (
            <p className="text-sm text-muted-foreground py-4 text-center">No hay citas próximas</p>
          ) : (
            <div className="space-y-2">
              {stats.upcomingAppointments.slice(0, 5).map((apt) => (
                <div key={apt.id} className="flex items-center justify-between p-3 rounded-md border border-border bg-card">
                  <div>
                    <p className="text-sm font-medium">{apt.patientName}</p>
                    <p className="text-xs text-muted-foreground">{apt.date} — {apt.time}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">{apt.type}</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Citas del día */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Citas de Hoy
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground">Cargando...</p>
          ) : !stats?.appointmentsToday?.length ? (
            <p className="text-sm text-muted-foreground py-4 text-center">Sin citas hoy</p>
          ) : (
            <div className="space-y-2">
              {stats.appointmentsToday.map((apt) => (
                <div key={apt.id} className="p-3 rounded-md bg-muted/50 border border-border/50">
                  <p className="font-medium text-sm">{apt.patientName}</p>
                  <p className="text-xs text-muted-foreground">{apt.time} - {apt.type}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
