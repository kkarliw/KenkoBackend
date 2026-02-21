import ClinicalLayout from '@/components/layouts/ClinicalLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CaregiverDashboard() {
  const { user } = useAuth();

  const myPatients = [
    {
      id: 1,
      name: 'Pedro Fernández',
      age: 45,
      role: 'Cuidador Principal',
      nextAppointment: {
        date: 'Mañana 14:30',
        doctor: 'Dr. Juan García',
        type: 'Consulta General',
      },
    },
    {
      id: 2,
      name: 'Rosa López',
      age: 78,
      role: 'Cuidadora Secundaria',
      nextAppointment: {
        date: '5 Marzo 10:00',
        doctor: 'Dra. María Martínez',
        type: 'Checkup',
      },
    },
  ];

  return (
    <ClinicalLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Cuidador{' '}
              <span className="text-lg text-slate-600 font-normal">
                {user?.firstName}
              </span>
            </h1>
            <p className="text-slate-600">Gestión de tus pacientes a cargo</p>
          </div>
        </div>

        {/* My Patients Cards */}
        <div className="space-y-6">
          {myPatients.map((patient) => (
            <Card key={patient.id} className="p-6 border-l-4 border-l-purple-500">
              <div className="space-y-4">
                {/* Patient Info */}
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      PACIENTE: {patient.name}
                    </h2>
                    <p className="text-slate-600">
                      {patient.age} años • Relación: {patient.role}
                    </p>
                  </div>
                </div>

                {/* Next Appointment */}
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-l-blue-500">
                  <p className="text-sm text-slate-600 uppercase font-bold mb-2">
                    Próxima Cita
                  </p>
                  <p className="text-lg font-semibold text-slate-900">
                    📅 {patient.nextAppointment.date}
                  </p>
                  <p className="text-slate-700">
                    👨‍⚕️ {patient.nextAppointment.doctor} -{' '}
                    {patient.nextAppointment.type}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 flex-wrap">
                  <Button className="flex-1">📋 VER DETALLES</Button>
                  <Button variant="outline" className="flex-1">
                    📜 HISTORIAL
                  </Button>
                  <Button variant="outline" className="flex-1">
                    💊 RECETAS
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="h-16 text-base font-semibold">
            📅 MIS CITAS
          </Button>
          <Button className="h-16 text-base font-semibold" variant="outline">
            📄 DOCUMENTOS
          </Button>
          <Button className="h-16 text-base font-semibold" variant="outline">
            💬 CONTACTAR
          </Button>
        </div>

        {/* Info Card */}
        <Card className="p-6 bg-blue-50 border-l-4 border-l-blue-500">
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-900 text-lg">
              💡 Como Cuidador, puedes:
            </h3>
            <ul className="space-y-2 text-slate-700">
              <li>✓ Ver citas de tus pacientes</li>
              <li>✓ Acceder a documentos e historiales</li>
              <li>✓ Recibir recordatorios de citas</li>
              <li>✓ Comunicarte con doctores</li>
              <li>✓ Descargar recetas y pruebas</li>
            </ul>
          </div>
        </Card>
      </div>
    </ClinicalLayout>
  );
}
