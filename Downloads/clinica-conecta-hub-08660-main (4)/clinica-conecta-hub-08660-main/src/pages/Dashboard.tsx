import { useQuery } from "@tanstack/react-query";
import { Users, Calendar, Clock, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { getDashboardStats, type DashboardStats } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { user } = useAuth();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboard", user?.id],
    queryFn: () => getDashboardStats(user!.id),
    enabled: !!user?.id,
  });

  const kpis = [
    { title: "Total Pacientes", value: stats?.totalPatients ?? 0, icon: Users, color: "text-primary" },
    { title: "Citas Pendientes", value: stats?.totalPendingAppointments ?? 0, icon: Calendar, color: "text-warning" },
    { title: "Citas Hoy", value: stats?.appointmentsToday?.length ?? 0, icon: Clock, color: "text-success" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">
          Bienvenido, {user?.firstName || "Usuario"}
        </h1>
        <p className="text-sm text-muted-foreground capitalize mt-1">
          {user?.role?.toLowerCase().replace("_", " ")}
        </p>
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
            <div className="space-y-3">
              {[1,2,3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : !stats?.upcomingAppointments?.length ? (
            <p className="text-sm text-muted-foreground py-4 text-center">No hay citas próximas</p>
          ) : (
            <div className="space-y-2">
              {stats.upcomingAppointments.slice(0, 5).map((apt) => (
                <div key={apt.id} className="flex items-center justify-between p-3 rounded-md border border-border">
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
    </div>
  );
}
