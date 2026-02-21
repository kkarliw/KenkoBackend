import ClinicalLayout from '@/components/layouts/ClinicalLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState, useEffect } from 'react';

export default function TelemedSala() {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const appointmentDuration = 30; // minutes
  const timeRemaining = appointmentDuration - timeElapsed;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed((t) => t + 1);
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const getTimerColor = () => {
    const percentRemaining = (timeRemaining / appointmentDuration) * 100;
    if (percentRemaining > 3) return 'text-green-600';
    if (percentRemaining > 1) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-screen p-4">
        {/* Video Area - 65% */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Video Container */}
          <div className="flex-1 bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg border-2 border-blue-500 flex items-center justify-center relative">
            <div className="text-center">
              <div className="text-6xl mb-4">🎥</div>
              <p className="text-2xl font-semibold mb-4">Cámara del Doctor</p>
              <p className="text-slate-400">(Área de video - WebRTC aquí)</p>
            </div>

            {/* Timer - Top Right */}
            <div className={`absolute top-4 right-4 text-2xl font-bold ${getTimerColor()} bg-slate-800 px-4 py-2 rounded`}>
              {Math.floor(timeRemaining)}:{String((appointmentDuration * 60 - (timeElapsed * 60)) % 60).padStart(2, '0')}
            </div>
          </div>

          {/* Controls */}
          <div className="bg-slate-800 rounded-lg p-4 flex gap-2 flex-wrap justify-center items-center">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2">
              🎤 Micrófono: ON
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2">
              📹 Cámara: ON
            </button>
            <button className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded flex items-center gap-2">
              🔊 Volumen: 80%
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded text-lg font-bold ml-auto">
              ❌ FINALIZAR CONSULTA
            </button>
          </div>
        </div>

        {/* Notes Panel - 35% */}
        <div className="flex flex-col gap-4">
          {/* Patient Info */}
          <Card className="p-4 bg-slate-800 border-slate-700">
            <h3 className="font-bold mb-3 text-lg">📋 INFORMACIÓN PACIENTE</h3>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-slate-400">Paciente:</span> Pedro Fernández, 45
              </p>
              <p>
                <span className="text-slate-400">Grupo Sangre:</span> O+
              </p>
              <p>
                <span className="text-slate-400">Alergias:</span> Penicilina
              </p>
              <p>
                <span className="text-slate-400">Meds:</span> Losartán 50mg
              </p>
            </div>
          </Card>

          {/* Clinical Notes */}
          <Card className="flex-1 p-4 bg-slate-800 border-slate-700 flex flex-col">
            <h3 className="font-bold mb-2">📝 NOTAS CLÍNICAS</h3>
            <textarea
              className="flex-1 w-full bg-slate-900 text-white text-sm p-2 rounded border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono resize-none"
              placeholder="SÍNTOMAS:
- Dolor abdominal
- Náuseas
- Fiebre 38.5°C

DIAGNÓSTICO:
Gastroenteritis

PLAN:
- Reposo 3 días
- Dieta blanda
- Medicación"
              defaultValue="SÍNTOMAS:
- Dolor abdominal
- Náuseas
- Fiebre 38.5°C

DIAGNÓSTICO:
Gastroenteritis

PLAN:
- Reposo 3 días
- Dieta blanda
- Medicación: Omeprazol 20mg c/12h x 7 días"
            />
            <div className="flex gap-2 mt-3">
              <Button className="flex-1" size="sm">
                💾 Guardar Nota
              </Button>
              <Button className="flex-1" size="sm" variant="outline">
                📋 Generar Receta
              </Button>
            </div>
          </Card>

          {/* Quality Indicator */}
          <Card className="p-4 bg-slate-800 border-slate-700">
            <p className="text-xs text-slate-400 mb-2">CALIDAD DE CONEXIÓN</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`h-8 flex-1 rounded ${
                    i <= 4 ? 'bg-green-600' : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-green-400 mt-2">Excelente conexión</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
