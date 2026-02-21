import { PacienteTable } from '@/components/pacientes/PacienteTable';
import ClinicalLayout from '@/components/layouts/ClinicalLayout';

export default function Pacientes() {
  return (
    <ClinicalLayout>
      <div className="space-y-6 p-6">
        <PacienteTable />
      </div>
    </ClinicalLayout>
  );
}


