import ClinicalLayout from '@/components/layouts/ClinicalLayout';
import { useAuth } from '@/contexts/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function AdminDashboard() {
  const { user } = useAuth();

  // Mock data - Replace with API calls
  const kpiData = [
    { label: 'INGRESOS MES', value: '$45,320', change: '+12%', trend: 'up' },
    { label: 'CITAS CREADAS', value: '234', change: '+8%', trend: 'up' },
    { label: 'PACIENTES', value: '1,892', change: '+3%', trend: 'up' },
    { label: 'TASA NO-SHOW', value: '8.2%', change: '-2%', trend: 'down' },
  ];

  const chartData = [
    { month: 'Ene', revenue: 4000, projected: 4100 },
    { month: 'Feb', revenue: 3200, projected: 3300 },
    { month: 'Mar', revenue: 2800, projected: 3000 },
    { month: 'Apr', revenue: 3908, projected: 4200 },
    { month: 'May', revenue: 4800, projected: 5000 },
  ];

  const usersData = [
    { id: 1, name: 'Juan García', role: 'DOCTOR', lastAccess: 'Hace 2 min' },
    { id: 2, name: 'Ana Sánchez', role: 'RECEPTIONIST', lastAccess: 'Hace 15 min' },
    { id: 3, name: 'Pedro López', role: 'PATIENT', lastAccess: 'Hace 3 días' },
  ];

  return (
    <ClinicalLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Bienvenido, {user?.firstName || 'Admin'}
            </h1>
            <p className="text-slate-600">Panel de administración general</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">📊 Reportes</Button>
            <Button>➕ Crear Usuario</Button>
          </div>
        </div>

        {/* KPI Cards - Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiData.map((kpi, i) => (
            <Card key={i} className="p-6 border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
                {kpi.label}
              </p>
              <p className="text-2xl font-bold text-slate-900 mb-2">{kpi.value}</p>
              <p className={`text-sm font-semibold ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.trend === 'up' ? '▲' : '▼'} {kpi.change}
              </p>
            </Card>
          ))}
        </div>

        {/* Charts - Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Finance Chart */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Ingresos (12 últimos meses)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#1E3A8A" name="Realizados" />
                <Bar dataKey="projected" fill="#E0E7FF" name="Proyectados" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Status Distribution */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Distribución de Citas
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#1E3A8A" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Users & Audit - Row 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Users Table */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Usuarios Activos
            </h3>
            <div className="space-y-3">
              {usersData.map((u) => (
                <div key={u.id} className="flex justify-between items-center p-3 bg-slate-50 rounded hover:bg-slate-100">
                  <div>
                    <p className="font-semibold text-slate-900">{u.name}</p>
                    <p className="text-xs text-slate-600">{u.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-600">{u.lastAccess}</p>
                    <Button size="sm" variant="ghost" className="mt-1">Editar</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Audit Timeline */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Auditoría Reciente
            </h3>
            <div className="space-y-3">
              <div className="flex gap-3 p-3 border-l-2 border-l-blue-500">
                <span className="text-2xl">📋</span>
                <div>
                  <p className="font-semibold text-slate-900">Juan creó cita</p>
                  <p className="text-xs text-slate-600">Hace 2 horas</p>
                </div>
              </div>
              <div className="flex gap-3 p-3 border-l-2 border-l-green-500">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-semibold text-slate-900">Ana confirmó paciente</p>
                  <p className="text-xs text-slate-600">Hace 1 hora</p>
                </div>
              </div>
              <div className="flex gap-3 p-3 border-l-2 border-l-slate-500">
                <span className="text-2xl">💾</span>
                <div>
                  <p className="font-semibold text-slate-900">Backup automático</p>
                  <p className="text-xs text-slate-600">Hace 30 min</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Action Buttons - Row 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button className="h-16 text-base font-semibold">
            ➕ CREAR USUARIO
          </Button>
          <Button className="h-16 text-base font-semibold" variant="outline">
            📅 GESTIONAR CITAS
          </Button>
          <Button className="h-16 text-base font-semibold" variant="outline">
            📊 INVENTARIO
          </Button>
          <Button className="h-16 text-base font-semibold" variant="outline">
            ⚙️ CONFIG
          </Button>
        </div>
      </div>
    </ClinicalLayout>
  );
}
