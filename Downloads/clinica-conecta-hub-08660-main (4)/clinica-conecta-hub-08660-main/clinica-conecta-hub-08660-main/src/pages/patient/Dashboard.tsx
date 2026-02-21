import ClinicalLayout from '@/components/layouts/ClinicalLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

export default function PatientDashboard() {
  const { user } = useAuth();
  const [simplifiedMode, setSimplifiedMode] = useState(true);

  const upcomingAppointments = [
    {
      id: 1,
      date: 'MAÑANA',
      time: '14:30',
      doctor: 'Dr. Juan García',
      type: 'Consulta General',
      room: 'Consultorio 3',
    },
    {
      id: 2,
      date: '3 MARZO',
      time: '10:00',
      doctor: 'Dra. María Martínez',
      type: 'Checkup',
      room: 'Consultorio 1',
    },
  ];

  const recipes = [
    {
      id: 1,
      name: 'Omeprazol 20mg',
      frequency: 'Cada 12 horas',
      duration: '7 días',
      date: 'Reciente',
    },
    {
      id: 2,
      name: 'Losartán 50mg',
      frequency: 'Diariamente',
      duration: 'Continuo',
      date: 'Larga duración',
    },
  ];

  const documents = [
    { id: 1, name: 'Última consulta', date: '2 feb' },
    { id: 2, name: 'Análisis sangre', date: '25 ene' },
    { id: 3, name: 'Radiografía', date: '15 ene' },
  ];

  const containerClass = simplifiedMode
    ? 'space-y-4 text-lg leading-8'
    : 'space-y-6 text-base leading-6';

  const headingClass = simplifiedMode
    ? 'text-4xl font-bold text-slate-900 mb-4'
    : 'text-2xl font-semibold text-slate-900 mb-4';

  const buttonClass = simplifiedMode ? 'h-16 text-lg font-bold px-8' : 'h-10 text-sm';

  return (
    <ClinicalLayout>
      <div
        className={`min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 p-6 ${containerClass}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className={headingClass}>Mi Zona</h1>
            <p className="text-slate-600">Mis citas y documentos</p>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={simplifiedMode}
                onChange={(e) => setSimplifiedMode(e.target.checked)}
                className={simplifiedMode ? 'w-6 h-6' : 'w-4 h-4'}
              />
              <span className={simplifiedMode ? 'text-lg' : 'text-sm'}>
                Modo Simplificado
              </span>
            </label>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div>
          <h2 className={headingClass}>MIS CITAS PRÓXIMAS</h2>
          <div className="grid grid-cols-1 gap-4">
            {upcomingAppointments.map((apt) => (
              <Card
                key={apt.id}
                className={`p-6 border-l-4 border-l-blue-500 ${
                  simplifiedMode ? 'min-h-40' : ''
                }`}
              >
                <div
                  className={`grid ${simplifiedMode ? 'gap-4' : 'gap-2'}`}
                >
                  <p
                    className={`font-bold text-blue-600 ${
                      simplifiedMode ? 'text-2xl' : 'text-base'
                    }`}
                  >
                    🕐 {apt.date} - {apt.time}
                  </p>
                  <p
                    className={`font-semibold text-slate-900 ${
                      simplifiedMode ? 'text-2xl' : 'text-lg'
                    }`}
                  >
                    {apt.doctor}
                  </p>
                  <p
                    className={`text-slate-600 ${
                      simplifiedMode ? 'text-lg' : 'text-sm'
                    }`}
                  >
                    {apt.type} • {apt.room}
                  </p>
                  <div
                    className={`flex gap-2 flex-wrap ${
                      simplifiedMode ? 'mt-4' : ''
                    }`}
                  >
                    <Button
                      className={buttonClass}
                      size={simplifiedMode ? 'lg' : 'sm'}
                    >
                      📅 REAGENDAR
                    </Button>
                    <Button
                      variant="outline"
                      className={buttonClass}
                      size={simplifiedMode ? 'lg' : 'sm'}
                    >
                      📞 CONTACTAR
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recipes */}
        <div>
          <h2 className={headingClass}>MIS RECETAS</h2>
          <div className="space-y-3">
            {recipes.map((recipe) => (
              <Card key={recipe.id} className={`p-6 ${simplifiedMode ? 'min-h-28' : ''}`}>
                <div className={`flex justify-between items-start ${simplifiedMode ? 'gap-4' : 'gap-2'}`}>
                  <div>
                    <p
                      className={`font-bold text-slate-900 ${
                        simplifiedMode ? 'text-xl' : 'text-base'
                      }`}
                    >
                      💊 {recipe.name}
                    </p>
                    <p
                      className={`text-slate-600 ${
                        simplifiedMode ? 'text-lg' : 'text-sm'
                      }`}
                    >
                      {recipe.frequency} - {recipe.duration}
                    </p>
                    <Badge
                      variant="outline"
                      className={simplifiedMode ? 'text-base mt-2' : 'text-xs'}
                    >
                      {recipe.date}
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    className={buttonClass}
                    size={simplifiedMode ? 'lg' : 'sm'}
                  >
                    📥 DESCARGAR PDF
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div>
          <h2 className={headingClass}>MIS DOCUMENTOS</h2>
          <Card className="p-6">
            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className={`flex justify-between items-center p-4 rounded border hover:bg-slate-50 ${
                    simplifiedMode ? 'gap-4' : 'gap-2'
                  }`}
                >
                  <div>
                    <p
                      className={`font-semibold text-slate-900 ${
                        simplifiedMode ? 'text-xl' : 'text-base'
                      }`}
                    >
                      📄 {doc.name}
                    </p>
                    <p
                      className={`text-slate-600 ${
                        simplifiedMode ? 'text-lg' : 'text-sm'
                      }`}
                    >
                      {doc.date}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className={buttonClass}
                    size={simplifiedMode ? 'lg' : 'sm'}
                  >
                    📥 DESCARGAR
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Action Buttons */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 ${
            simplifiedMode ? 'mt-8' : ''
          }`}
        >
          <Button
            variant="outline"
            className={`${buttonClass} border-2`}
            size={simplifiedMode ? 'lg' : 'sm'}
          >
            📅 REAGENDAR
          </Button>
          <Button
            variant="outline"
            className={`${buttonClass} border-2`}
            size={simplifiedMode ? 'lg' : 'sm'}
          >
            📞 CONTACTAR DOCTOR
          </Button>
          <Button
            variant="outline"
            className={`${buttonClass} border-2`}
            size={simplifiedMode ? 'lg' : 'sm'}
          >
            ⚙️ PREFERENCIAS
          </Button>
        </div>
      </div>
    </ClinicalLayout>
  );
}
