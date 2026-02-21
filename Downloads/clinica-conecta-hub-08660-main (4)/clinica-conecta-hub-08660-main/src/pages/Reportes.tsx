import React from "react";
import { BarChart3 } from "lucide-react";

export default function Reportes() {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <BarChart3 className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Reportes y Analítica</h1>
            <p className="text-muted-foreground max-w-sm">
                Visualiza el rendimiento de tu clínica, ingresos y estadísticas de pacientes. Próximamente disponible.
            </p>
        </div>
    );
}
