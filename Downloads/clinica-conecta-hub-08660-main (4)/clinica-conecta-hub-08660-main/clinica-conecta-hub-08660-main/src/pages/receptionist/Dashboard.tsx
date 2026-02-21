import ClinicalLayout from '@/components/layouts/ClinicalLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function ReceptionistDashboard() {
  const { user } = useAuth();

  const nextPatients = [
    { name: 'Pedro Fernández', time: '10 MIN', doctor: 'Dr. Juan', room: '3', status: 'urgent' },
    { name: 'Laura Martín', time: '45 MIN', doctor: 'Dra. María', room: '1', status: 'warning' },
    { name: 'Rosa López', time: '2 HORAS', doctor: 'Dr. Antonio', room: '2', status: 'scheduled' },
  ];

  const doctors = ['Dr. Juan', 'Dra. María', 'Dr. Antonio', 'Dra. Sandra'];

  const schedule = [
    { hour: '09:00', juan: '✓ Ana', maria: '', antonio: '', sandra: '' },
    { hour: '10:00', juan: '', maria: '✓ Laura', antonio: '', sandra: '✓ Juan' },
    { hour: '11:00', juan: '', maria: '', antonio: '✓ Rosa', sandra: '' },
    { hour: '12:00', juan: 'LUNCH', maria: 'LUNCH', antonio: 'LUNCH', sandra: 'LUNCH' },
    { hour: '13:00', juan: '', maria: '', antonio: '', sandra: '' },
    { hour: '14:00', juan: '⏳ Pedro', maria: '', antonio: '', sandra: '' },
    { hour: '15:00', juan: '', maria: '📞 Rosa', antonio: '', sandra: '' },
    { hour: '16:00', juan: '', maria: '', antonio: '', sandra: '' },
  ];

  return (
    <ClinicalLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Recepción</h1>
            <p className="text-slate-600">Gestión de citas y pacientes</p>
          </div>
        </div>

        {/* Patient Search */}
        <Card className="p-6 bg-white">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            🔍 BÚSQUEDA PACIENTE (Rápida)
          </h3>
          <Input
            placeholder="Buscar por nombre, email o teléfono..."
            className="h-12 text-base mb-4"
          />
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {['Pedro Fernández (CC: 123456789)', 'Laura Martín (CC: 987654321)', 'Carlos Ruiz (CC: 456789123)'].map(
              (p, i) => (
                <div key={i} className="p-3 hover:bg-slate-50 rounded cursor-pointer border">
                  ✓ {p}
                  <br />
                  <span className="text-xs text-slate-600">Última cita: hace {['2 horas', '5 días', '1 mes'][i]}</span>
                </div>
              )
            )}
          </div>
          <Button className="mt-4 w-full">+ Crear nuevo paciente</Button>
        </Card>

        {/* Calendar + Next Patients */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar - 70% */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                CALENDARIO MULTI-DOCTOR (VISTA SEMANA)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-center text-sm">
                  <thead>
                    <tr className="bg-slate-100 border-b-2">
                      <th className="p-2 font-semibold">Hora</th>
                      {doctors.map((d) => (
                        <th key={d} className="p-3 font-semibold border-l">
                          {d}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map((row, i) => (
                      <tr key={i} className="border-b hover:bg-blue-50">
                        <td className="p-2 font-semibold bg-slate-50">{row.hour}</td>
                        <td className="p-2 border-l cursor-pointer hover:bg-blue-100">
                          {row.juan || '-'}
                        </td>
                        <td className="p-2 border-l cursor-pointer hover:bg-blue-100">
                          {row.maria || '-'}
                        </td>
                        <td className="p-2 border-l cursor-pointer hover:bg-blue-100">
                          {row.antonio || '-'}
                        </td>
                        <td className="p-2 border-l cursor-pointer hover:bg-blue-100">
                          {row.sandra || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex gap-2 flex-wrap">
                <Badge>TODOS</Badge>
                <Badge variant="outline">PENDING</Badge>
                <Badge variant="outline">CONFIRMED</Badge>
                <Badge variant="outline">COMPLETED</Badge>
              </div>
              <p className="text-xs text-slate-600 mt-2">💡 Drag & drop para reagendar | Clic en slot para crear cita</p>
            </Card>
          </div>

          {/* Next Patients - 30% */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              PRÓXIMOS PACIENTES
            </h3>
            <div className="space-y-3">
              {nextPatients.map((p, i) => {
                let badgeClass = 'bg-red-100 text-red-800';
                if (p.status === 'warning') badgeClass = 'bg-yellow-100 text-yellow-800';
                if (p.status === 'scheduled') badgeClass = 'bg-green-100 text-green-800';

                return (
                  <div key={i} className="p-3 border rounded-lg hover:shadow-md transition-shadow">
                    <Badge className={`mb-2 ${badgeClass}`}>
                      {p.status === 'urgent'
                        ? '🔴'
                        : p.status === 'warning'
                        ? '🟡'
                        : '🟢'}{' '}
                      EN {p.time}
                    </Badge>
                    <p className="font-semibold text-slate-900">{p.name}</p>
                    <p className="text-xs text-slate-600">{p.doctor} - {p.room}</p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" className="flex-1">✅ Check-in</Button>
                      <Button size="sm" variant="outline">📅 Reagendar</Button>
                    </div>
                  </div>
                );
              })}
            </div>
            <Button variant="ghost" className="w-full mt-4">
              Ver más pacientes...
            </Button>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button className="h-16 text-base font-semibold">
            ➕ NUEVA CITA
          </Button>
          <Button className="h-16 text-base font-semibold" variant="outline">
            📅 REAGENDAR
          </Button>
          <Button className="h-16 text-base font-semibold" variant="outline">
            ✅ CHECK-IN
          </Button>
          <Button className="h-16 text-base font-semibold" variant="outline">
            🔍 BUSCAR
          </Button>
        </div>
      </div>
    </ClinicalLayout>
  );
}
