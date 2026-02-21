import ClinicalLayout from '@/components/layouts/ClinicalLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function DoctorDashboard() {
  const { user } = useAuth();

  // Mock data - Replace with API calls
  const nextAppointment = {
    time: '14:30',
    patient: 'Pedro Fernández',
    age: 45,
    type: 'Consulta General',
    room: 'Consultorio 3',
    minutes: 10,
  };

  const agenda = [
    { time: '09:00', patient: 'Ana González', status: 'completed' },
    { time: '10:00', patient: 'Carlos Ruiz', status: 'completed' },
    { time: '11:00', patient: 'Laura Martín', status: 'pending' },
    { time: '12:00', status: 'free' },
    { time: '13:00', patient: 'Pedro Fernández', status: 'next' },
    { time: '14:00', status: 'free' },
    { time: '15:00', patient: 'Rosa López', status: 'telemedicina' },
  ];

  const patientHistory = {
    name: 'Pedro Fernández',
    age: 45,
    bloodType: 'O+',
    allergies: ['Penicilina'],
    meds: ['Losartán 50mg'],
  };

  return (
    <ClinicalLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Dr(a). {user?.firstName || 'Doctor'}
            </h1>
            <p className="text-slate-600">Tu agenda de citas</p>
          </div>
          <div className="flex gap-3">
            <Badge className="bg-red-100 text-red-800 px-3 py-2">
              🔴 Próxima cita en 10 min
            </Badge>
          </div>
        </div>

        {/* Next Appointment - Highlighted */}
        <Card className="p-6 border-l-4 border-l-red-500 bg-red-50 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                🔴 PRÓXIMA CITA EN {nextAppointment.minutes} MINUTOS
              </h2>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-slate-700">
                  🕐 {nextAppointment.time}
                </p>
                <p className="text-lg text-slate-700">
                  👤 {nextAppointment.patient} ({nextAppointment.age} años, M, {nextAppointment.age % 2 === 0 ? 'O+' : 'A+'})
                </p>
                <p className="text-slate-600">📝 Tipo: {nextAppointment.type}</p>
                <p className="text-slate-600">📍 {nextAppointment.room}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button className="h-12 text-base font-semibold">
                ▶️ Empezar Consulta
              </Button>
              <Button variant="outline" className="h-10">Ver Historia Clínica</Button>
              <Button variant="outline" className="h-10">Telemedicina</Button>
            </div>
          </div>
        </Card>

        {/* Agenda Timeline + Patient History */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timeline - 70% */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                AGENDA TIMELINE
              </h3>
              <div className="space-y-0">
                {agenda.map((slot, i) => {
                  let bgColor = 'bg-white';
                  let leftBorder = 'border-l-slate-300';
                  let icon = '⏲️';

                  if (slot.status === 'completed') {
                    bgColor = 'bg-green-50';
                    leftBorder = 'border-l-green-500';
                    icon = '✅';
                  } else if (slot.status === 'next') {
                    bgColor = 'bg-red-50';
                    leftBorder = 'border-l-red-500';
                    icon = '🔴';
                  } else if (slot.status === 'pending') {
                    bgColor = 'bg-amber-50';
                    leftBorder = 'border-l-amber-500';
                    icon = '⏳';
                  } else if (slot.status === 'telemedicina') {
                    bgColor = 'bg-blue-50';
                    leftBorder = 'border-l-blue-500';
                    icon = '📞';
                  }

                  return (
                    <div
                      key={i}
                      className={`p-3 border-l-4 ${leftBorder} ${bgColor} hover:shadow-md cursor-pointer transition-all`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-slate-900 w-16">
                          {slot.time}
                        </span>
                        <span className="flex-1 text-slate-700 ml-4">
                          {slot.patient ? `${icon} ${slot.patient}` : `${icon} (libre)`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 flex gap-2 flex-wrap">
                <Badge>TODOS</Badge>
                <Badge variant="outline">PENDING</Badge>
                <Badge variant="outline">COMPLETED</Badge>
              </div>
            </Card>
          </div>

          {/* Patient History - 30% */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              HISTORIA CLÍNICA
            </h3>
            <div className="space-y-4">
              <div className="pb-4 border-b">
                <p className="text-xs text-slate-600 uppercase font-bold mb-1">Paciente</p>
                <p className="font-semibold text-slate-900">{patientHistory.name}</p>
                <p className="text-sm text-slate-600">{patientHistory.age} años</p>
              </div>
              <div className="pb-4 border-b">
                <p className="text-xs text-slate-600 uppercase font-bold mb-1">Grupo Sanguíneo</p>
                <p className="font-semibold text-slate-900">{patientHistory.bloodType}</p>
              </div>
              <div className="pb-4 border-b">
                <p className="text-xs text-slate-600 uppercase font-bold mb-1">Alergias</p>
                <div className="flex flex-wrap gap-2">
                  {patientHistory.allergies.map((a, i) => (
                    <Badge key={i} variant="destructive">{a}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-600 uppercase font-bold mb-2">Medicamentos</p>
                <div className="space-y-1">
                  {patientHistory.meds.map((m, i) => (
                    <p key={i} className="text-sm text-slate-700">💊 {m}</p>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Clinical Notes Editor */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            NOTAS DE HOY - EDITOR
          </h3>
          <textarea
            className="w-full h-40 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            placeholder="Paciente refiere dolor abdominal desde ayer...
Examen físico: abdomen blando, sin hallazgos.
Presión: 140/90 mmHg | FC: 78 bpm

DIAGNÓSTICO: Gastritis aguda

PLAN:
- Dieta blanda 5 días
- Omeprazol 20mg c/12h x 7 días
- Control en 1 semana"
            defaultValue="Paciente refiere dolor abdominal desde ayer...
Examen físico: abdomen blando, sin hallazgos.
Presión: 140/90 mmHg | FC: 78 bpm

DIAGNÓSTICO: Gastritis aguda

PLAN:
- Dieta blanda 5 días
- Omeprazol 20mg c/12h x 7 días
- Control en 1 semana"
          />
          <div className="mt-4 flex gap-2">
            <Button>💾 Guardar</Button>
            <Button variant="outline">📋 Generar Receta</Button>
            <Button variant="outline">✅ Finalizar Cita</Button>
          </div>
        </Card>

        {/* Recent Patients */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Mis Pacientes (últimos 5)
          </h3>
          <div className="space-y-2">
            {['Pedro Fernández', 'Laura Martín', 'Carlos Ruiz', 'Ana González', 'Rosa López'].map(
              (p, i) => (
                <div key={i} className="p-3 hover:bg-slate-50 rounded cursor-pointer">
                  {i + 1}. {p} - Hace {['2 min', '1 hora', 'ayer', '3 días', '1 semana'][i]}
                </div>
              )
            )}
          </div>
        </Card>
      </div>
    </ClinicalLayout>
  );
}
