import React from "react";
import { Stethoscope } from "lucide-react";

export default function Profesionales() {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Stethoscope className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Profesionales</h1>
            <p className="text-muted-foreground max-w-sm">
                Gestión de médicos, especialistas y personal administrativo. Próximamente disponible.
            </p>
        </div>
    );
}
